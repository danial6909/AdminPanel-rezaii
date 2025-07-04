// src/components/Logo.jsx
import React from "react";
import "./Logo.css"; 

const Logo = ({ isCollapsed }) => {
  return (
    // به این کانتینر کلاس داینامیک می‌دهیم تا در حالت بسته بودن استایلش تغییر کند
    <div className={`logo-container ${isCollapsed ? "collapsed" : ""}`}>
      {/* بخش آیکون که همیشه نمایش داده می‌شود */}
     
        <img
          className="logo-icon"
          src="/src/assets/images/logos/logo1.svg"
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
