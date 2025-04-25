import React from 'react';

const Typography = ({ variant = "p", children, className }) => {
  const variants = {
    h1: "text-4xl font-heading mb-4",
    h2: "text-3xl font-heading mb-3",
    h3: "text-2xl font-heading mb-2",
    h4: "text-xl font-heading mb-2",
    h5: "text-lg font-heading mb-2",
    h6: "text-base font-heading mb-2",
    p: "text-body mb-4",
    blockquote: "border-l-4 border-primary pl-4 italic my-4",
    code: "font-mono bg-secondary p-1 rounded",
  };

  const Component = variant;
  return (
    <Component className={`${variants[variant]} ${className || ""}`}>
      {children}
    </Component>
  );
};

export default Typography;