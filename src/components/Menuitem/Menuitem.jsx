import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Menuitem.css";

// آیکون‌های مورد نیاز از کتابخانه Material-UI
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SecurityIcon from "@mui/icons-material/Security";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PasswordIcon from "@mui/icons-material/Password";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";


// خلاصه عملکرد کلی
// این کد یک منوی ناوبری هوشمند و قابل استفاده مجدد برای یک داشبورد یا پنل ادمین می‌سازد که دارای ویژگی‌های زیر است:

// دو حالته: می‌تواند به صورت کامل (با متن و آیکون) یا به صورت جمع‌شده (فقط آیکون) نمایش داده شود.

// پشتیبانی از زیرمنو: آیتم‌ها می‌توانند زیرمنوهای بازشونده داشته باشند.

// حالت هوشمند در وضعیت جمع‌شده: در حالت جمع‌شده، با بردن ماوس روی آیتم‌های دارای زیرمنو، زیرمنوها به صورت یک پنل شناور  در کنار آن ظاهر می‌شوند.

// همگام‌سازی با URL: منو همیشه می‌داند کدام آیتم (یا والد آن) فعال است و آن را با استایل متفاوتی نمایش می‌دهد.

// چندزبانگی: با استفاده از  متن‌های منو به راحتی قابل ترجمه هستند.

// بهینه‌سازی شده: با استفاده از React.useMemo از رندرهای غیرضروری جلوگیری می‌کند و عملکرد برنامه را بهبود می‌بخشد.


/**

 * @param {boolean} props.isCollapsed - وضعیتی که مشخص می‌کند آیا منو در حالت جمع‌شده قرار دارد یا خیر.
 */
