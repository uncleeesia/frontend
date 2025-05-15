import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, BarChart2, Calendar, Star, MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';

const ViewCleanerProfile = () => {
  const [profile, setProfile] = useState({
    name: "Patricia Mondez",
    photo: "https://img.freepik.com/free-photo/portrait-caucasian-woman-smiling_53876-24998.jpg?ga=GA1.1.789004598.1747045939&semt=ais_hybrid&w=740",
    rating: 4.7,
    jobsCompleted: 142,
    memberSince: "March 2023",
    location: "Bishan, Singapore",
    contact: {
      phone: "+65 8222 0550",
      email: "patmon@cleaninghaul.com"
    },
    availability: "Monday to Friday, 8AM - 6PM",
    services: ["Regular Cleaning", "Deep Cleaning", "Move-in/out Cleaning"],
    bio: "Professional cleaner with 5+ years experience. I take pride in delivering spotless results with attention to detail. Pet-friendly and eco-conscious cleaning products available upon request.",
    certifications: ["CPR Certified", "Eco-Cleaning Certified", "WSQ in Enhanced Cleaning"]
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({...profile});
  
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    setProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Cleaner Profile</h1>
          <div className="flex space-x-3">
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              <Edit size={18} />
              {isEditing ? 'Cancel' : 'Update Profile'}
            </button>
            <button 
            onClick={() => navigate('/cleanerstats')}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors">
              <BarChart2 size={18} />
              Check Performance
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white shadow rounded-xl overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row gap-8">
              {/* Profile Photo Section */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <img 
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                    src={profile.photo} 
                    alt={profile.name}
                  />
                  {isEditing && (
                    <div className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md">
                      <label className="cursor-pointer">
                        <Edit size={16} className="text-blue-600" />
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                setFormData(prev => ({
                                  ...prev,
                                  photo: event.target.result
                                }));
                              };
                              reader.readAsDataURL(e.target.files[0]);
                            }
                          }}
                        />
                      </label>
                    </div>
                  )}
                </div>
                
                {/* Rating */}
                <div className="mt-4 flex items-center justify-center sm:justify-start">
                  <div className="flex items-center">
                    <Star className="text-yellow-400 fill-yellow-400" size={20} />
                    <span className="ml-1 text-lg font-semibold">{profile.rating}</span>
                  </div>
                  <span className="ml-2 text-gray-500">({profile.jobsCompleted} jobs)</span>
                </div>
                
                {/* Member Since */}
                <div className="mt-2 flex items-center text-gray-600 text-sm">
                  <Calendar size={16} className="mr-1" />
                  Member since {profile.memberSince}
                </div>
              </div>
              
              {/* Profile Info Section */}
              <div className="flex-grow">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="text"
                        name="contact.phone"
                        value={formData.contact.phone}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          contact: {
                            ...prev.contact,
                            phone: e.target.value
                          }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="contact.email"
                        value={formData.contact.email}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          contact: {
                            ...prev.contact,
                            email: e.target.value
                          }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                      <input
                        type="text"
                        name="availability"
                        value={formData.availability}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <button
                      onClick={handleSaveProfile}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                    <div className="mt-2 flex items-center text-gray-600">
                      <MapPin size={16} className="mr-1" />
                      {profile.location}
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Phone size={16} className="mr-2 text-gray-500" />
                        <span>{profile.contact.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail size={16} className="mr-2 text-gray-500" />
                        <span>{profile.contact.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="mr-2 text-gray-500" />
                        <span>{profile.availability}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900">About Me</h3>
                      <p className="mt-2 text-gray-600">{profile.bio}</p>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900">Services Offered</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {profile.services.map((service, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {profile.certifications && profile.certifications.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-900">Certifications</h3>
                        <ul className="mt-2 space-y-2">
                          {profile.certifications.map((cert, index) => (
                            <li key={index} className="flex items-center">
                              <CheckCircle size={16} className="mr-2 text-green-500" />
                              <span>{cert}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Stats Section */}
          {!isEditing && (
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Jobs Completed</p>
                  <p className="text-2xl font-bold">{profile.jobsCompleted}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Repeat Clients</p>
                  <p className="text-2xl font-bold">87%</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Response Time</p>
                  <p className="text-2xl font-bold">1.2h</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Cancellation Rate</p>
                  <p className="text-2xl font-bold">2%</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewCleanerProfile;