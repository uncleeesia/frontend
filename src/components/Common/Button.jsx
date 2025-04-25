import React from "react";

const Button = ({
  variant = "primary",
  size = "medium",
  fullWidth,
  loading,
  disabled,
  icon,
  children,
  onClick,
}) => {
  const baseStyles =
    "rounded font-body transition-all duration-200 flex items-center justify-center";
  const sizeStyles = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg",
  };
  const variantStyles = {
    primary: "bg-primary text-primary-foreground hover:opacity-90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    outline:
      "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
    icon: "p-2 rounded-full hover:bg-secondary",
  };

  return (
    <button
      className={`
          ${baseStyles}
          ${sizeStyles[size]}
          ${variantStyles[variant]}
          ${fullWidth ? "w-full" : ""}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? "Loading..." : children}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;
