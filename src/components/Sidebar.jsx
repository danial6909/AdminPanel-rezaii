// src/components/Sidebar.jsx
import React from "react";
import Menuitem from "./Menuitem";
import Logo from "./Logo";
import "./Sidebar.css";
import "./Menuitem.css";

function Sidebar({ isCollapsed }) {
  return (

    <div className={`sidebar-container ${isCollapsed ? "collapsed" : ""}`}>

      {/* هدر ساید بار  */}
      <div className="sidebar-header">
        <Logo isCollapsed={isCollapsed} />
      </div>

      {/* ایتم های ساید بار  */}
      <div className="menu-wrapper">
        <Menuitem isCollapsed={isCollapsed} />
      </div>
      
    </div>
  );
}

export default Sidebar;
