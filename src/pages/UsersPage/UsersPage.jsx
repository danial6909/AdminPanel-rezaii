// import React, { useState, useEffect, useRef } from "react";
// import { useTranslation } from "react-i18next";
// import axiosInstance from "../../utils/axiosInstance"; // مسیر صحیح را بررسی کنید
// import "./UsersPage.css";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";
// import SearchIcon from "@mui/icons-material/Search";

// const Modal = ({ isOpen, onClose, children, title }) => {
//   if (!isOpen) return null;
//   return (
//     <div className={`modal ${isOpen ? "active" : ""}`}>
//       <div className="modal-content">
//         <div className="modal-header">
//           <h2>{title}</h2>
//           <button className="close-btn" onClick={onClose}>
//             &times;
//           </button>
//         </div>
//         {children}
//       </div>
//     </div>
//   );
// };

// const ConfirmationDialog = ({ isOpen, onClose, onConfirm, message, title }) => {
//   if (!isOpen) return null;
//   return (
//     <div className={`modal ${isOpen ? "active" : ""}`}>
//       <div className="modal-content small-modal">
//         <div className="modal-header">
//           <h2>{title}</h2>
//           <button className="close-btn" onClick={onClose}>
//             &times;
//           </button>
//         </div>
//         <p className="modal-message">{message}</p>
//         <div className="modal-footer">
//           <button className="btn btn-cancel" onClick={onClose}>
//             Cancel
//           </button>
//           <button className="btn btn-submit" onClick={onConfirm}>
//             Confirm Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const UsersPage = () => {
//   const { t, i18n } = useTranslation();
//   const [users, setUsers] = useState([]);
//   const [roles, setRoles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [roleFilter, setRoleFilter] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalTitle, setModalTitle] = useState(t("userManagement.addTitle"));
//   const [currentUser, setCurrentUser] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
//   const [userToDeleteId, setUserToDeleteId] = useState(null);
//   const searchInputRef = useRef(null);

//   // دریافت اطلاعات اولیه (کاربران و نقش‌ها) از سرور
//   useEffect(() => {
//     const fetchInitialData = async () => {
//       try {
//         setLoading(true);
//         // دریافت همزمان کاربران و نقش‌ها برای بهینه‌سازی
//         const [usersResponse, rolesResponse] = await Promise.all([
//           axiosInstance.get("/user"),
//           axiosInstance.get("/role"), // مسیری که لیست نقش‌ها را برمی‌گرداند
//         ]);

//         const formattedUsers = usersResponse.data.map((user) => ({
//           id: user.id,
//           username: user.username,
//           firstName: user.firstName || "N/A",
//           lastName: user.lastName || "N/A",
//           role: user.role, // آبجکت کامل نقش را برای دسترسی آسان نگه می‌داریم
//         }));

//         setUsers(formattedUsers);
//         setRoles(rolesResponse.data); // ذخیره لیست نقش‌ها در استیت
//         setError(null);
//       } catch (err) {
//         setError(t("userManagement.fetchError"));
//         console.error("Failed to fetch data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInitialData();
//   }, [t]); // با تغییر زبان، داده‌ها مجددا فراخوانی می‌شوند

//   // افکت برای حذف استایل‌های اضافی از اینپوت جستجو
//   useEffect(() => {
//     const inputElement = searchInputRef.current;
//     if (inputElement && inputElement.hasAttribute("style")) {
//       inputElement.removeAttribute("style");
//     }
//   }, [searchTerm, i18n.language]);

//   // فیلتر کردن کاربران بر اساس عبارت جستجو و نقش انتخاب شده
//   const filteredUsers = users.filter((user) => {
//     const searchLower = searchTerm.toLowerCase();
//     const matchesSearch =
//       user.username.toLowerCase().includes(searchLower) ||
//       user.firstName.toLowerCase().includes(searchLower) ||
//       user.lastName.toLowerCase().includes(searchLower);

