// // src/components/MenuList.jsx
// import React from "react";
// import { NavLink } from "react-router-dom";

// // آیکون‌ها
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import InventoryIcon from "@mui/icons-material/Inventory";
// import PeopleIcon from "@mui/icons-material/People";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import SettingsIcon from "@mui/icons-material/Settings";

// const menuItems = [
//   { text: "داشبورد", icon: <DashboardIcon />, path: "/" },
//   { text: "محصولات", icon: <InventoryIcon />, path: "/products" },
//   { text: "سفارشات", icon: <ShoppingCartIcon />, path: "/orders" },
//   { text: "کاربران", icon: <PeopleIcon />, path: "/users" },
//   { text: "تنظیمات", icon: <SettingsIcon />, path: "/settings" },
// ];

// function MenuList({ isCollapsed }) {
//   return (
//     <nav>
//       <ul className="menu-list">
//         {menuItems.map((item) => (
//           <li key={item.text} className="menu-item">
//             <NavLink
//               to={item.path}
//               className={({ isActive }) =>
//                 isActive ? "menu-link active" : "menu-link"
//               }
//               title={isCollapsed ? item.text : ""} // نمایش عنوان در حالت بسته
//             >
//               <div className="menu-icon">{item.icon}</div>
//               {!isCollapsed && <span className="menu-text">{item.text}</span>}
//             </NavLink>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// }

// export default MenuList;



// src/components/MenuList.jsx

import React, { useState } from "react"; // useState را وارد کنید
import { NavLink } from "react-router-dom";

// آیکون‌ها
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // آیکون بازشو

// ... (آرایه menuItems که در مرحله قبل ساختیم)
const menuItems = [
    { text: "داشبورد", icon: <DashboardIcon />, path: "/" },
    { text: "محصولات", icon: <InventoryIcon />, path: "/products" },
    { text: "سفارشات", icon: <ShoppingCartIcon />, path: "/orders" },
    { text: "کاربران", icon: <PeopleIcon />, path: "/users" },
    {
      text: "تنظیمات",
      icon: <SettingsIcon />,
      path: "/settings",
      subItems: [
        { text: "پروفایل", icon: <AccountCircleIcon />, path: "/settings/profile" },
        { text: "امنیت", icon: <VpnKeyIcon />, path: "/settings/security" },
      ],
    },
  ];

function MenuList({ isCollapsed }) {
  // استیت برای مدیریت منوی باز
  const [openMenu, setOpenMenu] = useState(null);

  // تابعی برای باز و بسته کردن منو
  const handleMenuClick = (path) => {
    // اگر روی منوی باز کلیک شد، آن را ببند
    setOpenMenu(openMenu === path ? null : path);
  };

  return (
    <nav>
      <ul className="menu-list">
        {menuItems.map((item) => {
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isOpen = openMenu === item.path;

          return (
            <li key={item.text} className="menu-item">
              {/* اگر زیرمنو داشت */}
              {hasSubItems ? (
                <>
                  <div
                    className={`menu-link ${isOpen ? 'open' : ''}`}
                    onClick={() => handleMenuClick(item.path)}
                    title={isCollapsed ? item.text : ""}
                  >
                    <div className="menu-icon">{item.icon}</div>
                    {!isCollapsed && (
                      <>
                        <span className="menu-text">{item.text}</span>
                        <ExpandMoreIcon className={`dropdown-icon ${isOpen ? 'open' : ''}`} />
                      </>
                    )}
                  </div>
                  {/* نمایش زیرمنو اگر باز بود و سایدبار بسته نبود */}
                  {isOpen && !isCollapsed && (
                    <ul className="submenu-list">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.text} className="submenu-item">
                          <NavLink to={subItem.path} className={({ isActive }) => isActive ? "submenu-link active" : "submenu-link"}>
                            {subItem.text}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                /* اگر زیرمنو نداشت (مثل قبل) */
                <NavLink to={item.path} className={({ isActive }) => isActive ? "menu-link active" : "menu-link"} title={isCollapsed ? item.text : ""}>
                  <div className="menu-icon">{item.icon}</div>
                  {!isCollapsed && <span className="menu-text">{item.text}</span>}
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