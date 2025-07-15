import React, { useEffect } from "react";
import "./NotFound.css"; // فراموش نکنید فایل CSS را وارد کنید

/**
 * کامپوننت PageNotFound یک صفحه 404 زیبا و بسیار خلاقانه را نمایش می‌دهد.
 * این نسخه شامل پس‌زمینه متحرک کهکشانی، پالت رنگی آبی و یک روح است که چشمانش حرکت موس را دنبال می‌کند.
 * برای استفاده، این کامپوننت را در مسیریاب (Router) خود برای مسیر 404 قرار دهید.
 */
const PageNotFound = () => {
  // این هوک برای مدیریت حرکت موس و تعامل با چشم‌های روح استفاده می‌شود
  useEffect(() => {
    const handleMouseMove = (e) => {
      const body = document.querySelector(".pnf-body");
      if (body) {
        // پاس دادن مختصات موس به متغیرهای CSS برای استفاده در انیمیشن چشم‌ها
        body.style.setProperty("--mouse-x", `${e.clientX}px`);
        body.style.setProperty("--mouse-y", `${e.clientY}px`);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // پاکسازی event listener هنگام unmount شدن کامپوننت
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    // بدنه اصلی که کل صفحه و پس‌زمینه متحرک را در بر می‌گیرد
    <div className="pnf-body">
      {/* عناصر برای ایجاد افکت ستاره‌های متحرک در پس‌زمینه */}
      <div className="pnf-stars"></div>
      <div className="pnf-stars2"></div>
      <div className="pnf-stars3"></div>

      {/* کانتینر اصلی برای وسط‌چین کردن محتوا */}
      <div className="pnf-container">
        {/* بخش اصلی نمایش کد خطا و روح */}
        <div className="pnf-error-code">
          <span className="pnf-four">4</span>
          {/* کامپوننت روح */}
          <div className="pnf-ghost-container">
            <div className="pnf-ghost">
              <div className="pnf-ghost-eyes">
                {/* چشم‌ها اکنون یک div والد دارند تا حرکتشان بر اساس موس محاسبه شود */}
                <div className="pnf-eye-left"></div>
                <div className="pnf-eye-right"></div>
              </div>
              <div className="pnf-ghost-mouth"></div>
            </div>
            <div className="pnf-ghost-shadow"></div>
          </div>
          <span className="pnf-four">4</span>
        </div>

        {/* عنوان و توضیحات صفحه */}
        <h1 className="pnf-title">اوه! به فضای بیکران گم شدی!</h1>
        <p className="pnf-description">
          به نظر می‌رسد صفحه‌ای که دنبالش بودی در این کهکشان وجود ندارد. شاید یک
          سیاه‌چاله آن را بلعیده باشد.
        </p>

        {/* لینک بازگشت به صفحه اصلی */}
        <a href="/" className="pnf-home-link">
          بازگشت به سیاره زمین
        </a>
      </div>
    </div>
  );
};

export default PageNotFound;