function MenuList({ isCollapsed }) {

  const { t } = useTranslation();
  // هوک useNavigate برای تغییر مسیر (صفحه) به صورت برنامه‌نویسی
  const navigate = useNavigate();
  // هوک useLocation برای دسترسی به اطلاعات مسیر فعلی (URL)
  const location = useLocation();

  // تعریف آیتم‌های منو با استفاده از React.useMemo.
  // این کار باعث می‌شود که لیست منوها فقط زمانی که تابع ترجمه (t) تغییر می‌کند، دوباره ساخته شود.
  // این بهینه‌سازی از رندرهای غیرضروری جلوگیری می‌کند.
  const menuItems = React.useMemo(
    () => [
      { text: t("dashboard"), icon: <DashboardIcon />, path: "/dashboard" },
      { text: t("Cards"), icon: <InventoryIcon />, path: "/cards" },
      { text: t("orders"), icon: <ShoppingCartIcon />, path: "/orders" },
      {
        text: t("users"),
        icon: <PeopleIcon />,
        path: "/users",
        subItems: [
          // زیرمنوهای مربوط به کاربران
          {
            text: "لیست کاربران", // این متن باید با تابع t ترجمه شود
            icon: <ChecklistRtlIcon />,
            path: "/users/userslist",
          },
          {
            text: "نقش ها", // این متن باید با تابع t ترجمه شود
            icon: <AdminPanelSettingsIcon />,
            path: "users/roles", // مسیر این آیتم به نظر اشتباه می‌رسد، باید /user/roles باشد
          },
        ],
      },
      {
        text: t("settings"),
        icon: <SettingsIcon />,
        path: "/settings",
        subItems: [
          // زیرمنوهای مربوط به تنظیمات
          {
            text: t("profile"),
            icon: <AccountCircleIcon />,
            path: "/settings/profile",
          },
          {
            text: t("security"),
            icon: <VpnKeyIcon />,
            path: "/settings/security",
          },
        ],
      },
      {
        text: t("authentication"),
        icon: <SecurityIcon />,
        path: "/auth",
        subItems: [
          // زیرمنوهای مربوط به احراز هویت
          { text: t("login"), icon: <LoginIcon />, path: "/auth/login" },
          {
            text: t("register"),
            icon: <PersonAddIcon />,
            path: "/auth/register",
          },
          {
            text: t("change_password"),
            icon: <PasswordIcon />,
            path: "/auth/change-password",
          },
        ],
      },
    ],
    [t] // وابستگی useMemo به تابع t
  );


  // برای نگهداری مسیر منویی که باز است (برای منوهای دارای زیرمنو)
  const [openMenu, setOpenMenu] = useState(null);
  //  برای نگهداری آیتمی که در حالت جمع‌شده (collapsed) ماوس روی آن قرار گرفته است
  const [hoveredItem, setHoveredItem] = useState(null);
  //  برای نگهداری والدِ آیتمِ فعال فعلی (برای استایل‌دهی صحیح)
  const [activeParent, setActiveParent] = useState(null);

  // هوک useEffect برای تشخیص و تنظیم منوی والد فعال بر اساس مسیر فعلی صفحه
  useEffect(() => {
    // پیدا کردن آیتم منویی که یک زیرمنو دارد و مسیر فعلی با مسیر آن والد شروع می‌شود
    const currentParent = menuItems.find(
      (item) => item.subItems && location.pathname.startsWith(item.path)
    );
    if (currentParent) {
      // اگر والد پیدا شد، مسیر آن را به عنوان والد فعال تنظیم کن
      setActiveParent(currentParent.path);
    }
  }, [location.pathname, menuItems]); // این افکت به تغییر مسیر یا لیست منوها وابسته است

  /**
   * این تابع هنگام کلیک روی یک آیتم منوی والد (که دارای زیرمنو است) فراخوانی می‌شود.
   * @param {object} item - آبجکت آیتم منو که کلیک شده است.
   */
  const handleParentMenuClick = (item) => {
    // اگر آیتم دارای زیرمنو باشد، به مسیر اولین زیرمنو منتقل شو
    if (item.subItems && item.subItems.length > 0) {
      navigate(item.subItems[0].path);
    }
    const path = item.path;
    // مسیر آیتم کلیک‌شده را به عنوان والد فعال تنظیم کن
    setActiveParent(path);
    // اگر منو در حالت باز (expanded) باشد
    if (!isCollapsed) {
      // وضعیت باز/بسته بودن زیرمنو را تغییر بده (toggle)
      setOpenMenu(openMenu === path ? null : path);
    }
  };

  /**
   * این تابع هنگام کلیک روی یک آیتم منوی سطح بالا (که زیرمنو ندارد) فراخوانی می‌شود.
   */
  const handleTopLevelLinkClick = () => {
    // تمام زیرمنوهای باز را ببند
    setOpenMenu(null);
    // هیچ والدی به عنوان فعال در نظر گرفته نشود
    setActiveParent(null);
  };

  return (
    <nav>
      {/* لیست اصلی منو، کلاس 'collapsed' بر اساس وضعیت منو اضافه می‌شود */}
      <ul className={`menu-list ${isCollapsed ? "collapsed" : ""}`}>
        {menuItems.map((item) => {
          // بررسی اینکه آیا آیتم دارای زیرمنو است
          const hasSubItems = item.subItems && item.subItems.length > 0;
          // بررسی اینکه آیا زیرمنو باید باز نمایش داده شود (فقط در حالت expanded)
          const isOpen = !isCollapsed && openMenu === item.path;
          // بررسی اینکه آیا این آیتم والدِ آیتم فعال فعلی است
          const isParentActive =
            (hasSubItems && location.pathname.startsWith(item.path)) ||
            activeParent === item.path;

          return (

            <li
              key={item.path} // استفاده از path به عنوان کلید منحصر به فرد
              className="menu-item"
              // اگر منو در حالت جمع‌شده است و آیتم دارای زیرمنو است، رویدادهای ماوس را اضافه می‌کنیم
              onMouseEnter={() =>
                isCollapsed && hasSubItems && setHoveredItem(item.path)
              }

              onMouseLeave={() =>
                isCollapsed && hasSubItems && setHoveredItem(null)
              }
            >
              {/* // اگر آیتم زیرمنو داشت، این بلوک رندر می‌شود */}
              {hasSubItems ? (
                <>
                  <div
                    className={`menu-link ${isOpen ? "open" : ""} ${
                      isParentActive ? "active" : ""
                    }`}
                    onClick={() => handleParentMenuClick(item)}
                    title={isCollapsed ? item.text : ""} // نمایش عنوان در حالت collapsed
                  >
                    <div className="menu-icon">{item.icon}</div>
                    {!isCollapsed && ( // این بخش فقط در حالت باز  نمایش داده می‌شود
                      <>
                        <span className="menu-text">{item.text}</span>
                        <span
                          className={`dropdown-icon ${isOpen ? "open" : ""}`} // آیکون فلش برای باز و بسته شدن
                        >
                          <ExpandMoreIcon />
                        </span>
                      </>
                    )}
                  </div>

                  {/* رندر لیست زیرمنو در حالت باز (expanded) */}
                  {!isCollapsed && (
                    <ul className={`submenu-list ${isOpen ? "open" : ""}`}>
                      {item.subItems.map((subItem) => (
                        <li key={subItem.path} className="submenu-item">
                          <NavLink
                            to={subItem.path}
                            end // این prop باعث می‌شود لینک فقط در صورت تطابق کامل مسیر، active شود
                            onClick={() => setActiveParent(item.path)} // با کلیک روی زیرمنو، والد آن را فعال نگه دار
                            className={({ isActive }) =>
                              isActive ? "submenu-link active" : "submenu-link"
                            }
                          >
                            {subItem.text}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* رندر پاپ‌آپ زیرمنو در حالت جمع‌شده (collapsed) */}
                  {isCollapsed && (
                    <div
                      className={`sub-icon-container ${
                        hoveredItem === item.path ? "visible" : ""
                      }`}
                    >
                      {item.subItems.map((subItem) => (
                        <NavLink
                          to={subItem.path}
                          key={subItem.path}
                          className="sub-icon-item"
                          title={subItem.text} // نمایش متن کامل به عنوان tooltip
                          onClick={() => setActiveParent(item.path)}
                        >
                          <div className="sub-icon-image">{subItem.icon}</div>
                          <span className="sub-icon-text">{subItem.text}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}

                </>
              ) : (
                // اگر آیتم زیرمنو نداشت، یک NavLink ساده رندر می‌شود
                <NavLink
                  to={item.path}
                  end
                  onClick={handleTopLevelLinkClick}
                  className={({ isActive }) =>
                    isActive ? "menu-link active" : "menu-link"
                  }
                  title={isCollapsed ? item.text : ""} // نمایش عنوان در حالت collapsed
                >
                  <div className="menu-icon">{item.icon}</div>
                  {!isCollapsed && ( // متن فقط در حالت باز نمایش داده می‌شود
                    <span className="menu-text">{item.text}</span>
                  )}
                </NavLink>
              )}
            </li>
            
          );
        })}
      </ul>
    </nav>
  );
}

export default MenuList;
