import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("email"));
  const [isLoginPage, setIsLoginPage] = useState(
    window.location.pathname === "/login"
  );

  useEffect(() => {
  }, []);

  useEffect(() => {}, []);

  const handleLogout = () => {
    localStorage.removeItem("email");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="w-full bg-white shadow p-4 flex justify-between items-center">
      <div className="font-bold text-xl text-blue-700">Cleaning Haul</div>
      <nav>
        <ul className="flex gap-6 items-center list-none">
          <li className="list-none">
            <a
              href="/"
              className="font-medium text-gray-600 hover:text-blue-600"
            >
              Home
            </a>
          </li>
          <li className="list-none">
            <a
              href="/about"
              className="font-medium text-gray-600 hover:text-blue-600"
            >
              About
            </a>
          </li>
          <li className="list-none">
            <a
              href="/contact"
              className="font-medium text-gray-600 hover:text-blue-600"
            >
              Contact
            </a>
          </li>

          {!isLoginPage &&
            (isLoggedIn ? (
              <li className="list-none">
                <button
                  onClick={handleLogout}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li className="list-none">
                <a
                  href="/login"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Login
                </a>
              </li>
            ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
