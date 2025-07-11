// import React, { useState, useCallback } from "react";
// import { motion } from "framer-motion";
// import Swal from "sweetalert2";
// import { useDropzone } from "react-dropzone";

// // کامپوننت‌های Material-UI
// import {
//   Container,
//   Avatar,
//   Typography,
//   Button,
//   TextField,
//   Box,
//   Paper,
//   IconButton,
//   InputAdornment,
//   Divider,
//   Tooltip,
// } from "@mui/material";

// // آیکون‌ها
// import SaveIcon from "@mui/icons-material/Save";
// import PhotoCamera from "@mui/icons-material/PhotoCamera";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import EditIcon from "@mui/icons-material/Edit";
// import CloseIcon from "@mui/icons-material/Close";
// import LockIcon from "@mui/icons-material/Lock";

// import "./ProfilePage.css";
// import { useAuth } from "../../context/AuthContext";



// const ProfilePage = () => {
//   // -------------------------------------------------------------------
//   // State ها
//   // -------------------------------------------------------------------

//   // state برای نگهداری اطلاعات کاربر (نام، نام خانوادگی، نقش)
//   const {user, setUser} = useAuth();
//   console.log(user.role.name)

//   // state برای نگهداری مقادیر فیلدهای تغییر رمز عبور
//   const [passwordFields, setPasswordFields] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });
 

//   // state برای پیش‌نمایش عکس آواتار
//   const [avatarPreview, setAvatarPreview] = useState(
//     "https://i.pravatar.cc/150?img=32"
//   );

//   // state برای پیش‌نمایش عکس کاور
//   const [coverPreview, setCoverPreview] = useState(
//     "https://picsum.photos/1600/900?random=1"
//   );

//   // state برای مدیریت وضعیت ویرایش نام و نام خانوادگی
//   const [isNameEditing, setIsNameEditing] = useState(false);

//   // state برای مدیریت وضعیت ویرایش رمز عبور
//   const [isPasswordEditing, setIsPasswordEditing] = useState(false);

//   // state برای نگهداری خطاهای فرم (در اینجا فقط برای رمز عبور جدید و تکرار رمز عبور)
//   const [errors, setErrors] = useState({});

//   // ✨ State برای نمایش یا عدم نمایش رمز عبور جدید
//   const [showPassword, setShowPassword] = useState(false);

//   // -------------------------------------------------------------------
//   // توابع Callback برای Dropzone
//   // -------------------------------------------------------------------

//   /**
//    * تابعی که هنگام آپلود عکس آواتار فراخوانی می‌شود.
//    * فایل انتخاب شده را به عنوان پیش‌نمایش آواتار تنظیم می‌کند.
//    * @param {Array<File>} files - آرایه‌ای از فایل‌های دراپ شده.
//    */
//   const onAvatarDrop = useCallback((files) => {
//     if (files[0]) setAvatarPreview(URL.createObjectURL(files[0]));
//   }, []);

//   /**
//    * تابعی که هنگام آپلود عکس کاور فراخوانی می‌شود.
//    * فایل انتخاب شده را به عنوان پیش‌نمایش کاور تنظیم می‌کند.
//    * @param {Array<File>} files - آرایه‌ای از فایل‌های دراپ شده.
//    */
//   const onCoverDrop = useCallback((files) => {
//     if (files[0]) setCoverPreview(URL.createObjectURL(files[0]));
//   }, []);

//   // هوک useDropzone برای مدیریت دراپ و آپلود عکس آواتار
//   const {
//     getRootProps: getAvatarRootProps,
//     getInputProps: getAvatarInputProps,
//   } = useDropzone({ onDrop: onAvatarDrop, accept: { "image/*": [] } });

//   // هوک useDropzone برای مدیریت دراپ و آپلود عکس کاور
//   const { getRootProps: getCoverRootProps, getInputProps: getCoverInputProps } =
//     useDropzone({ onDrop: onCoverDrop, accept: { "image/*": [] } });

//   // -------------------------------------------------------------------
//   // توابع هندلینگ رویدادها
//   // -------------------------------------------------------------------

//   /**
//    * هندل کننده تغییر ورودی‌های فرم.
//    * مقدار فیلد ورودی را در state مربوطه به‌روزرسانی می‌کند.
//    * @param {Object} e - رویداد تغییر (event object).
//    * @param {Function} setter - تابع setState مربوط به state مورد نظر.
//    */
//   const handleInputChange = (e, setter) =>
//     setter((prev) => ({ ...prev, [e.target.name]: e.target.value }));

