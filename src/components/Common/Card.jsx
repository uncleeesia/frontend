import React from "react";

const Card = ({
  variant = "basic",
  image,
  title,
  content,
  onClick,
  className,
}) => {
  const baseStyles = "rounded-lg transition-all duration-300 bg-card";
  const variantStyles = {
    basic: "p-4 shadow-sm hover:shadow-md",
    image: "overflow-hidden",
    hover: "p-4 transform hover:-translate-y-1 hover:shadow-lg",
    clickable: "p-4 cursor-pointer active:scale-95 hover:shadow-lg",
  };

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${className || ""}`}
      onClick={onClick}
    >
      {variant === "image" && image && (
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      )}
      <div className={variant === "image" ? "p-4" : ""}>
        {title && <h3 className="text-lg font-heading mb-2">{title}</h3>}
        {content && <p className="text-accent">{content}</p>}
      </div>
    </div>
  );
};

export default Card;
