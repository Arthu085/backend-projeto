import React from "react";

/**
 * Alert component for displaying messages
 * @param {Object} props
 * @param {React.ReactNode} props.children - Alert content
 * @param {string} props.type - Alert type (success, error, warning, info)
 * @param {boolean} props.dismissible - Whether alert can be dismissed
 * @param {function} props.onDismiss - Dismiss handler function
 */
export default function Alert({
  children,
  type = "info",
  dismissible = false,
  onDismiss,
}) {
  // Type-based styles
  const typeStyles = {
    success: "bg-green-50 text-green-800 border-green-400",
    error: "bg-red-50 text-red-800 border-red-400",
    warning: "bg-yellow-50 text-yellow-800 border-yellow-400",
    info: "bg-blue-50 text-blue-800 border-blue-400",
  };

  // Icon based on type
  const icons = {
    success: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 01-1-1v-4a1 1 0 112 0v4a1 1 0 01-1 1z" clipRule="evenodd" />
      </svg>
    ),
  };

  return (
    <div className={`border-l-4 p-4 mb-4 ${typeStyles[type] || typeStyles.info}`} role="alert">
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">{icons[type]}</div>
        <div className="flex-1">{children}</div>
        {dismissible && (
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-transparent text-current p-1.5 inline-flex items-center justify-center rounded-md focus:outline-none"
            onClick={onDismiss}
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}