// src/components/Logo.jsx
import React from "react";
import "./Logo.css"; 
import logo from "../assets/images/logos/logo1.svg";

const Logo = ({ isCollapsed }) => {
  return (
  
    <div className={`logo-container ${isCollapsed ? "collapsed" : ""}`}>
      
      {/* بخش آیکون که همیشه نمایش داده می‌شود */}
      <img
        className="logo-icon"
        src={logo}
        alt="لوگو"
      />

      {/* این بخش فقط در حالت باز بودن سایدبار نمایش داده می‌شود */}
      {!isCollapsed && (
        <div className="logo-text-wrapper">
          <h3 className="logo-text">مبنا رایانه کیان</h3>
        </div>
      )}
    </div>
  );
};

export default Logo;
