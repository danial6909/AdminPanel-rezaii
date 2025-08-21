
// نحوه انجام ورود کاربر (Login Flow)

/**
 * description Sharh-e farayand-e vorood-e karbar (Login Flow)
 *
 * 1. Karbar form ra por karde va dokme-ye "Vorood" ra mizanad.
 *
 * 2. React-hook-form eatebarsanji ra anjam midahad va dar soorat-e movaffaghiat,
 * tabe'e onSubmit dar file-e LoginForm.js ra ba dade-haye form (data) farakhani mikonad.
 *
 * 3. Tabe'e onSubmit, tabe'e login ra az AuthContext be soorat-e await farakhani karde
 * va nam-e karbari va ramz-e oboor ra be an pass midahad.
 *
 * 4. Tabe'e login dar AuthContext yek darkhast-e POST ba estefade az axios be backend ersal mikonad.
 *
 * 5. **Dar soorat-e Movaffaghiat (Success):**
 * - API pasokhi shamel-e ettela'at-e karbar va token ra barmigardanad.
 * - AuthContext vaziat-e 'user' va 'isAuthenticated' ra update mikonad.
 * - Hook-e useEffect dar AuthContext in taghirat ra dar localStorage zakhire mikonad.
 * - AuthContext karbar ra be masir-e /dashboard hedayat mikonad.
 * - Tabe'e login meghdar-e 'true' ra barmigardanad.
 * - Component-e LoginForm payam-e movaffaghiat (masalan ba SweetAlert) ra namayesh midahad.
 *
 * 6. **Dar soorat-e Shekast (Failure) (masalan ramz-e eshtebah):**
 * - Ketabkhane-ye axios yek khata (error) barmigardanad.
 * - Block-e catch dar tabe'e login ejra shode va meghdar-e 'false' ra barmigardanad.
 * - Component-e LoginForm payam-e khataye "Nam-e karbari ya ramz-e oboor eshtebah ast" ra namayesh midahad.
 */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// ✅ ۱. وارد کردن instance به جای axios خام
import axiosInstance from "../utils/axiosInstance";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (username, password) => {
    try {
      // ✅ ۲. استفاده از axiosInstance و مسیر نسبی
      const response = await axiosInstance.post("/auth/signin", {
        username,
        password,
      });

      if (response.data && response.data.token) {
        setUser(response.data);
        navigate("/ConfigPage");
        return true;
      }
      return false; // اگر پاسخ موفق بود ولی توکن نداشت
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/login");
  };

  const value = {
    user,
    loading,
    login,
    logout,
    setUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};







//////////////////////////////////////////////////////////////////////////////////////////////////





// import React, { createContext, useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// // import axios from "axios"; // نیازی به axios در حالت آفلاین نیست

// const AuthContext = createContext(null);

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // این بخش برای حفظ وضعیت لاگین هنگام رفرش است و بدون تغییر باقی می‌ماند
//   useEffect(() => {
//     try {
//       const storedUser = localStorage.getItem("user");
//       if (storedUser) {
//         setUser(JSON.parse(storedUser));
//       }
//     } catch (error) {
//       console.error("Failed to parse user from localStorage", error);
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // این بخش برای ذخیره اطلاعات کاربر در حافظه است و بدون تغییر باقی می‌ماند
//   useEffect(() => {
//     if (user) {
//       localStorage.setItem("user", JSON.stringify(user));
//     } else {
//       localStorage.removeItem("user");
//     }
//   }, [user]);

//   // ✅ تغییر اصلی اینجاست
//   const login = async (username, password) => {
//     // به جای ارسال درخواست به سرور، یک شرط ساده قرار می‌دهیم
//     if (username === "admin" && password === "admin") {
//       console.log("Login successful (offline mode)");

//       // یک آبجکت کاربر جعلی برای تست می‌سازیم
//       const fakeUser = {
//         username: "مدیر سیستم (آفلاین)",
//         token: "fake-token-for-testing-purpose",
//         roles: ["admin", "editor"], // می‌توانید نقش‌ها را هم تست کنید
//       };
      
//       // وضعیت کاربر را آپدیت می‌کنیم
//       setUser(fakeUser);
      
//       // کاربر را به داشبورد منتقل می‌کنیم
//       navigate("/dashboard");

//       return true; // برای نمایش پیام موفقیت
//     }

//     // اگر نام کاربری یا رمز عبور اشتباه بود
//     console.error("Login failed: Invalid credentials (offline mode)");
//     return false;
//   };

//   const logout = () => {
//     setUser(null);
//     navigate("/login");
//   };
  
//   const value = {
//     user,
//     loading,
//     login,
//     logout,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };


