//     // فیلتر بر اساس نام نقش
//     const matchesRole = roleFilter === "" || user.role?.name === roleFilter;
//     return matchesSearch && matchesRole;
//   });

//   // باز کردن مودال برای افزودن کاربر جدید
//   const handleAddUserClick = () => {
//     setIsEditing(false);
//     setModalTitle(t("userManagement.addTitle"));
//     setCurrentUser({
//       id: null,
//       username: "",
//       password: "",
//       firstName: "",
//       lastName: "",
//       role: roles.length > 0 ? roles[0] : null, // انتخاب نقش پیش‌فرض
//     });
//     setIsModalOpen(true);
//   };

//   // باز کردن مودال برای ویرایش کاربر موجود
//   const handleEditClick = (user) => {
//     setIsEditing(true);
//     setModalTitle(t("userManagement.editTitle"));
//     // ایجاد یک کپی عمیق از اطلاعات کاربر تا تغییرات ناخواسته در جدول اعمال نشود
//     setCurrentUser(JSON.parse(JSON.stringify(user)));
//     setIsModalOpen(true);
//   };

//   // باز کردن دیالوگ تایید برای حذف کاربر
//   const handleDeleteClick = (id) => {
//     setUserToDeleteId(id);
//     setIsConfirmDialogOpen(true);
//   };

//   // تایید نهایی و ارسال درخواست حذف کاربر
//   const handleConfirmDelete = async () => {
//     try {
//       await axiosInstance.delete(`/user/${userToDeleteId}`);
//       // حذف کاربر از لیست نمایش داده شده در UI
//       setUsers(users.filter((user) => user.id !== userToDeleteId));
//     } catch (err) {
//       console.error("Failed to delete user:", err);
//     } finally {
//       setIsConfirmDialogOpen(false);
//       setUserToDeleteId(null);
//     }
//   };

//   // مدیریت ارسال فرم (برای افزودن و ویرایش کاربر)
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     const form = e.target;

//     // ۱. آماده‌سازی داده‌های پایه از فرم
//     const baseData = {
//       firstName: form.firstName.value,
//       lastName: form.lastName.value,
//       username: form.username.value,
//       role: form.role.value // ارسال آیدی نقش به جای نام آن
//     };

//     // ۲. افزودن رمز عبور فقط در صورتی که کاربر مقدار جدیدی وارد کرده باشد
//     if (form.password.value) {
//       baseData.password = form.password.value;
//     }

//     try {
//       if (isEditing) {
//         // --- حالت ویرایش ---
//         const response = await axiosInstance.patch(
//           `/user/${currentUser.id}`,
//           baseData
//         );
//         // آپدیت لیست کاربران با اطلاعات جدید بازگشتی از سرور
//         setUsers(
//           users.map((user) =>
//             user.id === currentUser.id ? response.data : user
//           )
//         );
//       } else {
//         // --- حالت افزودن ---
//         const response = await axiosInstance.post("/user/create", baseData);
//         setUsers([...users, response.data]);
//       }
//       // بستن مودال و پاک کردن فرم
//       setIsModalOpen(false);
//       setCurrentUser(null);
//     } catch (err) {
//       console.error("Failed to save user:", err.response?.data || err.message);
//     }
//   };

//   // مدیریت تغییرات ورودی‌های فرم مودال
//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     if (id === "role") {
//       // برای دراپ‌داون نقش، آبجکت کامل نقش را بر اساس آیدی پیدا می‌کنیم
//       const selectedRole = roles.find((r) => r.id === parseInt(value, 10));
//       setCurrentUser((prev) => ({ ...prev, role: selectedRole }));
//     } else {
//       // برای بقیه ورودی‌ها، استیت را مستقیما آپدیت می‌کنیم
//       setCurrentUser((prev) => ({ ...prev, [id]: value }));
//     }
//   };

