// src/components/Logo.jsx
import React from "react";
// import logoFull from "./logo-full.svg"; // مسیر لوگوی کامل خود را قرار دهید
// import logoIcon from "./logo-icon.svg"; // مسیر لوگوی کوچک (آیکون) را قرار دهید

const Logo = ({ isCollapsed }) => {
  return (
    <div className="logo-container">
      {/* نمایش لوگوی کامل یا فقط آیکون بر اساس وضعیت سایدبار */}
      {/* <img
        src={isCollapsed ? logoIcon : logoFull}
        alt="لوگو"
        className="logo-image"
      /> */}
    </div>
  );
};

export default Logo;