//   /**
//    * هندل کننده ذخیره نام و نام خانوادگی.
//    * یک پیام موفقیت با SweetAlert2 نمایش می‌دهد و وضعیت ویرایش نام را به false تغییر می‌دهد.
//    * @param {Object} e - رویداد ارسال فرم (event object).
//    */
//   const handleSaveName = (e) => {
//     e.preventDefault(); // جلوگیری از رفرش صفحه
//     Swal.fire({
//       icon: "success",
//       title: "موفق",
//       text: "نام با موفقیت ذخیره شد!",
//       showConfirmButton: false,
//       timer: 1500, // پیام پس از 1.5 ثانیه ناپدید می‌شود
//     });
//     setIsNameEditing(false); // خروج از حالت ویرایش نام
//   };

//   /**
//    * تابع اعتبارسنجی رمز عبور.
//    * (در حال حاضر همیشه true برمی‌گرداند و پیاده‌سازی نشده است)
//    * @returns {boolean} - true اگر رمز عبور معتبر باشد، false در غیر این صورت.
//    */
//   const validatePassword = () => {
//     // منطق اعتبارسنجی رمز عبور در اینجا پیاده‌سازی می‌شود
//     // به عنوان مثال: بررسی حداقل طول، پیچیدگی، تطابق رمز عبور جدید و تکرار آن
//     // در صورت وجود خطا، setErrors(newErrors) فراخوانی شود
//     return true;
//   };

//   /**
//    * هندل کننده ذخیره رمز عبور جدید.
//    * اگر اعتبارسنجی رمز عبور موفقیت‌آمیز باشد، یک پیام موفقیت نمایش می‌دهد و وضعیت ویرایش رمز عبور را به false تغییر می‌دهد.
//    * @param {Object} e - رویداد ارسال فرم (event object).
//    */
//   const handleSavePassword = (e) => {
//     e.preventDefault(); // جلوگیری از رفرش صفحه
//     if (validatePassword()) {
//       // اگر اعتبارسنجی موفق بود
//       Swal.fire({
//         icon: "success",
//         title: "موفق",
//         text: "رمز عبور با موفقیت تغییر یافت!",
//         showConfirmButton: false,
//         timer: 1500, // پیام پس از 1.5 ثانیه ناپدید می‌شود
//       });
//       setIsPasswordEditing(false); // خروج از حالت ویرایش رمز عبور
//     }
//   };

//   // -------------------------------------------------------------------
//   // رندر کامپوننت
//   // -------------------------------------------------------------------
//   return (
//     // رپر اصلی صفحه با جهت‌دهی راست به چپ (rtl) برای زبان فارسی
//     <Box className="p-user-page-wrapper" dir="rtl">
//       {/* کانتینر Material-UI برای محدود کردن عرض محتوا */}
//       <Container maxWidth="md">
//         {/* انیمیشن ورود کامپوننت با Framer Motion */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }} // حالت اولیه: شفافیت 0، ۲۰ پیکسل پایین‌تر
//           animate={{ opacity: 1, y: 0 }} // حالت نهایی: شفافیت 1، موقعیت اصلی
//           transition={{ duration: 0.5 }} // مدت زمان انیمیشن: 0.5 ثانیه
//         >
//           {/* کارت اصلی پروفایل */}
//           <Paper className="p-user-card">
//             {/* بخش بنر/کاور با قابلیت دراپ عکس */}
//             <div
//               {...getCoverRootProps()} // پراپ‌های Dropzone برای روت المنت
//               className="p-user-card-banner"
//               style={{ backgroundImage: `url(${coverPreview})` }} // تنظیم عکس پس‌زمینه کاور
//             >
//               {/* دکمه آپلود کاور */}
//               <Box className="p-user-banner-uploader">
//                 <PhotoCamera sx={{ fontSize: "1rem", mr: 1 }} />
//                 تغییر کاور
//                 {/* ورودی مخفی فایل برای آپلود عکس کاور */}
//                 <input
//                   {...getCoverInputProps()} // پراپ‌های Dropzone برای ورودی فایل
//                   className="p-user-hidden-input"
//                 />
//               </Box>
//             </div>

//             {/* بخش هویت کاربر (آواتار و نام) */}
//             <Box className="p-user-identity-area">
//               {/* رپر آواتار با قابلیت دراپ عکس */}
//               <div {...getAvatarRootProps()} className="p-user-avatar-wrapper">
//                 <Avatar src={avatarPreview} className="p-user-avatar-img" />
//                 {/* دکمه آپلود آواتار */}
//                 <Box className="p-user-avatar-uploader">
//                   <PhotoCamera sx={{ fontSize: "1.25rem" }} />
//                 </Box>
//                 {/* ورودی مخفی فایل برای آپلود عکس آواتار */}
//                 <input
//                   {...getAvatarInputProps()} // پراپ‌های Dropzone برای ورودی فایل
//                   className="p-user-hidden-input"
//                 />
//               </div>