//   // تابع برای رندر کردن محتوای جدول
//   const renderTableContent = () => {
//     if (loading)
//       return (
//         <tr>
//           <td colSpan="7" className="status-cell">
//             {t("userManagement.loading")}
//           </td>
//         </tr>
//       );
//     if (error)
//       return (
//         <tr>
//           <td colSpan="7" className="status-cell error">
//             {error}
//           </td>
//         </tr>
//       );
//     if (filteredUsers.length === 0)
//       return (
//         <tr>
//           <td colSpan="7" className="status-cell">
//             {t("userManagement.noUsersFound")}
//           </td>
//         </tr>
//       );

//     return filteredUsers.map((user) => (
//       <tr key={user.id}>
//         <td>{user.id}</td>
//         <td className="table-cell-with-avatar">
//           <img
//             src={`https://placehold.co/30x30/4f46e5/ffffff?text=${user.firstName
//               .charAt(0)
//               .toUpperCase()}`}
//             alt="Avatar"
//             className="avatar-small"
//           />
//           <span>{user.firstName}</span>
//         </td>
//         <td>{user.lastName}</td>
//         <td>{user.username}</td>
//         <td>{"********"}</td>
//         <td>
//           {/* نمایش بج نقش با استایل مخصوص */}
//           <span className={`role-badge role-${user.role?.name}`}>
//             {t(user.role?.name || "N/A")}
//           </span>
//         </td>
//         <td>
//           <div className="action-buttons">
//             <button
//               className="btn btn-edit"
//               title={t("userManagement.table.edit")}
//               onClick={() => handleEditClick(user)}
//             >
//               <EditIcon fontSize="small" />
//             </button>
//             <button
//               className="btn btn-delete"
//               title={t("userManagement.table.delete")}
//               onClick={() => handleDeleteClick(user.id)}
//             >
//               <DeleteIcon fontSize="small" />
//             </button>
//           </div>
//         </td>
//       </tr>
//     ));
//   };

//   return (
//     <div className="container" dir={i18n.dir()}>
//       <div className="header">
//         <h1>{t("userManagement.title")}</h1>
//       </div>

//       <div className="controls">
//         <div className="search-box">
//           <span className="search-icon">
//             <SearchIcon />
//           </span>
//           <input
//             ref={searchInputRef}
//             type="text"
//             placeholder={t("userManagement.searchPlaceholder")}
//             id="searchInput"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <select
//           className="filter-select"
//           id="roleFilter"
//           value={roleFilter}
//           onChange={(e) => setRoleFilter(e.target.value)}
//         >
//           <option value="">{t("userManagement.allRoles")}</option>
//           {/* فیلتر بر اساس نام نقش */}
//           {roles.map((role) => (
//             <option key={role.id} value={role.name}>
//               {t(role.name)}
//             </option>
//           ))}
//         </select>
//         <button className="add-user-btn" onClick={handleAddUserClick}>
//           <AddIcon />
//           <span>{t("userManagement.addUserButton")}</span>
//         </button>
//       </div>

//       <div className="table-container">
//         <table>
//           <thead>
//             <tr>
//               <th>{t("userManagement.table.id")}</th>
//               <th>{t("userManagement.table.firstName")}</th>
//               <th>{t("userManagement.table.lastName")}</th>
//               <th>{t("userManagement.table.username")}</th>
//               <th>{t("userManagement.table.password")}</th>
//               <th>{t("userManagement.table.role")}</th>
//               <th>{t("userManagement.table.actions")}</th>
//             </tr>
//           </thead>
//           <tbody>{renderTableContent()}</tbody>
//         </table>
//       </div>

