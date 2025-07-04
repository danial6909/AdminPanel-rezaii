// src/components/Sidebar.jsx
import React from "react";
import Menuitem from "./Menuitem";
import Logo from "./Logo";
import "./Sidebar.css";
import "./Menuitem.css";

// کامپوننت حالا prop به نام isCollapsed را مستقیماً دریافت و استفاده می‌کند
function Sidebar({ isCollapsed }) {
  return (
    // کلاس 'collapsed' مستقیماً بر اساس prop تنظیم می‌شود
    <div className={`sidebar-container ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <Logo isCollapsed={isCollapsed} />
      </div>

      <div className="menu-wrapper">
        <Menuitem isCollapsed={isCollapsed} />
      </div>

    </div>
  );
}

export default Sidebar;
