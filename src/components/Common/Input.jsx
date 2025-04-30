import React, { useState } from "react";
import { FiSearch, FiEye, FiEyeOff } from "react-icons/fi";

const Input = ({ type = "text", label, error, icon, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="mb-10">
      {label && (
        <label className="block text-sm font-body mb-1 text-foreground">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          className={`
              w-full px-4 py-2 rounded-lg border
              ${error ? "border-destructive" : "border-input"}
              focus:outline-none focus:ring-2 focus:ring-ring
              bg-card text-foreground
            `}
          value={value}
          onChange={handleChange}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
        {type === "search" && (
          <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2" />
        )}
      </div>
      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default Input;
