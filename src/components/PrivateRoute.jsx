// // src/components/PrivateRoute.js
// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const PrivateRoute = ({ children }) => {
//   // آبجکت user را از context می‌گیریم
//   const { user } = useAuth();
  
//   // ✅ شرط صحیح: اگر user وجود *نداشت* (null بود)
//   if (!user) {
//     // کاربر را به صفحه ورود منتقل کن
//     return <Navigate to="/login" replace />;
//   }

//   // اگر user وجود داشت، محتوای صفحه را نمایش بده
//   return children;
// };

// export default PrivateRoute;





// src/components/PrivateRoute.js

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DotSpinner from "./DotSpinner";

const PrivateRoute = ({ children }) => {
  // ✅ ۱. استیت loading را هم از context می‌گیریم
  const { user, loading } = useAuth();

  // ✅ ۲. اگر در حال بررسی وضعیت لاگین بودیم، یک پیام لودینگ نشان می‌دهیم
  if (loading) {
    return <DotSpinner/> // یا یک کامپوننت اسپینر زیبا
  }

  // ✅ ۳. فقط زمانی که بارگذاری تمام شد، وضعیت کاربر را چک می‌کنیم
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;