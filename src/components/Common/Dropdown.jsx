import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

/**
 * Dropdown component supporting single/multiple, search, and disabled options.
 *
 * @param {Array<{ label: string, value: any, disabled?: boolean }>} options
 * @param {boolean} multiple
 * @param {boolean} searchable
 * @param {object|null} value
 * @param {(option) => void} onChange
 */
const Dropdown = ({
  options = [],
  multiple = false,
  searchable = false,
  value = null,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(search.toLowerCase())
      )
    : options;

  // Display for single-select: value.label; for multi: join array of labels, or default
  const displayValue = () => {
    if (multiple && Array.isArray(value) && value.length)
      return value.map((v) => v.label).join(", ");
    if (!multiple && value)
      return value.label;
    return "Select option";
  };

  return (
    <div className="relative">
      <div
        className="border border-gray-300 rounded-lg p-2 flex justify-between items-center cursor-pointer bg-white"
        onClick={() => setIsOpen((open) => !open)}
        tabIndex={0}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex-1">
          {searchable && isOpen ? (
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none"
              placeholder="Search..."
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span className={displayValue() === "Select option" ? "text-gray-400" : ""}>
              {displayValue()}
            </span>
          )}
        </div>
        <FiChevronDown
          className={`ml-2 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
          {filteredOptions.length === 0 && (
            <div className="p-2 text-gray-500">No options</div>
          )}
          {filteredOptions.map((option) => (
            <div
              key={option.value}
              className={`
                p-2 cursor-pointer hover:bg-blue-50
                ${option.disabled ? "opacity-50 cursor-not-allowed" : ""}
              `}
              onClick={(e) => {
                e.stopPropagation();
                if (option.disabled) return;
                // Multi-select can be enhanced as needed, but here is basic single select
                if (multiple) {
                  let arr = Array.isArray(value) ? [...value] : [];
                  if (arr.find((v) => v.value === option.value))
                    arr = arr.filter((v) => v.value !== option.value);
                  else arr.push(option);
                  onChange && onChange(arr);
                } else {
                  onChange && onChange(option);
                  setIsOpen(false);
                }
                setSearch("");
              }}
              role="option"
              aria-selected={
                multiple
                  ? Array.isArray(value) && value.some((v) => v.value === option.value)
                  : value && value.value === option.value
              }
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
