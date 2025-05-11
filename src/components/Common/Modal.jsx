import React, { useState } from "react";
import Button from "./Button";
import Typography from "./Typography";
import Dropdown from "./Dropdown";
import Checkbox from "./Checkbox";
import { FiX } from "react-icons/fi";

const Modal = ({ isOpen, onClose, onSave }) => {
  const [preferences, setPreferences] = useState({
    theme: "light",
    HouseCleaning: false,
    CarCleaning: false,
    BathroomCleaning: false,
    WindowCleaning: false,
    Indonesian: false,
    Filipino: false,
    Burmese: false,
    Vietnamese: false,
  });

  const handleCheckboxChange = (key) => (e) => {
    setPreferences({ ...preferences, [key]: e });
  };

  const handleSingleCheckboxChange = (groupKeys, selectedKey) => (checked) => {
    const updatedGroup = groupKeys.reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {});
    updatedGroup[selectedKey] = checked;
    setPreferences({ ...preferences, ...updatedGroup });
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h3">Welcome! Set Your Preferences</Typography>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Close"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              What type of services would you use the most?
            </label>
            <div className="space-y-2">
              <Checkbox
                label="House Cleaning"
                defaultChecked={preferences.HouseCleaning}
                onChange={handleCheckboxChange(
                  [
                    "House Cleaning",
                    "Car Cleaning",
                    "Bathroom Cleaning",
                    "Window Cleaning",
                  ],
                  "House Cleaning"
                )}
              />
              <Checkbox
                label="Car Cleaning"
                defaultChecked={preferences.CarCleaning}
                onChange={handleCheckboxChange(
                  [
                    "House Cleaning",
                    "Car Cleaning",
                    "Bathroom Cleaning",
                    "Window Cleaning",
                  ],
                  "Car Cleaning"
                )}
              />
              <Checkbox
                label="Bathroom Cleaning"
                defaultChecked={preferences.BathroomCleaning}
                onChange={handleCheckboxChange(
                  [
                    "House Cleaning",
                    "Car Cleaning",
                    "Bathroom Cleaning",
                    "Window Cleaning",
                  ],
                  "Bathroom Cleaning"
                )}
              />
              <Checkbox
                label="Window Cleaning"
                defaultChecked={preferences.WindowCleaning}
                onChange={handleCheckboxChange(
                  [
                    "House Cleaning",
                    "Car Cleaning",
                    "Bathroom Cleaning",
                    "Window Cleaning",
                  ],
                  "Window Cleaning"
                )}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              What nationality do you prefer your cleaner to be?
            </label>
            <div className="space-y-2">
              <Checkbox
                label="Indonesian"
                defaultChecked={preferences.Indonesian}
                onChange={handleCheckboxChange(
                  ["Indonesian", "Filipino", "Burmese", "Vietnamese"],
                  "Indonesian"
                )}
              />
              <Checkbox
                label="Filipino"
                defaultChecked={preferences.Filipino}
                onChange={handleCheckboxChange(
                  ["Indonesian", "Filipino", "Burmese", "Vietnamese"],
                  "Filipino"
                )}
              />
              <Checkbox
                label="Burmese"
                defaultChecked={preferences.Burmese}
                onChange={handleCheckboxChange(
                  ["Indonesian", "Filipino", "Burmese", "Vietnamese"],
                  "Burmese"
                )}
              />
              <Checkbox
                label="Vietnamese"
                defaultChecked={preferences.Vietnamese}
                onChange={handleCheckboxChange(
                  ["Indonesian", "Filipino", "Burmese", "Vietnamese"],
                  "Vietnamese"
                )}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Theme
            </label>
            <Dropdown
              options={[
                { value: "light", label: "Light" },
                { value: "dark", label: "Dark" },
              ]}
              value={{
                value: preferences.theme,
                label:
                  preferences.theme.charAt(0).toUpperCase() +
                  preferences.theme.slice(1),
              }}
              onChange={(option) =>
                setPreferences({ ...preferences, theme: option.value })
              }
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => onSave(preferences)}>
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
