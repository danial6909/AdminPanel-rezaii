import React from "react";
import {
  BrowserRouter as Router, // کامپوننت اصلی برای فعال‌سازی روتینگ
  Routes, // کانتینری برای تعریف مسیرها
  Route, // برای تعریف یک مسیر خاص
  Navigate, // برای ریدایرکت کردن کاربر
} from "react-router-dom";

// وارد کردن Context ها برای فراهم کردن وضعیت‌های سراسری
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

// وارد کردن کامپوننت مسیر خصوصی برای محافظت از مسیرهای پنل ادمین
import PrivateRoute from "./components/PrivateRoute";

// وارد کردن کامپوننت‌های مربوط به هر صفحه
import AdminLayout from "./layouts/AdminLayout";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import LoginForm from "./pages/LoginFormPage/LoginForm";
import NotFound from "./pages/NotFoundPage/NotFound";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import UsersPage from "./pages/UsersPage/UsersPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

// وارد کردن فایل‌های تنظیمات عمومی برنامه
import "./i18";
import "./styles/colors.css";
import "./styles/fonts.css";

// کامپوننت اصلی برنامه
function App() {
  return (
    
    // <Router> کل برنامه را برای استفاده از روتینگ در بر می‌گیرد
    <Router>

      {/* ThemeProvider وضعیت تم (روشن/تاریک) را در کل برنامه فراهم می‌کند */}
      <ThemeProvider>

        {/* AuthProvider وضعیت احراز هویت (ورود کاربر) را در کل برنامه فراهم می‌کند */}
        <AuthProvider>

          {/* <Routes> تمام مسیرهای ممکن در برنامه را مدیریت می‌کند */}
          <Routes>

            {/* مسیر عمومی برای صفحه ورود که برای همه قابل دسترس است */}
            <Route path="/login" element={<LoginForm />} />

            {/* گروه مسیرهای خصوصی که همگی داخل پنل ادمین (AdminLayout) قرار دارند */}
            <Route
              path="/"
              element={
                // PrivateRoute چک می‌کند که آیا کاربر وارد شده است یا خیر
                <PrivateRoute>
                  <AdminLayout />
                </PrivateRoute>
              }
            >
              {/* مسیر پیش‌فرض: اگر کاربر به آدرس اصلی ('/') برود، به '/dashboard' منتقل می‌شود */}
              <Route index element={<Navigate to="/dashboard" replace />} />

              {/* مسیرهای تو در تو که داخل کامپوننت AdminLayout رندر می‌شوند */}
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="users/userslist" element={<UsersPage />} />

              <Route path="profile" element={<ProfilePage />} />

              {/* مسیر catch-all: اگر هیچ‌یک از مسیرهای بالا مطابقت نداشت، صفحه NotFound نمایش داده می‌شود */}
              <Route path="*" element={<NotFound />} />

            </Route>

          </Routes>

        </AuthProvider>

      </ThemeProvider>

    </Router>
  );
}

export default App;