//               {/* جزئیات نام و نقش کاربر */}
//               <Box className="p-user-details">
//                 {isNameEditing ? ( // اگر در حالت ویرایش نام باشد
//                   <form
//                     onSubmit={handleSaveName}
//                     className="p-user-inline-form"
//                   >
//                     {/* فیلد ورودی نام */}
//                     <TextField
//                       variant="outlined"
//                       name="firstName"
//                       label="نام"
//                       defaultValue={user.Name}
//                       onChange={(e) => handleInputChange(e, setUser)}
//                       required
//                       className="p-user-input-field"
//                     />
//                     {/* فیلد ورودی نام خانوادگی */}
//                     <TextField
//                       variant="outlined"
//                       name="lastName"
//                       label="نام خانوادگی"
//                       defaultValue={user.name}
//                       onChange={(e) => handleInputChange(e, setUser)}
//                       required
//                       className="p-user-input-field"
//                     />
//                     {/* دکمه ذخیره نام */}
//                     <Tooltip title="ذخیره">
//                       <IconButton
//                         type="submit"
//                         className="p-user-inline-action action-save"
//                       >
//                         <SaveIcon />
//                       </IconButton>
//                     </Tooltip>
//                     {/* دکمه انصراف از ویرایش نام */}
//                     <Tooltip title="انصراف">
//                       <IconButton
//                         className="p-user-inline-action action-cancel"
//                         onClick={() => setIsNameEditing(false)}
//                       >
//                         <CloseIcon />
//                       </IconButton>
//                     </Tooltip>
//                   </form>
//                 ) : (
//                   // اگر در حالت نمایش نام باشد
//                   <>
//                     {/* نمایش نام و نام خانوادگی با دکمه ویرایش */}
//                     <Typography variant="h4" className="p-user-name">
//                       {user.Name} {user.Name}
//                       <IconButton
//                         size="small"
//                         className="p-user-edit-icon"
//                         onClick={() => setIsNameEditing(true)} // تغییر به حالت ویرایش
//                       >
//                         <EditIcon fontSize="small" />
//                       </IconButton>
//                     </Typography>
//                     {/* نمایش نقش کاربر */}
//                     <Typography className="p-user-role-badge">
//                       {user.name}
//                     </Typography>
//                   </>
//                 )}
//               </Box>
//             </Box>

//             {/* جداکننده محتوا */}
//             <Divider className="p-user-content-divider" />

//             {/* بخش اصلی تنظیمات (تغییر رمز عبور) */}
//             <Box className="p-user-main-settings">
//               {isPasswordEditing ? ( // اگر در حالت ویرایش رمز عبور باشد
//                 <form
//                   onSubmit={handleSavePassword}
//                   className="p-user-password-form"
//                 >
//                   {/* عنوان بخش تغییر رمز عبور */}
//                   <Box className="p-user-settings-title-group">
//                     <LockIcon />
//                     <Typography variant="h5" className="p-user-settings-title">
//                       تغییر رمز عبور
//                     </Typography>
//                   </Box>
//                   {/* فیلد رمز عبور فعلی */}
//                   <TextField
//                     variant="outlined"
//                     className="p-user-input-field"
//                     label="رمز عبور فعلی"
//                     type="password"
//                     name="currentPassword"
//                     onChange={(e) => handleInputChange(e, setPasswordFields)}
//                     fullWidth
//                   />

//                   {/* ✨ فیلد رمز عبور جدید با قابلیت نمایش/مخفی کردن */}
//                   <TextField
//                     variant="outlined"
//                     className="p-user-input-field"
//                     label="رمز عبور جدید"
//                     type={showPassword ? "text" : "password"} // تغییر نوع فیلد بر اساس showPassword
//                     name="newPassword"
//                     onChange={(e) => handleInputChange(e, setPasswordFields)}
//                     fullWidth
//                     error={!!errors.newPassword} // نمایش خطا اگر وجود داشته باشد
//                     helperText={errors.newPassword} // متن خطا
//                     InputProps={{
//                       // افزودن آیکون چشم به انتهای فیلد
//                       endAdornment: (
//                         <InputAdornment position="end">
//                           <IconButton
//                             aria-label="toggle password visibility"
//                             onClick={() => setShowPassword(!showPassword)} // تغییر وضعیت showPassword
//                             edge="end"
//                           >
//                             {showPassword ? <VisibilityOff /> : <Visibility />}
//                           </IconButton>
//                         </InputAdornment>
//                       ),
//                     }}
//                   />

