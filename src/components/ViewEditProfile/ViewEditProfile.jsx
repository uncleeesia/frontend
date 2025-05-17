import React, { useState } from 'react';

const ViewEditProfile = () => {
  const [profile, setProfile] = useState({
    Currentusername: '',
    NewUsername: '',
    currentEmail: '',
    newEmail: '',
    currentAddress: '',
    newAddress: '',
    password: '',
    Password: '',
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Profile:', profile);
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-pink-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center">
        {/* Circular Profile Picture Placeholder */}
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 bg-blue-300 rounded-full"></div>
        </div>

        <h2 className="text-xl font-semibold text-gray-700 mb-4">Edit Your Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* Current Username (no border) */}
          <div>
            <label className="block text-sm text-gray-600 font-bold">Current Username:</label>
            <input
              type="text"
              name="Currentusername"
              value={profile.Currentusername}
              onChange={handleChange}
              className="w-full px-3 py-2 outline-none"
            />
          </div>

          {/* Current Email */}
          <div>
            <label className="block text-sm text-gray-600 font-bold">Current Email:</label>
            <input
              type="email"
              name="currentEmail"
              value={profile.currentEmail}
              onChange={handleChange}
              className="w-full px-3 py-2 outline-none"
            />
          </div>

          {/* Current Address */}
          <div>
            <label className="block text-sm text-gray-600 font-bold">Current Address:</label>
            <input
              type="text"
              name="currentAddress"
              value={profile.currentAddress}
              onChange={handleChange}
              className="w-full  px-3 py-2 outline-none"
            />
          </div>
          
          {/* New Username */}
          <div>
            <label className="block text-sm text-gray-600 font-bold">New Username:</label>
            <input
              type="text"
              name="NewUsername"
              value={profile.NewUsername}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          
          {/* New Email */}
          <div>
            <label className="block text-sm text-gray-600 font-bold">New Email:</label>
            <input
              type="email"
              name="newEmail"
              value={profile.newEmail}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          

          {/* New Address */}
          <div>
            <label className="block text-sm text-gray-600 font-bold">New Address:</label>
            <input
              type="text"
              name="newAddress"
              value={profile.newAddress}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-600 font-bold">Password:</label>
            <input
              type="password"
              name="password"
              value={profile.password}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Retype Password */}
          <div>
            <label className="block text-sm text-gray-600 font-bold">Retype Password:</label>
            <input
              type="password"
              name="Password"
              value={profile.Password}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
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

export default ViewEditProfile;
