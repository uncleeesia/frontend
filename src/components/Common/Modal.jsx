import React, { useState } from "react";
import Button from "./Button";
import Typography from "./Typography";
import Dropdown from "./Dropdown";
import { FiX } from "react-icons/fi";

const Modal = ({ isOpen, onClose, onSave }) => {
  const [preferences, setPreferences] = useState({
    notifications: false,
    theme: "light",
    language: "english",
  });

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
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={preferences.notifications}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    notifications: e.target.checked,
                  })
                }
                className="rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-400"
              />
              <span className="text-gray-800">Enable Notifications</span>
            </label>
          </div>
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Theme</label>
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
            <label className="block mb-2 text-gray-700 font-medium">Language</label>
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
