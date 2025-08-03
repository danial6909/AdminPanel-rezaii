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
import ConfigPage from "./pages/ConfigPage/ConfigPage";
import LoginForm from "./pages/LoginFormPage/LoginForm";
import NotFound from "./pages/NotFoundPage/NotFound";
import CardsPage from "./pages/CardsPage/CardsPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import UsersPage from "./pages/UsersPage/UsersPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import RolesPage from "./pages/RolesPage/RolesPage";
import FrequencyPage from "./pages/FrequencyPage/FrequencyPage";
import ServicePage from "./pages/ServicePage/ServicePage";
import NetworkPage from "./pages/NetworkPage/NetworkPage";
import ChannelPage from "./pages/ChannelPage/ChannelPage";
import ChannelGroupPage from "./pages/ChannelGroupPage/ChannelGroupPage";
import ConnectedDevicesPage from "./pages/ConnectedDevicesPage/ConnectedDevicesPage";
import StreamingChannelsPage from "./pages/StreamingChannelsPage/StreamingChannelsPage";
import RecordingsPage from "./pages/RecordingsPage/RecordingsPage";

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
              <Route index element={<Navigate to="/ConfigPage" replace />} />
              {/* مسیرهای تو در تو که داخل کامپوننت AdminLayout رندر می‌شوند */}
              <Route path="ConfigPage" element={<ConfigPage />} />
              <Route path="Cards" element={<CardsPage />} />
              <Route path="Frequency" element={<FrequencyPage />} />
              <Route path="Service" element={<ServicePage />} />


              {/* --- مسیرهای جدید --- */} // ADDED
              <Route path="Network" element={<NetworkPage />} />
              <Route path="Channel" element={<ChannelPage />} />
              <Route path="ChannelGroup" element={<ChannelGroupPage />} />
              <Route
                path="ConnectedDevices"
                element={<ConnectedDevicesPage />}
              />
              <Route
                path="StreamingChannels"
                element={<StreamingChannelsPage />}
              />
              <Route path="Recordings" element={<RecordingsPage />} />







              <Route path="users/userslist" element={<UsersPage />} />
              {/* <Route path="/roles" element={<RolesPage/>} /> */}
              <Route path="users/roles" element={<RolesPage />} />
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
