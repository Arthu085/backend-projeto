import React from "react";

/**
 * Input component with label and error handling
 * @param {Object} props
 * @param {string} props.id - Input ID
 * @param {string} props.label - Input label
 * @param {string} props.type - Input type (text, email, password, etc.)
 * @param {string} props.value - Input value
 * @param {function} props.onChange - Change handler function
 * @param {string} props.placeholder - Input placeholder
 * @param {string} props.error - Error message
 * @param {boolean} props.required - Whether input is required
 */
export default function Input({
	id,
	label,
	type = "text",
	value,
	onChange,
	placeholder = "",
	error = "",
	required = false,
	className = "",
	options = [], // novo
}) {
	const isSelect = type === "select";

	return (
		<div className={`mb-4 ${className}`}>
			{label && (
				<label
					htmlFor={id}
					className="block mb-2 text-sm font-medium text-gray-700">
					{label} {required && <span className="text-red-500">*</span>}
				</label>
			)}

			{isSelect ? (
				<select
					id={id}
					value={value}
					onChange={onChange}
					required={required}
					className={`w-full px-3 py-2 border ${
						error ? "border-red-500" : ""
					} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}>
					<option value="">Selecione uma opção</option>
					{options.map((opt) => (
						<option key={opt.value} value={opt.value}>
							{opt.label}
						</option>
					))}
				</select>
			) : (
				<input
					id={id}
					type={type}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					required={required}
					className={`w-full px-3 py-2 border ${
						error ? "border-red-500" : ""
					} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
				/>
			)}

			{error && <p className="mt-1 text-sm text-red-500">{error}</p>}
		</div>
	);
}