//                   {/* فیلد تکرار رمز عبور جدید */}
//                   <TextField
//                     variant="outlined"
//                     className="p-user-input-field"
//                     label="تکرار رمز عبور جدید"
//                     type="password"
//                     name="confirmPassword"
//                     onChange={(e) => handleInputChange(e, setPasswordFields)}
//                     fullWidth
//                     error={!!errors.confirmPassword} // نمایش خطا اگر وجود داشته باشد
//                     helperText={errors.confirmPassword} // متن خطا
//                   />

//                   {/* دکمه‌های ذخیره و انصراف */}
//                   <Box className="p-user-form-buttons">
//                     <Button
//                       className="p-user-main-btn p-user-btn-primary"
//                       type="submit"
//                     >
//                       ذخیره رمز
//                     </Button>
//                     <Button
//                       variant="text"
//                       onClick={() => setIsPasswordEditing(false)} // خروج از حالت ویرایش رمز عبور
//                     >
//                       انصراف
//                     </Button>
//                   </Box>
//                 </form>
//               ) : (
//                 // اگر در حالت نمایش رمز عبور باشد
//                 <Box className="p-user-password-view">
//                   <Box>
//                     <Typography variant="body2" color="text.secondary">
//                       رمز عبور
//                     </Typography>
//                     <Typography variant="h6">••••••••</Typography>{" "}
//                     {/* نمایش رمز به صورت ستاره */}
//                   </Box>
//                   <Button
//                     className="p-user-main-btn p-user-btn-secondary"
//                     onClick={() => setIsPasswordEditing(true)} // تغییر به حالت ویرایش رمز عبور
//                   >
//                     تغییر رمز
//                   </Button>
//                 </Box>
//               )}
//             </Box>
//           </Paper>
//         </motion.div>
//       </Container>
//     </Box>
//   );
// };

// export default ProfilePage;












//////////////////////////////////////






















import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useDropzone } from "react-dropzone";
import axios from "axios"; // ایمپورت کردن کتابخانه Axios

// کامپوننت‌های Material-UI
import {
  Container,
  Avatar,
  Typography,
  Button,
  TextField,
  Box,
  Paper,
  IconButton,
  InputAdornment,
  Divider,
  Tooltip,
} from "@mui/material";

// آیکون‌ها
import SaveIcon from "@mui/icons-material/Save";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import LockIcon from "@mui/icons-material/Lock";

import "./ProfilePage.css";
// فرض بر این است که AuthContext به درستی تنظیم شده و user و setUser را فراهم می‌کند
import { useAuth } from "../../context/AuthContext";

/**
 * کامپوننت ProfilePage
 * این کامپوننت یک صفحه پروفایل کاربری را نمایش می‌دهد که در آن کاربر می‌تواند اطلاعات خود (نام، نام خانوادگی)،
 * رمز عبور، عکس پروفایل (آواتار) و عکس کاور خود را ویرایش کند.
 * ارتباط با بک‌اند برای ذخیره تغییرات و اعتبارسنجی رمز عبور با استفاده از Axios انجام می‌شود.
 */
