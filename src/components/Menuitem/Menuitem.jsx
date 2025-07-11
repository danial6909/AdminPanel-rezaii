import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Menuitem.css";

// آیکون های مورد نیاز
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

function MenuList({ isCollapsed }) {
  const { t } = useTranslation(); // استفاده از هوک برای دسترسی به تابع ترجمه
  const navigate = useNavigate();
  const location = useLocation();

  // تعریف منو در داخل کامپوننت تا به تابع 't' دسترسی داشته باشد
  const menuItems = React.useMemo(
    () => [
      { text: t("dashboard"), icon: <DashboardIcon />, path: "/dashboard" },

      { text: t("products"), icon: <InventoryIcon />, path: "/products" },

      { text: t("orders"), icon: <ShoppingCartIcon />, path: "/orders" },

      {
        text: t("users"),
        icon: <PeopleIcon />,
        path: "/users",
        subItems: [
          {
            text: "لیست کاربران",
            icon: <ChecklistRtlIcon />,
            path: "/users/userslist",
          },
          {
            text: "نقش ها",
            icon: <AdminPanelSettingsIcon />,
            path: "user/roles",
          },
        ],
      },

      {
        text: t("settings"),
        icon: <SettingsIcon />,
        path: "/settings",
        subItems: [
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
          {
            text: t("login"),
            icon: <LoginIcon />,
            path: "/auth/login",
          },
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
    [t]
  );

  // const menuItems = [
  //   { text: t("dashboard"), icon: <DashboardIcon />, path: "/dashboard" },
  //   { text: t("products"), icon: <InventoryIcon />, path: "/products" },
  //   { text: t("orders"), icon: <ShoppingCartIcon />, path: "/orders" },
  //   { text: t("users"), icon: <PeopleIcon />, path: "/users" },
  //   {
  //     text: t("settings"),
  //     icon: <SettingsIcon />,
  //     path: "/settings",
  //     subItems: [
  //       {
  //         text: t("profile"),
  //         icon: <AccountCircleIcon />,
  //         path: "/settings/profile",
  //       },
  //       {
  //         text: t("security"),
  //         icon: <VpnKeyIcon />,
  //         path: "/settings/security",
  //       },
  //     ],
  //   },
  //   {
  //     text: t("authentication"),
  //     icon: <SecurityIcon />,
  //     path: "/auth",
  //     subItems: [
  //       {
  //         text: t("login"),
  //         icon: <LoginIcon />,
  //         path: "/auth/login",
  //       },
  //       {
  //         text: t("register"),
  //         icon: <PersonAddIcon />,
  //         path: "/auth/register",
  //       },
  //       {
  //         text: t("change_password"),
  //         icon: <PasswordIcon />,
  //         path: "/auth/change-password",
  //       },
  //     ],
  //   },
  // ];

  const [openMenu, setOpenMenu] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeParent, setActiveParent] = useState(null);

  useEffect(() => {
    const currentParent = menuItems.find(
      (item) => item.subItems && location.pathname.startsWith(item.path)
    );
    if (currentParent) {
      setActiveParent(currentParent.path);
    }
  }, [location.pathname, menuItems]);

  const handleParentMenuClick = (item) => {
    if (item.subItems && item.subItems.length > 0) {
      navigate(item.subItems[0].path);
    }
    const path = item.path;
    setActiveParent(path);
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
              key={item.path} // استفاده از path به عنوان کلید منحصر به فرد
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

                  {!isCollapsed && (
                    <ul className={`submenu-list ${isOpen ? "open" : ""}`}>
                      {item.subItems.map((subItem) => (
                        <li key={subItem.path} className="submenu-item">
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
