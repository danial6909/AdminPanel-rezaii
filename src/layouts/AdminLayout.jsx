


// src/layouts/AdminLayout.js
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header"; // وارد کردن Header
import Sidebar from "../components/Sidebar";
import "./AdminLayout.css"; // وارد کردن فایل CSS

function AdminLayout() {
  return (
    <div className="admin-container">
      <div className="admin-layout">
        <div className="admin-right">
          <Sidebar />
        </div>

        <div className="admin-left">
          <Header /> {/* استفاده از کامپوننت Header */}
          <main className="admin-main">
            {/* اینجا Outlet قرار می‌گیرد که محتوای Route های فرزند را رندر می‌کند */}
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