const ProfilePage = () => {
  // -------------------------------------------------------------------
  // مدیریت State ها
  // -------------------------------------------------------------------

  // دریافت اطلاعات کاربر و تابع به‌روزرسانی آن از AuthContext
  const { user, setUser } = useAuth();
  // کنسول لاگ برای نمایش نام نقش کاربر (جهت دیباگ یا بررسی)
  console.log("User Role Name:", user?.role?.name);

  // State برای نگهداری مقادیر فیلدهای تغییر رمز عبور
  const [passwordFields, setPasswordFields] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // State برای پیش‌نمایش عکس آواتار. اگر user.avatarUrl وجود داشت، از آن استفاده می‌کند.
  const [avatarPreview, setAvatarPreview] = useState(
    
  );

  // State برای پیش‌نمایش عکس کاور. ابتدا از localStorage می‌خواند، در غیر این صورت از لینک پیش‌فرض استفاده می‌کند.
  const [coverPreview, setCoverPreview] = useState(() => {
    const storedCover = localStorage.getItem("userCoverImage");
    return storedCover || "https://picsum.photos/1600/900?random=1"; // لینک جدید و تصادفی برای کاور
  });

  // State برای مدیریت وضعیت ویرایش نام و نام خانوادگی
  const [isNameEditing, setIsNameEditing] = useState(false);

  // State موقت برای نگهداری تغییرات نام و نام خانوادگی قبل از ذخیره نهایی
  const [tempUserName, setTempUserName] = useState({
    firstName: user?.Name || "", // فرض می‌شود نام در user.Name ذخیره شده است
    lastName: user?.Family || "", // فرض می‌شود نام خانوادگی در user.Family ذخیره شده است
  });

  // State برای مدیریت وضعیت ویرایش رمز عبور
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);

  // State برای نگهداری خطاهای اعتبارسنجی فرم
  const [errors, setErrors] = useState({});

  // State برای نمایش یا عدم نمایش رمز عبور جدید (آیکون چشم)
  const [showPassword, setShowPassword] = useState(false);

  // -------------------------------------------------------------------
  // Effects (قلاب‌های اثر جانبی)
  // -------------------------------------------------------------------

  /**
   * useEffect برای به‌روزرسانی tempUserName و avatarPreview زمانی که شی user از AuthContext تغییر می‌کند.
   * این تضمین می‌کند که فیلدهای فرم و پیش‌نمایش آواتار با آخرین اطلاعات کاربر همگام باشند.
   */
  useEffect(() => {
    setTempUserName({
      firstName: user?.Name || "",
      lastName: user?.Family || "",
    });
    setAvatarPreview(user?.avatarUrl || "https://i.pravatar.cc/150?img=32");
  }, [user]); // به تغییرات در شی user وابسته است

  // -------------------------------------------------------------------
  // توابع Callback برای Dropzone (مدیریت دراپ و آپلود فایل)
  // -------------------------------------------------------------------

  /**
   * تابعی که هنگام دراپ شدن (کشیدن و رها کردن) فایل آواتار فراخوانی می‌شود.
   * فایل را به بک‌اند ارسال کرده و پس از دریافت URL جدید، preview و global user state را به‌روز می‌کند.
   * @param {Array<File>} files - آرایه‌ای از فایل‌های دراپ شده.
   */
  const onAvatarDrop = useCallback(
    async (files) => {
      if (files[0]) {
        const file = files[0];
        setAvatarPreview(URL.createObjectURL(file)); // نمایش پیش‌نمایش فوری از فایل انتخاب شده

        const formData = new FormData(); // ساخت شی FormData برای ارسال فایل به بک‌اند
        formData.append("avatar", file); // 'avatar' نام فیلدی است که بک‌اند شما برای دریافت فایل انتظار دارد
        console.log(formData)
        try {
          // ارسال درخواست POST با Axios برای آپلود آواتار
          // مسیر '/api/upload-avatar' را با مسیر واقعی بک‌اند خود جایگزین کنید
          const response = await axios.post(
            "http://192.168.1.108:3000/auth/signin",
            formData,
            {
              headers: {
                // 'Content-Type' به صورت خودکار توسط Axios برای FormData تنظیم می‌شود
                Authorization: `Bearer ${localStorage.getItem("token")}`, // ارسال توکن احراز هویت (در صورت نیاز)
              },
            }
          );

          // فرض بر این است که بک‌اند، URL جدید آواتار را در response.data.avatarUrl برمی‌گرداند
          const newAvatarUrl = response.data.avatarUrl;

          setAvatarPreview(newAvatarUrl); // به‌روزرسانی پیش‌نمایش با URL واقعی از بک‌اند
          // به‌روزرسانی وضعیت سراسری کاربر در AuthContext، تا کامپوننت‌های دیگر (مانند هدر) هم به‌روز شوند
          setUser((prevUser) => ({ ...prevUser, avatarUrl: newAvatarUrl }));

          // نمایش پیام موفقیت با SweetAlert2
          Swal.fire({
            icon: "success",
            title: "موفق",
            text: "عکس پروفایل با موفقیت به‌روزرسانی شد!",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          console.error("خطا در آپلود آواتار:", error);
          // نمایش پیام خطا با SweetAlert2
          Swal.fire({
            icon: "error",
            title: "خطا",
            text:
              error.response?.data?.message ||
              "مشکلی در آپلود عکس پروفایل پیش آمد.",
          });
          // در صورت شکست آپلود، پیش‌نمایش را به آواتار قبلی کاربر برمی‌گرداند
          setAvatarPreview(
            user?.avatarUrl || "https://i.pravatar.cc/150?img=32"
          );
        }
      }
    },
    [setUser, user?.avatarUrl]
  ); // وابستگی‌ها: setUser و user.avatarUrl

  /**
   * تابعی که هنگام دراپ شدن فایل کاور فراخوانی می‌شود.
   * URL موقت فایل را در localStorage ذخیره کرده و preview را به‌روز می‌کند.
   * @param {Array<File>} files - آرایه‌ای از فایل‌های دراپ شده.
   */
  const onCoverDrop = useCallback((files) => {
    if (files[0]) {
      const fileUrl = URL.createObjectURL(files[0]); // ایجاد URL موقت برای پیش‌نمایش
      setCoverPreview(fileUrl); // به‌روزرسانی پیش‌نمایش کاور
      localStorage.setItem("userCoverImage", fileUrl); // ذخیره URL در localStorage
      // نمایش پیام موفقیت
      Swal.fire({
        icon: "success",
        title: "موفق",
        text: "عکس کاور با موفقیت به‌روزرسانی شد!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, []);

  // هوک useDropzone برای مدیریت رویدادهای دراپ و انتخاب فایل برای آواتار
  const {
    getRootProps: getAvatarRootProps,
    getInputProps: getAvatarInputProps,
  } = useDropzone({ onDrop: onAvatarDrop, accept: { "image/*": [] } });

  // هوک useDropzone برای مدیریت رویدادهای دراپ و انتخاب فایل برای کاور
  const { getRootProps: getCoverRootProps, getInputProps: getCoverInputProps } =
    useDropzone({ onDrop: onCoverDrop, accept: { "image/*": [] } });

  // -------------------------------------------------------------------
  // توابع هندلینگ رویدادها
  // -------------------------------------------------------------------

  /**
   * هندل کننده تغییر ورودی‌های فرم.
   * مقدار فیلد ورودی را در State مربوطه به‌روزرسانی می‌کند.
   * @param {Object} e - شی رویداد تغییر (event object).
   * @param {Function} setter - تابع setState مربوط به State مورد نظر.
   */
  const handleInputChange = (e, setter) =>
    setter((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  /**
   * هندل کننده ذخیره نام و نام خانوادگی در بک‌اند.
   * @param {Object} e - شی رویداد ارسال فرم (event object).
   */
  const handleSaveName = async (e) => {
    e.preventDefault(); // جلوگیری از رفرش شدن صفحه
    setErrors({}); // پاک کردن خطاهای قبلی

    try {
      // ارسال درخواست PUT با Axios برای به‌روزرسانی اطلاعات پروفایل کاربر
      // مسیر '/api/user/update-profile' را با مسیر واقعی بک‌اند خود جایگزین کنید
      const response = await axios.put(
        "/api/user/update-profile",
        {
          firstName: tempUserName.firstName,
          lastName: tempUserName.lastName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // ارسال توکن احراز هویت
          },
        }
      );

      // به‌روزرسانی وضعیت سراسری کاربر در AuthContext با نام و نام خانوادگی جدید
      setUser((prevUser) => ({
        ...prevUser,
        Name: tempUserName.firstName,
        Family: tempUserName.lastName,
      }));

      // نمایش پیام موفقیت با SweetAlert2
      Swal.fire({
        icon: "success",
        title: "موفق",
        text: "نام با موفقیت ذخیره شد!",
        showConfirmButton: false,
        timer: 1500,
      });
      setIsNameEditing(false); // خروج از حالت ویرایش نام
    } catch (error) {
      console.error("خطا در ذخیره نام:", error);
      // نمایش پیام خطا با SweetAlert2
      Swal.fire({
        icon: "error",
        title: "خطا",
        text: error.response?.data?.message || "مشکلی در ذخیره نام پیش آمد.",
      });
    }
  };

  /**
   * تابع اعتبارسنجی فیلدهای رمز عبور.
   * @returns {boolean} - true اگر رمز عبور معتبر باشد، false در غیر این صورت.
   */
  const validatePassword = () => {
    let newErrors = {};
    let isValid = true;

    // اعتبارسنجی خالی نبودن رمز عبور جدید
    if (!passwordFields.newPassword) {
      newErrors.newPassword = "رمز عبور جدید نمی‌تواند خالی باشد.";
      isValid = false;
    }
    // اعتبارسنجی حداقل طول رمز عبور جدید
    else if (passwordFields.newPassword.length < 6) {
      newErrors.newPassword = "رمز عبور جدید باید حداقل ۶ کاراکتر باشد.";
      isValid = false;
    }

    // اعتبارسنجی تطابق رمز عبور جدید و تکرار آن
    if (passwordFields.newPassword !== passwordFields.confirmPassword) {
      newErrors.confirmPassword = "رمز عبور جدید و تکرار آن یکسان نیستند.";
      isValid = false;
    }

    setErrors(newErrors); // تنظیم خطاهای یافت شده
    return isValid; // برگرداندن نتیجه اعتبارسنجی
  };

  /**
   * هندل کننده ذخیره رمز عبور جدید در بک‌اند.
   * @param {Object} e - شی رویداد ارسال فرم (event object).
   */
  const handleSavePassword = async (e) => {
    e.preventDefault(); // جلوگیری از رفرش شدن صفحه
    if (!validatePassword()) {
      return; // اگر اعتبارسنجی ناموفق بود، ادامه نمی‌دهد
    }

    try {
      // ارسال درخواست PUT با Axios برای تغییر رمز عبور
      // مسیر '/api/user/change-password' را با مسیر واقعی بک‌اند خود جایگزین کنید
      const response = await axios.put(
        "/api/user/change-password",
        {
          currentPassword: passwordFields.currentPassword,
          newPassword: passwordFields.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // ارسال توکن احراز هویت
          },
        }
      );

      // نمایش پیام موفقیت با SweetAlert2
      Swal.fire({
        icon: "success",
        title: "موفق",
        text: "رمز عبور با موفقیت تغییر یافت!",
        showConfirmButton: false,
        timer: 1500,
      });
      setIsPasswordEditing(false); // خروج از حالت ویرایش رمز عبور
      // پاک کردن فیلدهای رمز عبور پس از ذخیره موفقیت‌آمیز
      setPasswordFields({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("خطا در تغییر رمز عبور:", error);
      // مدیریت خطاهای خاص از بک‌اند (مثلاً رمز عبور فعلی اشتباه است)
      if (error.response?.status === 401 || error.response?.status === 403) {
        Swal.fire({
          icon: "error",
          title: "خطا",
          text: "رمز عبور فعلی اشتباه است.",
        });
      } else {
        // نمایش پیام خطای عمومی از بک‌اند
        Swal.fire({
          icon: "error",
          title: "خطا",
          text:
            error.response?.data?.message || "مشکلی در تغییر رمز عبور پیش آمد.",
        });
      }
    }
  };

  // -------------------------------------------------------------------
  // بخش رندر کامپوننت
  // -------------------------------------------------------------------
  return (
    // رپر اصلی صفحه با جهت‌دهی راست به چپ (rtl) برای زبان فارسی
    <Box className="p-user-page-wrapper" dir="rtl">
      {/* کانتینر Material-UI برای محدود کردن عرض محتوا */}
      <Container maxWidth="md">
        {/* انیمیشن ورود کامپوننت با Framer Motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} // حالت اولیه: شفافیت 0، ۲۰ پیکسل پایین‌تر
          animate={{ opacity: 1, y: 0 }} // حالت نهایی: شفافیت 1، موقعیت اصلی
          transition={{ duration: 0.5 }} // مدت زمان انیمیشن: 0.5 ثانیه
        >
          {/* کارت اصلی پروفایل (Paper) */}
          <Paper className="p-user-card">
            {/* بخش بنر/کاور با قابلیت دراپ عکس */}
            <div
              {...getCoverRootProps()} // پراپ‌های Dropzone برای روت المنت
              className="p-user-card-banner"
              style={{ backgroundImage: `url(${coverPreview})` }} // تنظیم عکس پس‌زمینه کاور
            >
              {/* دکمه آپلود کاور */}
              <Box className="p-user-banner-uploader">
                <PhotoCamera sx={{ fontSize: "1rem", mr: 1 }} />
                تغییر کاور
                {/* ورودی مخفی فایل برای آپلود عکس کاور */}
                <input
                  {...getCoverInputProps()}
                  className="p-user-hidden-input"
                />
              </Box>
            </div>

            {/* بخش هویت کاربر (آواتار و نام) */}
            <Box className="p-user-identity-area">
              {/* رپر آواتار با قابلیت دراپ عکس */}
              <div {...getAvatarRootProps()} className="p-user-avatar-wrapper">
                <Avatar src={avatarPreview} className="p-user-avatar-img" />
                {/* دکمه آپلود آواتار */}
                <Box className="p-user-avatar-uploader">
                  <PhotoCamera sx={{ fontSize: "1.25rem" }} />
                </Box>
                {/* ورودی مخفی فایل برای آپلود عکس آواتار */}
                <input
                  {...getAvatarInputProps()}
                  className="p-user-hidden-input"
                />
              </div>

              {/* جزئیات نام و نقش کاربر */}
              <Box className="p-user-details">
                {isNameEditing ? ( // اگر در حالت ویرایش نام باشد
                  <form
                    onSubmit={handleSaveName}
                    className="p-user-inline-form"
                  >
                    {/* فیلد ورودی نام */}
                    <TextField
                      variant="outlined"
                      name="firstName"
                      label="نام"
                      value={tempUserName.firstName} // استفاده از value برای کنترل کامپوننت (Controlled Component)
                      onChange={(e) => handleInputChange(e, setTempUserName)}
                      required
                      className="p-user-input-field"
                    />
                    {/* فیلد ورودی نام خانوادگی */}
                    <TextField
                      variant="outlined"
                      name="lastName"
                      label="نام خانوادگی"
                      value={tempUserName.lastName} // استفاده از value برای کنترل کامپوننت
                      onChange={(e) => handleInputChange(e, setTempUserName)}
                      required
                      className="p-user-input-field"
                    />
                    {/* دکمه ذخیره نام */}
                    <Tooltip title="ذخیره">
                      <IconButton
                        type="submit"
                        className="p-user-inline-action action-save"
                      >
                        <SaveIcon />
                      </IconButton>
                    </Tooltip>
                    {/* دکمه انصراف از ویرایش نام */}
                    <Tooltip title="انصراف">
                      <IconButton
                        className="p-user-inline-action action-cancel"
                        onClick={() => {
                          setIsNameEditing(false);
                          // برگرداندن تغییرات به حالت اصلی اگر کاربر ویرایش را لغو کرد
                          setTempUserName({
                            firstName: user?.Name || "",
                            lastName: user?.Family || "",
                          });
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Tooltip>
                  </form>
                ) : (
                  // اگر در حالت نمایش نام باشد
                  <>
                    {/* نمایش نام و نام خانوادگی با دکمه ویرایش */}
                    <Typography variant="h4" className="p-user-name">
                      {user?.Name} {user?.Family}
                      <IconButton
                        size="small"
                        className="p-user-edit-icon"
                        onClick={() => setIsNameEditing(true)} // تغییر به حالت ویرایش
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Typography>
                    {/* نمایش نقش کاربر */}
                    <Typography className="p-user-role-badge">
                      {user?.role?.name}
                    </Typography>
                  </>
                )}
              </Box>
            </Box>

            {/* جداکننده محتوا */}
            <Divider className="p-user-content-divider" />

            {/* بخش اصلی تنظیمات (تغییر رمز عبور) */}
            <Box className="p-user-main-settings">
              {isPasswordEditing ? ( // اگر در حالت ویرایش رمز عبور باشد
                <form
                  onSubmit={handleSavePassword}
                  className="p-user-password-form"
                >
                  <Box className="p-user-settings-title-group">
                    <LockIcon />
                    <Typography variant="h5" className="p-user-settings-title">
                      تغییر رمز عبور
                    </Typography>
                  </Box>
                  {/* فیلد رمز عبور فعلی */}
                  <TextField
                    variant="outlined"
                    className="p-user-input-field"
                    label="رمز عبور فعلی"
                    type="password"
                    name="currentPassword"
                    value={passwordFields.currentPassword} // کنترل شده
                    onChange={(e) => handleInputChange(e, setPasswordFields)}
                    fullWidth
                  />

                  {/* فیلد رمز عبور جدید با قابلیت نمایش/مخفی کردن */}
                  <TextField
                    variant="outlined"
                    className="p-user-input-field"
                    label="رمز عبور جدید"
                    type={showPassword ? "text" : "password"} // تغییر نوع فیلد بر اساس showPassword
                    name="newPassword"
                    value={passwordFields.newPassword} // کنترل شده
                    onChange={(e) => handleInputChange(e, setPasswordFields)}
                    fullWidth
                    error={!!errors.newPassword} // نمایش خطا اگر وجود داشته باشد
                    helperText={errors.newPassword} // متن خطا
                    InputProps={{
                      // افزودن آیکون چشم به انتهای فیلد
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)} // تغییر وضعیت showPassword
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  {/* فیلد تکرار رمز عبور جدید */}
                  <TextField
                    variant="outlined"
                    className="p-user-input-field"
                    label="تکرار رمز عبور جدید"
                    type="password"
                    name="confirmPassword"
                    value={passwordFields.confirmPassword} // کنترل شده
                    onChange={(e) => handleInputChange(e, setPasswordFields)}
                    fullWidth
                    error={!!errors.confirmPassword} // نمایش خطا اگر وجود داشته باشد
                    helperText={errors.confirmPassword} // متن خطا
                  />

                  {/* دکمه‌های ذخیره و انصراف */}
                  <Box className="p-user-form-buttons">
                    <Button
                      className="p-user-main-btn p-user-btn-primary"
                      type="submit"
                    >
                      ذخیره رمز
                    </Button>
                    <Button
                      variant="text"
                      onClick={() => {
                        setIsPasswordEditing(false);
                        setPasswordFields({
                          currentPassword: "",
                          newPassword: "",
                          confirmPassword: "",
                        }); // پاک کردن فیلدها در صورت انصراف
                        setErrors({}); // پاک کردن خطاها در صورت انصراف
                      }}
                    >
                      انصراف
                    </Button>
                  </Box>
                </form>
              ) : (
                // اگر در حالت نمایش رمز عبور باشد
                <Box className="p-user-password-view">
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      رمز عبور
                    </Typography>
                    <Typography variant="h6">••••••••</Typography>{" "}
                    {/* نمایش رمز به صورت ستاره */}
                  </Box>
                  <Button
                    className="p-user-main-btn p-user-btn-secondary"
                    onClick={() => setIsPasswordEditing(true)} // تغییر به حالت ویرایش رمز عبور
                  >
                    تغییر رمز
                  </Button>
                </Box>
              )}
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ProfilePage;