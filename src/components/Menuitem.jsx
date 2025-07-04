// src/components/MenuList.jsx

import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

// آیکون‌ها
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

const menuItems = [
  { text: "داشبورد", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "محصولات", icon: <InventoryIcon />, path: "/products" },
  { text: "سفارشات", icon: <ShoppingCartIcon />, path: "/orders" },
  { text: "کاربران", icon: <PeopleIcon />, path: "/users" },
  {
    text: "تنظیمات",
    icon: <SettingsIcon />,
    path: "/settings",
    subItems: [
      {
        text: "پروفایل",
        icon: <AccountCircleIcon />,
        path: "/settings/profile",
      },
      { text: "امنیت", icon: <VpnKeyIcon />, path: "/settings/security" },
    ],
  },
  {
    text: "احراز هویت",
    icon: <SecurityIcon />,
    path: "/auth",
    subItems: [
      {
        text: "ورود",
        icon: <LoginIcon />,
        path: "/auth/login",
      },
      {
        text: "ثبت نام",
        icon: <PersonAddIcon />,
        path: "/auth/register",
      },
      {
        text: "رمز عبور",
        icon: <PasswordIcon />,
        path: "/auth/change-password",
      },
    ],
  },
];

function MenuList({ isCollapsed }) {
  const [openMenu, setOpenMenu] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeParent, setActiveParent] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentParent = menuItems.find(
      (item) => item.subItems && location.pathname.startsWith(item.path)
    );
    if (currentParent) {
      setActiveParent(currentParent.path);
    }
  }, [location.pathname]);

  const handleParentMenuClick = (item) => {
    // با کلیک روی والد، همیشه به اولین فرزند برو تا URL آپدیت شود
    if (item.subItems && item.subItems.length > 0) {
      navigate(item.subItems[0].path);
    }
    const path = item.path;
    setActiveParent(path);
    // منوی آکاردئونی فقط در حالت باز، باز و بسته شود
    if (!isCollapsed) {
      setOpenMenu(openMenu === path ? null : path);
    }
  };

  const handleTopLevelLinkClick = () => {
    setOpenMenu(null);
    setActiveParent(null);
  };

  return (
    <nav>
      <ul className={`menu-list ${isCollapsed ? "collapsed" : ""}`}>
        {menuItems.map((item) => {
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isOpen = !isCollapsed && openMenu === item.path;
          const isParentActive =
            (hasSubItems && location.pathname.startsWith(item.path)) ||
            activeParent === item.path;

          return (
            <li
              key={item.text}
              className="menu-item"
              onMouseEnter={() =>
                isCollapsed && hasSubItems && setHoveredItem(item.path)
              }
              onMouseLeave={() =>
                isCollapsed && hasSubItems && setHoveredItem(null)
              }
            >
              {hasSubItems ? (
                <>
                  <div
                    className={`menu-link ${isOpen ? "open" : ""} ${
                      isParentActive ? "active" : ""
                    }`}
                    onClick={() => handleParentMenuClick(item)}
                    title={isCollapsed ? item.text : ""}
                  >
                    <div className="menu-icon">{item.icon}</div>
                    {!isCollapsed && (
                      <>
                        <span className="menu-text">{item.text}</span>
                        <span
                          className={`dropdown-icon ${isOpen ? "open" : ""}`}
                        >
                          <ExpandMoreIcon />
                        </span>
                      </>
                    )}
                  </div>

                  {/* زیرمنوی آکاردئونی برای حالت باز */}
                  {!isCollapsed && (
                    <ul className={`submenu-list ${isOpen ? "open" : ""}`}>
                      {item.subItems.map((subItem) => (
                        <li key={subItem.text} className="submenu-item">
                          <NavLink
                            to={subItem.path}
                            end
                            onClick={() => setActiveParent(item.path)}
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

                  {/* کادر شناور برای حالت بسته */}
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
                          title={subItem.text}
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
                <NavLink
                  to={item.path}
                  end
                  onClick={handleTopLevelLinkClick}
                  className={({ isActive }) =>
                    isActive ? "menu-link active" : "menu-link"
                  }
                  title={isCollapsed ? item.text : ""}
                >
                  <div className="menu-icon">{item.icon}</div>
                  {!isCollapsed && (
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
