import React from "react";

/**
 * Card component for containing content
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.title - Card title
 * @param {boolean} props.shadow - Whether to show shadow
 * @param {string} props.className - Additional classes
 */
export default function Card({
  children,
  title = "",
  shadow = true,
  className = "",
}) {
  return (
    <div
      className={`bg-white rounded-lg ${
        shadow ? "shadow-md" : ""
      } overflow-hidden ${className}`}
    >
      {title && (
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}