//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title={modalTitle}
//       >
//         <form onSubmit={handleFormSubmit}>
//           <input type="hidden" id="userId" value={currentUser?.id || ""} />
//           <div className="form-group">
//             <label htmlFor="firstName">
//               {t("userManagement.form.firstName")}
//             </label>
//             <input
//               type="text"
//               id="firstName"
//               className="form-control"
//               value={currentUser?.firstName || ""}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="lastName">
//               {t("userManagement.form.lastName")}
//             </label>
//             <input
//               type="text"
//               id="lastName"
//               className="form-control"
//               value={currentUser?.lastName || ""}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="username">
//               {t("userManagement.form.username")}
//             </label>
//             <input
//               type="text"
//               id="username"
//               className="form-control"
//               value={currentUser?.username || ""}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">
//               {t("userManagement.form.password")}
//             </label>
//             <input
//               type="password"
//               id="password"
//               className="form-control"
//               placeholder={
//                 isEditing ? t("userManagement.form.passwordPlaceholder") : ""
//               }
//               onChange={handleInputChange}
//               required={!isEditing}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="role">{t("userManagement.form.role")}</label>
//             {/* دراپ‌داون نقش‌ها که با استیت کنترل می‌شود */}
//             <select
//               id="role"
//               className="form-control"
//               value={currentUser?.role?.name || ""}
//               onChange={handleInputChange}
//               required
//             >
//               {roles.map((role) => (
//                 // مقدار هر آپشن، آیدی نقش است تا انتخاب به درستی کار کند
//                 <option key={role.name} value={role.name}>
//                   {t(role.name)}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="modal-footer">
//             <button
//               type="button"
//               className="btn btn-cancel"
//               onClick={() => setIsModalOpen(false)}
//             >
//               {t("userManagement.form.cancel")}
//             </button>
//             <button type="submit" className="btn btn-submit">
//               {t("userManagement.form.save")}
//             </button>
//           </div>
//         </form>
//       </Modal>

//       <ConfirmationDialog
//         isOpen={isConfirmDialogOpen}
//         onClose={() => setIsConfirmDialogOpen(false)}
//         onConfirm={handleConfirmDelete}
//         title={t("userManagement.confirmDeleteTitle")}
//         message={t("userManagement.confirmDeleteMessage", {
//           userId: userToDeleteId,
//         })}
//       />
//     </div>
//   );
// };

// export default UsersPage;

// /////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../utils/axiosInstance"; 
import "./UsersPage.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";


const Modal = ({ isOpen, onClose, children, title }) => {
  // اگر مودال باز نباشد، چیزی رندر نمی‌شود
  if (!isOpen) return null;

  return (
    // کلاس 'active' برای نمایش انیمیشن باز شدن مودال اضافه می‌شود
    <div className={`modal ${isOpen ? "active" : ""}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onClose}>
            &times; {/* کاراکتر ضربدر برای دکمه بستن */}
          </button>
        </div>
        {/* محتوای اصلی مودال در اینجا قرار می‌گیرد */}
        {children}
      </div>
    </div>
  );
};


const ConfirmationDialog = ({ isOpen, onClose, onConfirm, message, title }) => {
  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? "active" : ""}`}>
      {/* استفاده از کلاس 'small-modal' برای اندازه کوچکتر دیالوگ */}
      <div className="modal-content small-modal">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <p className="modal-message">{message}</p>
        <div className="modal-footer">
          <button className="btn btn-cancel" onClick={onClose}>
            انصراف
          </button>
          <button className="btn btn-submit" onClick={onConfirm}>
            تایید حذف
          </button>
        </div>
      </div>
    </div>
  );
};


