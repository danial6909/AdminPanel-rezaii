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
import UsersPage from "./pages/UsersPage/UsersPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import RolesPage from "./pages/RolesPage/RolesPage";
import ChannelPage from "./pages/ChannelPage/ChannelPage";
import SettingPage from "./pages/SettingPage/SettingPage";
import EPG_Page from "./pages/EPG_Page/EPG_Page";
import StreamingChannelsPage from "./pages/StreamingChannelsPage/StreamingChannelsPage";
import RecordingsPage from "./pages/RecordingsPage/RecordingsPage";
import DVB_SPage from "./pages/DVB_SPage/DVB_SPage";
import DVB_TPage from "./pages/DVB_TPage/DVB_TPage";
import StreamsPage from "./pages/StreamsPage/StreamsPage";

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
              <Route path="ConfigStream/DVB-S" element={<DVB_SPage />} />
              <Route path="ConfigStream/DVB-T" element={<DVB_TPage />} />

              <Route path="Channel/Channellist" element={<ChannelPage />} />
              <Route path="Channel/Streams" element={<StreamsPage />} />
              <Route path="Setting" element={<SettingPage />} />
              <Route path="EPG" element={<EPG_Page />} />
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
