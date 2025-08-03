// index.js (Refactored)
// A more robust and professional generic Express server.

import express from "express";
import { readFile, writeFile } from "fs/promises"; // 1. Using fs/promises
import path from "path";
import crypto from "crypto";
import cors from "cors"; // Essential for MERN stack

const app = express();
const PORT = process.env.PORT || 3001;
const dbPath = path.join(process.cwd(), "db.json");

// --- Global Middleware ---
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies

// --- Utility: Reads DB safely ---
// This function now uses fs/promises and handles file-not-found errors.
const getDb = async () => {
  try {
    const data = await readFile(dbPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      return {}; // If db.json doesn't exist, start with an empty object
    }
    throw error; // Re-throw other errors
  }
};

// --- Custom Middleware for handling resources ---
// 2. This middleware handles loading the DB and the specific resource. No more repetition!
const resourceHandler = async (req, res, next) => {
  try {
    const db = await getDb();
    const resourceName = req.params.resource;

    // Attach db and resource data to the request object for later use
    req.db = db;
    req.resourceName = resourceName;
    req.resourceData = db[resourceName] || null;

    next(); // Move to the next middleware or route handler
  } catch (error) {
    next(error); // Pass errors to the central error handler
  }
};

// --- API Routes ---
// All routes now use the resourceHandler middleware first.

// [CREATE]
app.post("/api/:resource", resourceHandler, async (req, res, next) => {
  try {
    // Basic validation
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body cannot be empty." });
    }

    const { db, resourceName } = req;
    if (!db[resourceName]) {
      db[resourceName] = []; // Create resource if it doesn't exist
    }

    const newItem = { id: crypto.randomUUID(), ...req.body };
    db[resourceName].push(newItem);

    await writeFile(dbPath, JSON.stringify(db, null, 2));
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
});

// [READ ALL]
app.get("/api/:resource", resourceHandler, (req, res) => {
  // The middleware already loaded the data!
  res.status(200).json(req.resourceData || []);
});

// [READ ONE]
app.get("/api/:resource/:id", resourceHandler, (req, res) => {
  const { resourceData } = req;
  const { id } = req.params;

  if (!resourceData) {
    return res
      .status(404)
      .json({ message: `Resource '${req.resourceName}' not found.` });
  }

  const item = resourceData.find((i) => i.id === id);
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.status(200).json(item);
});

// [UPDATE]
app.put("/api/:resource/:id", resourceHandler, async (req, res, next) => {
  try {
    // Basic validation
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body cannot be empty." });
    }

    const { db, resourceName, resourceData } = req;
    const { id } = req.params;

    if (!resourceData) {
      return res
        .status(404)
        .json({ message: `Resource '${resourceName}' not found.` });
    }

    const itemIndex = resourceData.findIndex((i) => i.id === id);
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found" });
    }

    const updatedItem = { ...resourceData[itemIndex], ...req.body };
    db[resourceName][itemIndex] = updatedItem;

    await writeFile(dbPath, JSON.stringify(db, null, 2));
    res.status(200).json(updatedItem);
  } catch (error) {
    next(error);
  }
});

// [DELETE]
app.delete("/api/:resource/:id", resourceHandler, async (req, res, next) => {
  try {
    const { db, resourceName, resourceData } = req;
    const { id } = req.params;

    if (!resourceData) {
      return res
        .status(404)
        .json({ message: `Resource '${resourceName}' not found.` });
    }

    const initialLength = resourceData.length;
    db[resourceName] = resourceData.filter((i) => i.id !== id);

    if (db[resourceName].length === initialLength) {
      return res.status(404).json({ message: "Item not found" });
    }

    await writeFile(dbPath, JSON.stringify(db, null, 2));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// --- Central Error Handling Middleware ---
// 3. All errors from `next(error)` end up here.
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the full error for debugging
  res.status(500).json({ message: "Something went wrong on the server!" });
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
