import React, { useState } from "react";
import Button from "./Button";
import Typography from "./Typography";
import Dropdown from "./Dropdown";
import Checkbox from "./Checkbox";
import { FiX } from "react-icons/fi";

const Modal = ({ isOpen, onClose, onSave }) => {
  const [preferences, setPreferences] = useState({
    notifications: false,
    theme: "light",
    language: "english",
    budgetLow: false,
    budgetMid: false,
    budgetHigh: false,
    rating4: false,
    rating5: false,
    reviews50: false,
    reviews200: false,
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
          <Checkbox
            label="Enable Notifications"
            defaultChecked={preferences.notifications}
            onChange={handleCheckboxChange("notifications")}
          />

          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Budget
            </label>
            <div className="space-y-2">
              <Checkbox
                label="Below $30"
                defaultChecked={preferences.budgetLow}
                onChange={handleSingleCheckboxChange(
                  ["budgetLow", "budgetMid", "budgetHigh"],
                  "budgetLow"
                )}
              />
              <Checkbox
                label="$30–$40"
                defaultChecked={preferences.budgetMid}
                onChange={handleSingleCheckboxChange(
                  ["budgetLow", "budgetMid", "budgetHigh"],
                  "budgetMid"
                )}
              />
              <Checkbox
                label="Above $40"
                defaultChecked={preferences.budgetHigh}
                onChange={handleSingleCheckboxChange(
                  ["budgetLow", "budgetMid", "budgetHigh"],
                  "budgetHigh"
                )}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Minimum Rating
            </label>
            <div className="space-y-2">
              <Checkbox
                label="4★ and above"
                defaultChecked={preferences.rating4}
                onChange={handleSingleCheckboxChange(
                  ["rating4", "rating5"],
                  "rating4"
                )}
              />
              <Checkbox
                label="5★ only"
                defaultChecked={preferences.rating5}
                onChange={handleSingleCheckboxChange(
                  ["rating4", "rating5"],
                  "rating5"
                )}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Reviews
            </label>
            <div className="space-y-2">
              <Checkbox
                label="50+ Reviews"
                defaultChecked={preferences.reviews50}
                onChange={handleSingleCheckboxChange(
                  ["reviews50", "reviews200"],
                  "reviews50"
                )}
              />
              <Checkbox
                label="200+ Reviews"
                defaultChecked={preferences.reviews200}
                onChange={handleSingleCheckboxChange(
                  ["reviews50", "reviews200"],
                  "reviews200"
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

          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Language
            </label>
            <Dropdown
              options={[
                { value: "english", label: "English" },
                { value: "spanish", label: "Spanish" },
                { value: "french", label: "French" },
              ]}
              value={{
                value: preferences.language,
                label:
                  preferences.language.charAt(0).toUpperCase() +
                  preferences.language.slice(1),
              }}
              onChange={(option) =>
                setPreferences({ ...preferences, language: option.value })
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
