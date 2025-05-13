import React, { useState } from 'react';

const EditProfile = () => {
  const [profile, setProfile] = useState({
    Currentusername: '',
    NewUsername: '',
    email: '',
    address: '',
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-80 to-pink-50 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Edit Your Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 font-bold">Current Username:</label>
            <input
              type="text"
              name="Current username"
              value={profile.Currentusername}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 font-bold">New Username:</label>
            <input
              type="text"
              name="New Username"
              value={profile.NewUsername}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 font-bold">Email:</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 font-bold">Address:</label>
            <input
              type="text"
              name="address"
              value={profile.address}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

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

          <div>
            <label className="block text-sm text-gray-600 font-bold">Retype Password:</label>
            <input
              type="Password"
              name="Password"
              value={profile.Passwordassword}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-green-200 hover:bg-green-300 text-green-900 font-semibold py-2 px-4 rounded"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="bg-red-200 hover:bg-red-300 text-red-900 font-semibold py-2 px-4 rounded"
              onClick={() => window.history.back()} // This will go back to the previous page
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
