import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import ResourceManagementPage from "../ResourceManagementPage/ResourceManagementPage";
import axiosInstance from "../../utils/axiosInstance";

// ✅ ۱. وارد کردن کامپوننت سلکت سفارشی
import CustomSelect from "../../components/CustomSelect/CustomSelect";

const UsersPage = () => {
  const { t } = useTranslation();
  const [roles, setRoles] = useState([]);
  const [roleFilter, setRoleFilter] = useState("");

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axiosInstance.get("/role");
        setRoles(response.data);
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      }
    };
    fetchRoles();
  }, []);

  // ✅ ۲. گزینه‌های سلکت باکس رو یک بار با useMemo می‌سازیم تا بهینه باشه
  const roleOptions = useMemo(() => {
    return roles.map((role) => ({
      value: role.name,
      label: role.name,
    }));
  }, [roles]);

  const userColumns = [
    { key: "id", header: t("userManagement.table.id") },
    {
      key: "firstName",
      header: t("userManagement.table.firstName"),
      render: (item) => (
        <div className="table-cell-with-avatar">
          <img
            src={
              item.avatar ||
              `https://placehold.co/30x30/4f46e5/ffffff?text=${item.firstName
                ?.charAt(0)
                .toUpperCase()}`
            }
            alt="Avatar"
            className="avatar-small"
          />
          <span>{item.firstName || "N/A"}</span>
        </div>
      ),
    },
    { key: "lastName", header: t("userManagement.table.lastName") },
    { key: "username", header: t("userManagement.table.username") },
    {
      key: "role",
      header: t("userManagement.table.role"),
      render: (user) => (
        <span className={`role-badge role-${user.role?.toLowerCase()}`}>
          {user.role || "N/A"}
        </span>
      ),
    },
  ];

  const userFormFields = [
    {
      id: "firstName",
      label: t("userManagement.form.firstName"),
      type: "text",
      required: true,
    },
    {
      id: "lastName",
      label: t("userManagement.form.lastName"),
      type: "text",
      required: true,
    },
    {
      id: "username",
      label: t("userManagement.form.username"),
      type: "text",
      required: true,
    },
    {
      id: "password",
      label: t("userManagement.form.password"),
      type: "password",
      required: false,
      placeholder: t("userManagement.form.passwordPlaceholder"),
    },
    {
      id: "role",
      label: t("userManagement.form.role"),
      type: "select",
      required: true,
      options: roleOptions, // ✅ استفاده از آپشن‌های بهینه شده
    },
  ];

  const searchFields = ["firstName", "lastName", "username", "role"];

  const initialUserState = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    role: roles.length > 0 ? roles[0].name : "",
  };

  const formatUserData = (user) => ({
    id: user.id,
    username: user.username,
    avatar: user.avatar,
    firstName: user.firstName || "N/A",
    lastName: user.lastName || "N/A",
    role: user.role?.name || "N/A",
  });

  // ✅ ۳. بازنویسی کامپوننت فیلتر با استفاده از CustomSelect
  const RoleFilterComponent = () => {
    // گزینه‌ی "همه نقش‌ها" رو به لیست اضافه می‌کنیم
    const filterOptions = [
      { value: "", label: t("userManagement.allRoles") },
      ...roleOptions,
    ];

    const handleFilterChange = (e) => {
      setRoleFilter(e.target.value);
    };

    return (
      <CustomSelect
        name="roleFilter"
        options={filterOptions}
        value={roleFilter}
        onChange={handleFilterChange}
      />
    );
  };

  return (
    <ResourceManagementPage
      resourceName="user"
      columns={userColumns}
      formFields={userFormFields}
      searchFields={searchFields}
      initialState={initialUserState}
      formatDataForDisplay={formatUserData}
      FilterComponent={RoleFilterComponent}
      filterValue={roleFilter}
      filterField="role"
    />
  );
};

export default UsersPage;
