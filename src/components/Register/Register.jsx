import { useState } from "react";
import { MdAlternateEmail } from "react-icons/md";
import { FaFingerprint, FaUser, FaHome, FaPhoneAlt, FaBirthdayCake, FaTransgender } from "react-icons/fa";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Typography from "../Common/Typography";
import Button from "../Common/Button";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const togglePasswordView = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !address || !password || !confirmPassword || !role) {
      alert('Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (calculateAge(dob) < 21) {
      alert("You must be at least 21 years old to register.");
      return;
    }

    console.log("Registering:", { name, email, phone, address, role });
    localStorage.setItem("user", JSON.stringify({ name, email, phone, address, role }));
    navigate('/');
  };

  return (
    <div className="w-full h-auto flex items-center justify-center">
      <div className="w-[90%] max-w-sm md:max-w-md lg:max-w-md p-5 bg-gray-900 flex-col flex items-center gap-3 rounded-xl shadow-slate-500 shadow-lg">
        <Typography variant="h4" className="font-semibold text-white">
          Create Account
        </Typography>
        <Typography variant="h6" className="text-gray-500 text-center">
          Already have an account?{" "}
          <span
            className="text-white cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </Typography>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">

          {/* Full Name */}
          <div className="w-full flex items-center gap-2 bg-gray-500 p-2 rounded-xl">
            <FaUser />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent border-0 w-full outline-none text-sm md:text-base"
            />
          </div>

          {/* Email */}
          <div className="w-full flex items-center gap-2 bg-gray-500 p-2 rounded-xl">
            <MdAlternateEmail />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-0 w-full outline-none text-sm md:text-base"
            />
          </div>

          {/* Phone Number */}
          <div className="w-full flex items-center gap-2 bg-gray-500 p-2 rounded-xl">
            <FaPhoneAlt />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-transparent border-0 w-full outline-none text-sm md:text-base"
            />
          </div>

          {/* Address */}
          <div className="w-full flex items-center gap-2 bg-gray-500 p-2 rounded-xl">
            <FaHome />
            <input
              type="text"
              placeholder="Home Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="bg-transparent border-0 w-full outline-none text-sm md:text-base"
            />
          </div>

          {/* Password */}
          <div className="w-full flex items-center gap-2 bg-gray-500 p-2 rounded-xl relative">
            <FaFingerprint />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border-0 w-full outline-none text-sm md:text-base"
            />
            {showPassword ? (
              <FaRegEyeSlash
                className="absolute right-5 cursor-pointer"
                onClick={togglePasswordView}
              />
            ) : (
              <FaRegEye
                className="absolute right-5 cursor-pointer"
                onClick={togglePasswordView}
              />
            )}
          </div>

          {/* Confirm Password */}
          <div className="w-full flex items-center gap-2 bg-gray-500 p-2 rounded-xl relative">
            <FaFingerprint />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-transparent border-0 w-full outline-none text-sm md:text-base"
            />
            {showPassword ? (
              <FaRegEyeSlash
                className="absolute right-5 cursor-pointer"
                onClick={togglePasswordView}
              />
            ) : (
              <FaRegEye
                className="absolute right-5 cursor-pointer"
                onClick={togglePasswordView}
              />
            )}
          </div>

          {/* Role Selection */}
          <div className="w-full flex justify-between gap-2">
            <Button
              type="button"
              variant={role === "Homeowner" ? "primary" : "outline"}
              onClick={() => setRole("Homeowner")}
              className="w-1/2"
            >
              Homeowner
            </Button>
            <Button
              type="button"
              variant={role === "Cleaner" ? "primary" : "outline"}
              onClick={() => setRole("Cleaner")}
              className="w-1/2"
            >
              Cleaner
            </Button>
          </div>

          <Button type="submit" variant="primary">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
