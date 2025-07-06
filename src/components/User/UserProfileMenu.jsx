import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext"; // هوک برای دسترسی به اطلاعات کاربر و تابع خروج
import { useTranslation } from "react-i18next"; // هوک برای استفاده از قابلیت ترجمه
import { useNavigate } from "react-router-dom"; // هوک برای هدایت (ناوبری) بین صفحات
import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton,
  Tooltip,
} from "@mui/material"; // کامپوننت‌های لازم از کتابخانه MUI
import Logout from "@mui/icons-material/Logout"; // آیکون خروج
import PersonOutline from "@mui/icons-material/PersonOutline"; // آیکون پروفایل
import "./UserProfileMenu.css";



const UserProfileMenu = () => {

  // دریافت آبجکت کاربر (user) و تابع خروج (logout) از کانتکست احراز هویت
  const { user, logout } = useAuth();

  // دریافت تابع ترجمه (t)
  const { t } = useTranslation();

  // تعریف یک state برای مدیریت باز و بسته بودن منو (کنترل لنگر منو)
  const [anchorEl, setAnchorEl] = useState(null);

  // فراخوانی هوک useNavigate برای دسترسی به تابع ناوبری
  const navigate = useNavigate();

  // تابعی که با کلیک روی آواتار، منو را باز می‌کند
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  // تابعی که منو را می‌بندد
  const handleMenuClose = () => setAnchorEl(null);

  // تابعی که برای خروج کاربر از سیستم اجرا می‌شود
  const handleLogout = () => {
    handleMenuClose(); // ابتدا منو را می‌بندد
    logout(); // سپس تابع خروج را از کانتکست فراخوانی می‌کند
  };

  // تابعی که برای هدایت کاربر به صفحه پروفایل اجرا می‌شود
  const handleProfileClick = () => {
    handleMenuClose(); // ابتدا منو را می‌بندد
    navigate("/profile"); // سپس به مسیر /profile هدایت می‌کند
  };

  return (
    <>
      
      <Tooltip title={t("profile")}>
        {/* دکمه‌ای که آواتار را نمایش می‌دهد و با کلیک روی آن منو باز می‌شود */}
        <IconButton onClick={handleMenuOpen} size="small" sx={{ ml: 1 }}>
          <Avatar
            className="profile-avatar"
            sx={{ width: "55px", height: "55px" }}
            src="/src/assets/images/icons/user.jpg"
            alt={user?.username || "User Avatar"} // متن جایگزین برای عکس
          >
            {/* اگر عکسی وجود نداشت یا بارگذاری نشد، حرف اول نام کاربری را نمایش بده */}
            {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
          </Avatar>
        </IconButton>
      </Tooltip>

      {/* کامپوننت منو که با کلیک روی آواتار ظاهر می‌شود */}
      <Menu
        anchorEl={anchorEl} // موقعیت منو به آواتار متصل می‌شود
        open={Boolean(anchorEl)} // اگر anchorEl مقدار داشت، منو باز می‌شود
        onClose={handleMenuClose} // با کلیک بیرون از منو، بسته می‌شود
        PaperProps={{ className: "custom-menu profile-menu" }} // اعمال کلاس‌های سفارشی
        transformOrigin={{ horizontal: "right", vertical: "top" }} // تنظیم نقطه شروع انیمیشن
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }} // تنظیم نقطه اتصال منو به لنگر
      >
        {/* آیتم منو برای پروفایل که کاربر را به صفحه پروفایل هدایت می‌کند */}
        <MenuItem onClick={handleProfileClick}>
          <ListItemIcon>
            <PersonOutline fontSize="small" className="profile-menu-icon" />
          </ListItemIcon>
          {t("profile")}
        </MenuItem>

        {/* آیتم منو برای خروج از سیستم */}
        <MenuItem onClick={handleLogout} className="logout-item">
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t("logout")}
        </MenuItem>
        
      </Menu>
    </>
  );
};

export default UserProfileMenu;
