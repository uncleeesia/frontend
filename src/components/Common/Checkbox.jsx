import React, { useState, useEffect } from "react";

const Checkbox = ({ label, defaultChecked, disabled, onChange }) => {
  const [checked, setChecked] = useState(defaultChecked || false);

  useEffect(() => {
    setChecked(defaultChecked || false);
  }, [defaultChecked]);

  const handleChange = (e) => {
    const newCheckedValue = e.target.checked;
    setChecked(newCheckedValue);
    if (onChange) onChange(newCheckedValue);
  };

  return (
    <label className={`flex items-center space-x-2 cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
      <div className="relative">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
        />
        <div className={`
          w-5 h-5 border-2 rounded transition-colors duration-200
          ${checked ? "bg-blue-600 border-blue-600" : "border-gray-300 bg-white"}
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}>
          {checked && (
            <svg
              className="w-4 h-4 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
      </div>
      <span className={`text-sm ${disabled ? "opacity-50" : ""}`}>{label}</span>
    </label>
  );
};

export default Checkbox;
