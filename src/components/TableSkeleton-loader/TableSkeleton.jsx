import React from "react";
import "./TableSkeleton.css";

// پراپ isReadOnly رو اینجا دریافت می‌کنیم
const SkeletonRow = ({ columns, isReadOnly }) => (
  <tr>
    {columns.map((col) => (
      <td key={col.key}>
        {col.key === "firstName" ? (
          <div className="skeleton-cell-with-avatar">
            <div className="skeleton skeleton-avatar"></div>
            <div
              className="skeleton skeleton-text"
              style={{ width: "70%" }}
            ></div>
          </div>
        ) : col.key === "role" ? (
          <div className="skeleton skeleton-badge"></div>
        ) : (
          <div className="skeleton skeleton-text"></div>
        )}
      </td>
    ))}

    {/* ستون عملیات فقط زمانی نمایش داده می‌شود که جدول فقط-خواندنی نباشد */}
    {!isReadOnly && (
      <td>
        <div className="skeleton-actions">
          <div className="skeleton skeleton-button"></div>
          <div className="skeleton skeleton-button"></div>
        </div>
      </td>
    )}
  </tr>
);

// پراپ isReadOnly رو اینجا هم دریافت می‌کنیم تا به فرزند پاس بدیم
const TableSkeleton = ({ columns, rowCount = 3, isReadOnly }) => {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, index) => (
        <SkeletonRow key={index} columns={columns} isReadOnly={isReadOnly} />
      ))}
    </>
  );
};

export default TableSkeleton;
