import React from "react";

// Standard Tailwind color classes.
// If you want to use custom colors (e.g., bg-primary), define them in tailwind.config.js.
const variantStyles = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400",
  secondary:
    "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-2 focus:ring-gray-400",
  outline:
    "border-2 border-blue-600 text-blue-600 bg-transparent hover:bg-blue-50 hover:text-blue-800 focus:ring-2 focus:ring-blue-400",
  icon: "p-2 rounded-full hover:bg-gray-200 focus:ring-2 focus:ring-blue-400",
};

const sizeStyles = {
  small: "px-3 py-1 text-sm",
  medium: "px-4 py-2 text-base",
  large: "px-6 py-3 text-lg",
};

export default function Button({
  variant = "primary",
  size = "medium",
  fullWidth = false,
  loading = false,
  disabled = false,
  icon,
  children,
  onClick,
  type = "button",
  className = "",
  ...rest
}) {
  const isDisabled = disabled || loading;

  // Base styles (font, layout, transition, etc.)
  const baseStyles =
    "rounded font-medium transition-all duration-200 flex items-center justify-center focus:outline-none";

  return (
    <button
      type={type}
      className={[
        baseStyles,
        sizeStyles[size] || "",
        variantStyles[variant] || "",
        fullWidth ? "w-full" : "",
        isDisabled ? "opacity-50 cursor-not-allowed" : "",
        className,
      ].join(" ")}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      {...rest}
    >
      {loading ? (
        <span className="flex items-center">
          <svg
            className="animate-spin h-4 w-4 mr-2 text-inherit"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v2a6 6 0 00-6 6H4z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}
