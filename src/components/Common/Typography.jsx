import React from "react";

// Maps variants to Tailwind utility classes
  const variants = {
    h1: "text-4xl font-heading mb-4",
    h2: "text-3xl font-heading mb-3",
    h3: "text-2xl font-heading mb-2",
    h4: "text-xl font-heading mb-2",
    h5: "text-lg font-heading mb-2",
    h6: "text-base font-heading mb-2",
  p: "text-base text-body mb-4",
  blockquote: "border-l-4 border-blue-600 pl-4 italic my-4",
  code: "font-mono bg-gray-100 p-1 rounded",
  };

const Typography = ({ variant = "p", children, className = "" }) => {
  // Use 'p' as fallback if variant is not in the mapping
  const Element = variants[variant] ? variant : "p";
  const styleClass = variants[variant] || variants.p;
  return (
    <Element className={`${styleClass} ${className}`.trim()}>
      {children}
    </Element>
  );
};

export default Typography;