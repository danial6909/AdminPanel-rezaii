import React from "react";
import "./TableSkeleton.css"

// کامپوننت برای نمایش یک سطر اسکلتی (خاکستری)
const SkeletonRow = ({ columns }) => (
  <tr>
    {/* به ازای هر ستون تعریف شده، یک جایگاه اسکلتی مناسب رندر کن */}
    {columns.map((col) => (
      <td key={col.key}>
        {/* برای ستون نام، جایگاه آواتار و متن را نمایش بده */}
        {col.key === "firstName" ? (
          <div className="skeleton-cell-with-avatar">
            <div className="skeleton skeleton-avatar"></div>
            <div
              className="skeleton skeleton-text"
              style={{ width: "70%" }}
            ></div>
          </div>
        ) : col.key === "role" ? (
          // برای ستون نقش، یک نشان (badge) اسکلتی نمایش بده
          <div className="skeleton skeleton-badge"></div>
        ) : (
          // برای بقیه ستون‌ها، یک متن اسکلتی ساده نمایش بده
          <div className="skeleton skeleton-text"></div>
        )}
      </td>
    ))}
    {/* یک ستون ثابت برای جایگاه دکمه‌های عملیات */}
    <td>
      <div className="skeleton-actions">
        <div className="skeleton skeleton-button"></div>
        <div className="skeleton skeleton-button"></div>
      </div>
    </td>
  </tr>
);

// کامپوننت اصلی که کل جدول اسکلتی را نمایش می‌دهد
const TableSkeleton = ({ columns, rowCount = 3 }) => {
  return (
    <>
      {/* چندین سطر اسکلتی را برای پر کردن جدول رندر کن */}
      {Array.from({ length: rowCount }).map((_, index) => (
        <SkeletonRow key={index} columns={columns} />
      ))}
    </>
  );
};

export default TableSkeleton;
