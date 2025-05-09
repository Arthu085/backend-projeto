import React from "react";

/**
 * Card component for containing content
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.title - Card title
 * @param {React.ReactNode} props.headerAction - Optional element (e.g., button) on the right side of the header
 * @param {React.ReactNode} props.footer - Optional footer content
 * @param {boolean} props.shadow - Whether to show shadow
 * @param {string} props.className - Additional classes
 */
export default function Card({
	children,
	title = "",
	footer = null,
	shadow = true,
	className = "",
}) {
	return (
		<div
			className={`bg-white rounded-lg ${
				shadow ? "shadow-md" : ""
			} overflow-hidden ${className}`}>
			{(title || footer) && (
				<div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
					{title && (
						<h3 className="text-lg font-medium text-gray-900">{title}</h3>
					)}
					{footer && <div>{footer}</div>}
				</div>
			)}
			<div className="p-6">{children}</div>
		</div>
	);
}
