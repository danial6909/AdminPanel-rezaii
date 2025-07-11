import axios from "axios";

// 1. ساخت یک instance جدید از axios با تنظیمات پیش‌فرض
const axiosInstance = axios.create({
  baseURL: "http://192.168.1.108:3000", // آدرس پایه سرور شما
  timeout: 10000, // زمان انتظار برای پاسخ (مثلاً ۱۰ ثانیه)
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
      const user = JSON.parse(userString);
      const token = user?.token;

      // اگر توکن وجود داشت، آن را به هدر Authorization اضافه می‌کنیم
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    // در صورت بروز خطا در تنظیم درخواست، آن را برمی‌گردانیم
    return Promise.reject(error);
  }
);

export default axiosInstance;
