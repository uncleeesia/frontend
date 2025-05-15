import { useState } from "react";
import { MdAlternateEmail } from "react-icons/md";
import { FaFingerprint } from "react-icons/fa";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { BsApple, BsGoogle } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import Typography from "../Common/Typography";
import Button from "../Common/Button";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const togglePasswordView = () => setShowPassword(!showPassword);
  const handleSubmit = (e) => {
    localStorage.setItem("email", email);
    navigate('/');
  };

  return (
    <div className="w-full h-150 flex items-center justify-center">
      <div className="w-[90%] max-w-sm md:max-w-md lg:max-w-md p-5 bg-gray-900 flex-col flex items-center gap-3 rounded-xl shadow-slate-500 shadow-lg">
        <Typography variant="h4" className="font-semibold text-white">
          Welcome Back
        </Typography>
        <Typography variant="h6" className="text-gray-500 text-center">
          Don't have an account? <span className="text-white cursor-pointer" onClick={() => navigate("/register")}>Sign up</span>
        </Typography>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
          <div className="w-full flex items-center gap-2 bg-gray-500 p-2 rounded-xl">
            <MdAlternateEmail />
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="bg-transparent border-0 w-full outline-none text-sm md:text-base"
            />
          </div>

          <div className="w-full flex items-center gap-2 bg-gray-500 p-2 rounded-xl relative">
            <FaFingerprint />
            <input
              type={showPassword ? "password" : "text"}
              placeholder="Password"
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
          <Button type="submit" variant="primary">
            Login
          </Button>
        </form>

        <div className="relative w-full flex items-center justify-center py-3">
          <div className="w-2/5 h-[2px] bg-gray-500"></div>
          <Typography
            variant="h3"
            className="font-lora text-xs md:text-sm px-4 text-gray-500"
          >
            Or
          </Typography>
          <div className="w-2/5 h-[2px] bg-gray-500"></div>
        </div>

        <div className="w-full flex items-center justify-evenly md:justify-between gap-2">
          <div className="p-2 md:px-6 lg:px-10 bg-slate-700 cursor-pointer rounded-xl hover:bg-slate-500">
            <BsApple className="text-lg md:text-xl" />
          </div>
          <div className="p-2 md:px-6 lg:px-10 bg-slate-700 cursor-pointer rounded-xl hover:bg-slate-500">
            <BsGoogle className="text-lg md:text-xl" />
          </div>
          <div className="p-2 md:px-6 lg:px-10 bg-slate-700 cursor-pointer rounded-xl hover:bg-slate-500">
            <FaXTwitter className="text-lg md:text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
