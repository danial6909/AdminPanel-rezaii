// src/components/Sidebar/Sidebar.jsx

import React from "react";
import { useTranslation } from "react-i18next";
import Logo from "../Logo/Logo";
import "./Sidebar.css";
import Menuitem from "../Menuitem/Menuitem";

function Sidebar({
  isDesktopCollapsed,
  isMobileSidebarOpen,
  viewMode,
  closeMobileSidebar,
}) {
  const { i18n } = useTranslation();

  // تابعی برای ساخت رشته کلاس‌های CSS بر اساس وضعیت فعلی
  const getSidebarClasses = () => {
    let classes = ["sidebar-container"];

    // کلاس جهت‌دهی را بر اساس زبان فعلی اضافه می‌کند
    if (i18n.dir() === "rtl") {
      classes.push("sidebar-rtl");
    } else {
      classes.push("sidebar-ltr");
    }

    // بر اساس حالت نمایش، کلاس مناسب را اضافه می‌کند
    switch (viewMode) {
      case "mobile":
        if (isMobileSidebarOpen) classes.push("mobile-open");
        break;
      case "tablet":
        classes.push("collapsed"); // در حالت تبلت، همیشه جمع‌شده است
        break;
      case "desktop":
        if (isDesktopCollapsed) classes.push("collapsed");
        break;
      default:
        break;
    }
    return classes.join(" ");
  };

  // این متغیر مشخص می‌کند که آیا کامپوننت‌های فرزند (لوگو و منو) باید در حالت جمع‌شده نمایش داده شوند یا نه
  // این حالت فقط در تبلت و دسکتاپ جمع‌شده معنی دارد
  const isCollapsedForChildren =
    viewMode === "tablet" || (viewMode === "desktop" && isDesktopCollapsed);

  return (
    <div className={getSidebarClasses()}>
      <div className="sidebar-header">
        <Logo isCollapsed={isCollapsedForChildren} />
      </div>
      <div className="menu-wrapper">
        <Menuitem
          isCollapsed={isCollapsedForChildren}
          viewMode={viewMode}
          closeMobileSidebar={closeMobileSidebar} // پاس دادن تابع بستن به کامپوننت منو
        />
      </div>
    </div>
  );
}

export default Sidebar;
