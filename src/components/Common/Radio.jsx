import React, { useState, useEffect } from "react";

const Radio = ({ name, options, value: controlledValue, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(controlledValue);

  useEffect(() => {
    setSelectedValue(controlledValue);
  }, [controlledValue]);

  const handleChange = (value) => {
    setSelectedValue(value);
    if (onChange) onChange(value);
  };

  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <div className="relative">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              disabled={option.disabled}
              onChange={() => handleChange(option.value)}
              className="peer sr-only"
            />
            <div
              className={`
              w-5 h-5 rounded-full border-2 transition-colors duration-200
              ${selectedValue === option.value ? "border-blue-600" : "border-gray-300"}
              ${option.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              `}
            >
              {selectedValue === option.value && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-blue-600" />
              )}
            </div>
          </div>
          <span className={`text-sm ${option.disabled ? "opacity-50" : ""}`}>{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default Radio;