const UsersPage = () => {
  // هوک برای مدیریت ترجمه‌ها
  const { t, i18n } = useTranslation();``

  // --- تعریف State ها ---
  const [users, setUsers] = useState([]); // لیست تمام کاربران
  const [roles, setRoles] = useState([]); // لیست تمام نقش‌های موجود

  const [loading, setLoading] = useState(true); // وضعیت بارگذاری داده‌ها
  const [error, setError] = useState(null); // برای نگهداری پیام خطا

  const [searchTerm, setSearchTerm] = useState(""); // مقدار ورودی جستجو
  const [roleFilter, setRoleFilter] = useState(""); // نقش انتخاب شده برای فیلتر

  const [isEditing, setIsEditing] = useState(false); // مشخص می‌کند که مودال در حالت ویرایش است یا افزودن
  const [modalTitle, setModalTitle] = useState(t("userManagement.addTitle")); // عنوان مودال
  const [currentUser, setCurrentUser] = useState(null); // کاربری که در حال ویرایش یا افزودن است
  const [isModalOpen, setIsModalOpen] = useState(false); // وضعیت باز بودن مودال افزودن/ویرایش

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false); // وضعیت باز بودن دیالوگ تایید حذف
  const [userToDeleteId, setUserToDeleteId] = useState(null); // آیدی کاربری که قرار است حذف شود

  
