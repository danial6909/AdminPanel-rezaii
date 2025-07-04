// // src/components/Sidebar.jsx
// import React from "react";
// import Menuitem from "./Menuitem";
// import "./Sidebar.css";

// function Sidebar() {
//   return (
//     <div className="sidebar-container">
//       <Menuitem />
//     </div>
//   );
// }

// export default Sidebar;



// src/components/Sidebar.jsx
import React, { useState } from 'react';
import Menuitem from './Menuitem'; // نام کامپوننت را به MenuList تغییر دادم تا معنادارتر باشد
import Logo from './Logo';
import './Sidebar.css';

// آیکون برای دکمه باز و بسته کردن
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { IconButton } from '@mui/material';

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    // افزودن کلاس 'collapsed' به صورت داینامیک
    <div className={`sidebar-container ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <Logo isCollapsed={isCollapsed} />
      </div>

      <div className="menu-wrapper">
        <Menuitem isCollapsed={isCollapsed} />
      </div>

      <div className="sidebar-footer">
        <IconButton onClick={toggleSidebar} className="toggle-button">
          <ChevronRightIcon className="toggle-icon" />
        </IconButton>
      </div>
    </div>
  );
}

export default Sidebar;