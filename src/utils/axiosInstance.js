import axios from "axios";

// 1. ساخت یک instance جدید از axios با تنظیمات پیش‌فرض
const axiosInstance = axios.create({
  // آدرس پایه سرور شما
  // نکته: بهتر است این آدرس را در فایل .env قرار دهید
  baseURL: "http://192.168.1.108:3000",
  // زمان انتظار برای پاسخ (مثلاً ۱۰ ثانیه)
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. استفاده از Interceptor برای اضافه کردن توکن به همه‌ی درخواست‌ها
axiosInstance.interceptors.request.use(
  (config) => {
    // خواندن اطلاعات کاربر از localStorage
    const userString = localStorage.getItem("user");

    if (userString) {
      try {
        const user = JSON.parse(userString);
        const token = user?.token;

        // اگر توکن وجود داشت، آن را به هدر Authorization اضافه می‌کنیم
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
      }
    }
    return config;
  },
  (error) => {
    // در صورت بروز خطا در تنظیم درخواست، آن را برمی‌گردانیم
    return Promise.reject(error);
  }
);

// ✅ 3. استفاده از Interceptor برای مدیریت پاسخ‌های سرور (مخصوصاً خطاها)
axiosInstance.interceptors.response.use(
  // تابع اول برای پاسخ‌های موفق (status 2xx) اجرا می‌شود
  (response) => {
    // برای پاسخ‌های موفق، کاری انجام نمی‌دهیم و فقط پاسخ را برمی‌گردانیم
    return response;
  },
  // تابع دوم برای پاسخ‌های ناموفق (خطا) اجرا می‌شود
  (error) => {
    // بررسی می‌کنیم که آیا خطا مربوط به پاسخ سرور است و کد وضعیت 401 دارد یا خیر
    if (error.response && error.response.status === 401) {
      // اگر کد خطا 401 (Unauthorized) بود:
      console.error("Unauthorized Access - Redirecting to login...");

      // 1. اطلاعات کاربر را از حافظه پاک می‌کنیم
      localStorage.removeItem("user");

      // 2. کاربر را به صفحه لاگین هدایت می‌کنیم
      // چون اینجا به هوک useNavigate دسترسی نداریم، از window.location استفاده می‌کنیم
      // این کار باعث رفرش کامل صفحه و انتقال به صفحه لاگین می‌شود
      window.location.href = "/login";
    }

    // برای سایر خطاها، خطا را برمی‌گردانیم تا در جایی که تابع صدا زده شده، مدیریت شود
    return Promise.reject(error);
  }
);

export default axiosInstance;