// --- دریافت اطلاعات اولیه (کاربران و نقش‌ها) از سرور ---
useEffect(() => {
  const fetchInitialData = async () => {
    try {
      setLoading(true);
      // استفاده از Promise.all برای ارسال همزمان درخواست‌ها و افزایش سرعت
      const [usersResponse, rolesResponse] = await Promise.all([
        axiosInstance.get("/user"),
        // رول رو برای این میگیریم که در قسمت ویرایش یا اضافه کردن کاربر قسمت نقش بدونیم چه نقش هایی در بک اند وجود دارد تا انتخاب کنیم و در سلکت باکس نشان دهیم داینامیک نشون بدیم نه استاتیک
        axiosInstance.get("/role"), // اندپوینتی که لیست نقش‌ها را برمی‌گرداند
      ]);
      console.log(usersResponse.data);

      // فرمت کردن داده‌های کاربران برای نمایش بهتر
      // تفاوت اصلی اینجاست. کد شما مقادیر null را با رشته 'N/A' جایگزین کرده است
      const formattedUsers = usersResponse.data.map((user) => ({
        id: user.id,
        username: user.username,
        firstName: user.firstName || "N/A", // مقدار پیش‌فرض در صورت عدم وجود
        lastName: user.lastName || "N/A",
        role: user.role.name,
      }));
      console.log(formattedUsers);

      setUsers(formattedUsers);
      setRoles(rolesResponse.data); // ذخیره لیست نقش‌ها در استیت
      setError(null); // پاک کردن خطا در صورت موفقیت
    } catch (err) {
      setError(t("userManagement.fetchError")); // تنظیم پیام خطا
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false); // پایان حالت بارگذاری در هر صورت
    }
  };

  fetchInitialData();
}, [t]); // با تغییر زبان، داده‌ها مجددا فراخوانی می‌شوند تا ترجمه‌ها آپدیت شوند

  
  // --- فیلتر کردن کاربران بر اساس عبارت جستجو و نقش انتخاب شده ---
  // ابجکتی از کاربرانی که فیلتر شدن را  ذخیره میکند
  // اگر فیلتری در کار نبود کل کاربران را داخل فیلتر قرار میده
  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase(); // تبدیل عبارت جستجو به حروف کوچک برای جستجوی غیرحساس به بزرگی و کوچکی حروف

    const matchesSearch =
      user.username.toLowerCase().includes(searchLower) ||
      user.firstName.toLowerCase().includes(searchLower) ||
      user.lastName.toLowerCase().includes(searchLower);

    // فیلتر بر اساس نام نقش
    const matchesRole = roleFilter === "" || user.role?.name === roleFilter;

    return matchesSearch && matchesRole;
  });

  // --- مدیریت رویدادها (Event Handlers) ---

  // باز کردن مودال برای افزودن کاربر جدید
  const handleAddUserClick = () => {
    setIsEditing(false); // حالت افزودن
    setModalTitle(t("userManagement.addTitle"));// عنوان مودال
    setCurrentUser({ // مقادیر پیشفرض داخل اینپوت های مودال
      id: null,
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      role: roles.length > 0 ? roles[0] : null, // انتخاب نقش پیش‌فرض (اولین نقش در لیست)
    });
    setIsModalOpen(true);
  };

  // باز کردن مودال برای ویرایش کاربر موجود
  const handleEditClick = (user) => {
    setIsEditing(true); // حالت ویرایش
    setModalTitle(t("userManagement.editTitle"));
    // استفاده از JSON.parse(JSON.stringify()) برای ایجاد یک کپی عمیق از آبجکت کاربر.
    // این کار از تغییر ناخواسته اطلاعات در جدول قبل از ذخیره نهایی جلوگیری می‌کند.
    // یپس یک کپی از کاربری که روش کلیک شده میگیره و روی کپی تغییرات اعمال میکنه
    setCurrentUser(JSON.parse(JSON.stringify(user)));
    // از این نمیتوان استفاده کرد چون اگر ابجکت کاربر تو در تو باشد مثل الان که داخل کاربر ابجکت رول داریم ن آبجکت داخلی کپی نمی‌شود، بلکه فقط آدرس  آن کپی می‌شود
    // setCurrentUser((prev) => ({ ...prev, ...user }));
    setIsModalOpen(true);
  };

  // باز کردن دیالوگ تایید برای حذف کاربر
  const handleDeleteClick = (id) => {
    setUserToDeleteId(id); // ذخیره آیدی کاربر برای حذف
    setIsConfirmDialogOpen(true);
  };

  // تایید نهایی و ارسال درخواست حذف کاربر به سرور
  const handleConfirmDelete = async () => {
    try {
      await axiosInstance.delete(`/user/${userToDeleteId}`);

      // حذف کاربر از لیست کاربران در UI برای نمایش آنی نتیجه
      // چون در اصل از دیتا بیس حذف میشه و در رندر بعدی اون کاربر تو لیتس نیست
      setUsers(users.filter((user) => user.id !== userToDeleteId));

    } catch (err) {
      console.error("Failed to delete user:", err);
    } finally {
      setIsConfirmDialogOpen(false); // بستن دیالوگ
      setUserToDeleteId(null); // پاک کردن آیدی
    }
  };

  // مدیریت ارسال فرم (برای افزودن و ویرایش کاربر)
  const handleFormSubmit = async (e) => {
    e.preventDefault(); // جلوگیری از رفرش شدن صفحه
    const form = e.target;

    // ساخت ابجکت وگذاشتن مقادیر اینپوت ها برای ارسال به بک اند
    //در زیر نام و نام خانوادگی و... همه ایدی اینپوت هایی داخل فرم هستند
    // و درواقع داریم به مقادیر اینپوت ها دسترسی پیدا میکنیم با ولیو
    const baseData = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      username: form.username.value,
      role: form.role.value, 
    };

    //  افزودن رمز عبور به ابجکت فقط در صورتی که کاربر مقدار جدیدی وارد کرده باشد
    // در حالت ویرایش، اگر فیلد رمز عبور خالی باشد، رمز قبلی حفظ می‌شود.
    if (form.password.value) {
      baseData.password = form.password.value;
    }

    try {
      // --- حالت ویرایش ---
      if (isEditing) {
        // استفاده از متد PATCH برای آپدیت بخشی از اطلاعات
        const response = await axiosInstance.patch(
          `/user/${currentUser.id}`,
          baseData
        );
        // آپدیت لیست کاربران با اطلاعات جدید بازگشتی از سرور
        setUsers(
          users.map((user) =>
            user.id === currentUser.id ? response.data : user
          )
        );
      } else {
        // --- حالت افزودن ---
        const response = await axiosInstance.post("/user/create", baseData);
        // افزودن کاربر جدید به انتهای لیست
        setUsers([...users, response.data]);
      }
      // بستن مودال و پاک کردن فرم
      setIsModalOpen(false);
      setCurrentUser(null);
    } catch (err) {
      console.error("Failed to save user:", err.response?.data || err.message);
      // اینجا می‌توان خطای دریافتی از سرور را به کاربر نمایش داد
    }
  };

  // مدیریت تغییرات ورودی‌های فرم مودال
  // این یک روش خفن برای هندل کردن همه اینپوت هاست
  // و نیازی به تابع جدا برای هر اینپوت نیست
  const handleInputChange = (e) => {  
    const { id, value } = e.target;
    // آپدیت کردن ابجکت  با مقادیر جدید که در اینپوت نوشته میشه
    // ممکنه ابجکت خالی باشه یا پر باشه از قبل 
    // در حالتی که افزودن کاربر بشه ابجکت خالیه 
    // در حالتی که ویرایش بشه ابجکت مقادیر همون کاربر را ابتدا در اینپوت ها نشان میدهد
    setCurrentUser((prev) => ({ ...prev, [id]: value }));
  };


  // --- توابع رندر ---------------------------------------------------------------------------------

  // تابع برای رندر کردن محتوای جدول (بدنه جدول)
  const renderTableContent = () => {

    // نشان دادن لودینک
    if (loading)
      return (
        <tr>
          <td colSpan="7" className="status-cell">
            {t("userManagement.loading")}
          </td>
        </tr>
      );
    
    // اگر اتصال مشکل داشته باشد خطا میده
    if (error)
      return (
        <tr>
          <td colSpan="7" className="status-cell error">
            {error}
          </td>
        </tr>
      );
    
    // اگر هیچ کاربری در دیتا بیس نبود این پیام نمایش داده میشه
    if (filteredUsers.length === 0)
      return (
        <tr>
          <td colSpan="7" className="status-cell">
            {t("userManagement.noUsersFound")}
          </td>
        </tr>
      );
    
    // اگر هیچ کدوم از شرطا اوکی نشد این قسمت ریترن میشود
    // رندر کردن ردیف‌های جدول برای هر کاربر فیلتر شده
    // اگر فیلتری وجود نداشته باشد همه را نشان میدهد
    return filteredUsers.map((user) => (

      <tr key={user.id}>

        {/* ایدی کاربر */}
        <td>{user.id}</td>

        {/* نام و کاور کاربر */}
        <td className="table-cell-with-avatar">
          {/* نمایش آواتار با حرف اول نام کاربر */}
          <img
            src={`https://placehold.co/30x30/4f46e5/ffffff?text=${user.firstName
              .charAt(0)
              .toUpperCase()}`}
            alt="Avatar"
            className="avatar-small"
          />
          <span>{user.firstName}</span>
        </td>

        {/* نام خانوادگی کاربر */}
        <td>{user.lastName}</td>

        {/* یوزرنیم کاربر */}
        <td>{user.username}</td>

        {/* پسورد کاربر */}
        <td>{"********"}</td> {/* عدم نمایش رمز عبور */}

        {/* نقش کاربر */}
        <td>
          {/* نمایش بج نقش با استایل مخصوص بر اساس نام نقش */}
          <span className={`role-badge role-${user.role?.name?.toLowerCase()}`}>
            {t(user.role?.name || "N/A")}
          </span>
        </td>

        {/* دکمه ویرایش و حذف کاربر */}
        <td>
          <div className="action-buttons">

            {/* دکمه ویرایش  */}
            <button
              className="btn btn-edit"
              title={t("userManagement.table.edit")}
              onClick={() => handleEditClick(user)}
            >
              <EditIcon fontSize="small" />
            </button>

            {/* دکمه حذف  */}
            <button
              className="btn btn-delete"
              title={t("userManagement.table.delete")}
              onClick={() => handleDeleteClick(user.id)}
            >
              <DeleteIcon fontSize="small" />
            </button>

          </div>
        </td>

      </tr>

    ));

  };


  // --- JSX نهایی کامپوننت ---
  return (

    <div className="container" dir={i18n.dir()}>

      <div className="header">
        <h1>{t("userManagement.title")}</h1>
      </div>

      {/* بخش کنترل‌ها: جستجو، فیلتر و دکمه افزودن */}
      <div className="controls">

        {/* دکمه سرچ */}
        <div className="search-box">
          <span className="search-icon">
            <SearchIcon />
          </span>
          <input
            // ref={searchInputRef}
            type="text"
            placeholder={t("userManagement.searchPlaceholder")}
            id="searchInput"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* فیلتر نقش ها  */}
        <select
          className="filter-select"
          id="roleFilter"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">{t("userManagement.allRoles")}</option>
          {/* ایجاد گزینه‌ها بر اساس لیست نقش‌های موجود */}
          {roles.map((role) => (
            <option key={role.id} value={role.name}>
              {role.name}
            </option>
          ))}
        </select>

        {/* دکمه اضافه کردن کاربر */}
        <button className="add-user-btn" onClick={handleAddUserClick}>
          <PersonAddAltIcon />
          <span>{t("userManagement.addUserButton")}</span>
        </button>

      </div>

      {/* کانتینر جدول کاربران */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>{t("userManagement.table.id")}</th>
              <th>{t("userManagement.table.firstName")}</th>
              <th>{t("userManagement.table.lastName")}</th>
              <th>{t("userManagement.table.username")}</th>
              <th>{t("userManagement.table.password")}</th>
              <th>{t("userManagement.table.role")}</th>
              <th>{t("userManagement.table.actions")}</th>
            </tr>
          </thead>
          <tbody>{renderTableContent()}</tbody>
        </table>
      </div>

      {/* مودال افزودن/ویرایش کاربر */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
      >
        <form onSubmit={handleFormSubmit}>

          <input type="hidden" id="userId" value={currentUser?.id || ""} />

          {/* اینپوت نام  */}
          <div className="form-group">
            <label htmlFor="firstName">
              {t("userManagement.form.firstName")}
            </label>
            <input
              type="text"
              id="firstName"
              className="form-control"
              value={currentUser?.firstName || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* اینپوت نام خانوادگی */}
          <div className="form-group">
            <label htmlFor="lastName">
              {t("userManagement.form.lastName")}
            </label>
            <input
              type="text"
              id="lastName"
              className="form-control"
              value={currentUser?.lastName || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* اینپوت یوزرنیم  */}
          <div className="form-group">
            <label htmlFor="username">
              {t("userManagement.form.username")}
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={currentUser?.username || ""}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* اینپوت پسورد */}
          <div className="form-group">
            <label htmlFor="password">
              {t("userManagement.form.password")}
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              onChange={handleInputChange}
              required={!isEditing} // رمز عبور در حالت افزودن اجباری است
            />
          </div>

          {/* اینپوت نقش ها */}
          <div className="form-group">
            <label htmlFor="role">{t("userManagement.form.role")}</label>

            <select
              id="role"
              className="form-control"
              value={currentUser?.role?.name || ""} 
              onChange={handleInputChange}
              required
            >
              {roles.map((role) => (
                // مقدار هر option نام نقش است تا با استیت هماهنگ باشد
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>

          </div>

          {/* دکمه ذخیره و لغو */}
          <div className="modal-footer">
            <button
              type="button" // جلوگیری از ارسال فرم با کلیک روی این دکمه
              className="btn btn-cancel"
              onClick={() => setIsModalOpen(false)}
            >
              {t("userManagement.form.cancel")}
            </button>

            <button type="submit" className="btn btn-submit">
              {t("userManagement.form.save")}
            </button>

          </div>

        </form>

      </Modal>

      {/* دیالوگ تایید حذف */}
      <ConfirmationDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title={t("userManagement.confirmDeleteTitle")}
        message={t("userManagement.confirmDeleteMessage", {
          userId: userToDeleteId, // ارسال آیدی به متن پیام برای نمایش
        })}
      />

    </div>
  );
};

export default UsersPage;
