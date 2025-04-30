import React from "react";
import Typography from "./Typography";

const baseStyles = "rounded-lg transition-all duration-300 bg-white";
const variantStyles = {
  basic: "p-4 shadow-sm hover:shadow-md",
  image: "overflow-hidden shadow-sm hover:shadow-md",
  hover: "p-4 transform hover:-translate-y-1 hover:shadow-lg",
  clickable: "p-4 cursor-pointer active:scale-95 hover:shadow-lg",
};

const Card = ({
  variant = "basic",
  image,
  title,
  content,
  onClick,
  className = "",
}) => {
  const rootClasses = [
    baseStyles,
    variantStyles[variant] || variantStyles.basic,
    className,
  ].join(" ");

  const clickableProps =
    variant === "clickable" && onClick
      ? { role: "button", tabIndex: 0, onClick }
      : { onClick };

  return (
    <div className={rootClasses} {...clickableProps}>
      {variant === "image" && image && (
        <img
          src={image}
          alt={title || "Card image"}
          className="w-full h-48 object-cover"
        />
      )}
      <div className={variant === "image" ? "p-4" : ""}>
        {title && <Typography variant="h3">{title}</Typography>}
        {content && <Typography variant="p">{content}</Typography>}
      </div>
    </div>
  );
};

export default Card;
