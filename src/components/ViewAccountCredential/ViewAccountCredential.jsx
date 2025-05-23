import React, { useState } from "react";

const ViewAccountCredential = () => {
  const [profile, setProfile] = useState({
    password: "",
    retypePassword: "",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasMinLength = password.length > 10;

    return hasUpperCase && hasLowerCase && hasNumber && hasMinLength;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (profile.password !== profile.retypePassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!validatePassword(profile.password)) {
      alert(
        "Password must be more than 10 characters and include at least one uppercase letter, one lowercase letter, and one number."
      );
      return;
    }

    console.log("Updated Profile:", profile);
    alert("Password Updated Successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-pink-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Change Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* Password */}
          <div>
            <label className="block text-sm text-gray-600 font-bold">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={profile.password}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {/* Retype Password */}
          <div>
            <label className="block text-sm text-gray-600 font-bold">
              Retype Password:
            </label>
            <input
              type="password"
              name="retypePassword"
              value={profile.retypePassword}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2 justify-center">
            <button
              type="submit"
              className="bg-green-200 hover:bg-green-300 text-green-900 font-semibold py-2 px-4 rounded"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="bg-red-200 hover:bg-red-300 text-red-900 font-semibold py-2 px-4 rounded"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewAccountCredential;
