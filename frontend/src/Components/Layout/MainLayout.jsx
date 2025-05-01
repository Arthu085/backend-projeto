import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * Main layout component with navigation
 * @param {Object} props
 * @param {React.ReactNode} props.children - Layout content
 */
export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: "📊" },
    { name: "History", href: "/history", icon: "📜" },
    { name: "New Recommendation", href: "/new-recommendation", icon: "✨" },
  ];

  // Check if the current path is the active item
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for mobile */}
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } fixed inset-0 z-40 md:hidden`}
        aria-hidden="true"
      >
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        ></div>

        {/* Sidebar component */}
        <div className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-white">
          <div className="absolute top-0 right-0 pt-2 -mr-12">
            <button
              type="button"
              className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <svg
                className="w-6 h-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-4">
            <img className="w-auto h-8" src="/src/assets/react.svg" alt="Logo" />
            <span className="ml-2 text-xl font-bold">AppName</span>
          </div>

          {/* Navigation */}
          <div className="flex flex-col flex-1 h-0 mt-5 overflow-y-auto">
            <nav className="flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    isActive(item.href)
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* User */}
          <div className="flex items-center p-4 border-t border-gray-200">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                U
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">User Name</p>
              <button
                className="text-xs font-medium text-gray-500 hover:text-gray-700"
                onClick={() => {
                  // Logout logic would go here
                  console.log("Logout clicked");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col flex-1 h-0 bg-white border-r border-gray-200">
            <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
              {/* Logo */}
              <div className="flex items-center flex-shrink-0 px-4">
                <img className="w-auto h-8" src="/src/assets/react.svg" alt="Logo" />
                <span className="ml-2 text-xl font-bold">AppName</span>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-2 mt-5 space-y-1 bg-white">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      isActive(item.href)
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* User */}
            <div className="flex items-center p-4 border-t border-gray-200">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  U
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">User Name</p>
                <button
                  className="text-xs font-medium text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    // Logout logic would go here
                    console.log("Logout clicked");
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top header */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>
          <div className="flex-1 px-4 flex justify-between items-center">
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-gray-900">
                {navigation.find((item) => isActive(item.href))?.name || "Dashboard"}
              </h1>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              {/* Profile dropdown would go here */}
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none p-6">
          {children}
        </main>
      </div>
    </div>
  );
}