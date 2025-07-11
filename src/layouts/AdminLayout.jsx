// src/layouts/AdminLayout.js
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import "./AdminLayout.css";

function AdminLayout() {
  //استیت کنترل باز و بسته شدن ساید بار
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed((prevState) => !prevState);
  };

  return (
    <div className="admin-container">
      <div className="admin-layout">
        <div className="admin-right">
          {/*  ارسال وضعیت به سایدبار */}
          <Sidebar isCollapsed={isSidebarCollapsed} />
        </div>

        <div className="admin-left">
          {/* ارسال تابع و وضعیت به هدر */}
          <Header
            toggleSidebar={toggleSidebar}
            isSidebarCollapsed={isSidebarCollapsed}
          />

          <main className="admin-main">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
