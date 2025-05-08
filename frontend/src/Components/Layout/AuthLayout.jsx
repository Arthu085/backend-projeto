import React from "react";
import { Link } from "react-router-dom";

/**
 * Layout specifically for authentication pages (login/register)
 * @param {Object} props
 * @param {React.ReactNode} props.children - Layout content
 * @param {string} props.title - Page title
 * @param {string} props.subtitle - Optional subtitle
 */
export default function AuthLayout({ children, title, subtitle }) {
	return (
		<div className="min-h-screen flex flex-col justify-center bg-gray-400 py-12 sm:px-6 lg:px-8">
			{/* Logo */}
			<div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
				<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
					{title}
				</h2>
				{subtitle && (
					<p className="mt-2 text-center text-sm text-gray-600">{subtitle}</p>
				)}
			</div>

			{/* Main content */}
			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					{children}
				</div>
			</div>

			{/* Footer */}
			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md text-center">
				<p className="text-sm text-gray-500">
					&copy; {new Date().getFullYear()} AppName. All rights reserved.
				</p>
				<div className="mt-2 flex justify-center space-x-4">
					<Link
						to="/privacy"
						className="text-sm text-gray-500 hover:text-gray-900">
						Privacy Policy
					</Link>
					<Link
						to="/terms"
						className="text-sm text-gray-500 hover:text-gray-900">
						Terms of Service
					</Link>
				</div>
			</div>
		</div>
	);
}
