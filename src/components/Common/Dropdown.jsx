import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const Dropdown = ({ options, multiple, searchable, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(search.toLowerCase())
      )
    : options;

  return (
    <div className="relative">
      <div
        className="border border-input rounded-lg p-2 flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex-1">
          {searchable ? (
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full focus:outline-none bg-transparent"
              placeholder="Search..."
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span>{value?.label || "Select option"}</span>
          )}
        </div>
        <FiChevronDown
          className={`transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-1 bg-card border border-input rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
          {filteredOptions.map((option) => (
            <div
              key={option.value}
              className={`
                p-2 cursor-pointer hover:bg-secondary
                ${option.disabled ? "opacity-50 cursor-not-allowed" : ""}
              `}
              onClick={() => {
                if (!option.disabled) {
                  onChange(option);
                  if (!multiple) {
                    setIsOpen(false);
                  }
                }
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Dropdown;
