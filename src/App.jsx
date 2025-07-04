
// src/App.js
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // وارد کردن AuthProvider
import PrivateRoute from "./components/PrivateRoute"; // وارد کردن PrivateRoute

// وارد کردن کامپوننت‌های صفحات
import AdminLayout from "./layouts/AdminLayout";
import DashboardPage from "./pages/DashboardPage";
import LoginForm from "./pages/LoginForm";
import NotFound from "./pages/NotFound";
import ProductsPage from "./pages/ProductsPage";
import OrdersPage from "./pages/OrdersPage";
import UsersPage from "./pages/UsersPage";
import "./i18"; 
import "./styles/colors.css";
import "./styles/fonts.css";

function App() {

  return (
    <Router>
      {/* AuthProvider کل برنامه را برای دسترسی به وضعیت احراز هویت پوشش می‌دهد */}
      <AuthProvider>
        <Routes>
        
          <Route path="/login" element={<LoginForm />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                {/* PrivateRoute بررسی می‌کند که آیا کاربر احراز هویت شده است یا خیر */}
                <AdminLayout />
              </PrivateRoute>
            }
          >
            {/* مسیر پیش‌فرض برای '/' که به داشبورد ریدایرکت می‌شود */}
            <Route index element={<Navigate to="/dashboard" replace />} />
            {/* مسیرهای داخل پنل ادمین (AdminLayout) */}
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="users" element={<UsersPage />} />
            {/* مسیر برای صفحات 404 که داخل AdminLayout نشان داده می‌شوند */}
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* اگر بخواهید یک 404 کاملاً خارج از AdminLayout داشته باشید
          <Route path="*" element={<NotFound />} />
          */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
