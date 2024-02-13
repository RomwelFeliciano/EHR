import React, { useState } from "react";
import { Link } from "react-router-dom";
const Navbar = ({ isLogin, handeLogout }) => {
  return (
    <header className="bg-main fixed top-0 flex h-24 w-full items-center justify-between px-32 shadow-lg">
      <h1 className="text-second text-3xl font-bold">EHR</h1>
      <nav className="flex w-full items-center justify-end gap-4 text-lg font-medium">
        <Link to="/" className="hover:text-second">
          Home
        </Link>
        {isLogin && (
          <>
            <Link to="/patients" className="hover:text-second">
              Patients
            </Link>
            <Link to="/assessments" className="hover:text-second">
              Assessments
            </Link>
          </>
        )}
        <Link to="/about" className="hover:text-second">
          About
        </Link>
        {!isLogin && (
          <>
            <Link
              to="/login"
              className="text-second border-second hover:bg-third rounded-lg border-2 px-2 py-1 transition-all duration-300 ease-in-out hover:border-black hover:text-white"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-second border-second hover:bg-third rounded-lg border-2 px-2 py-1 transition-all duration-300 ease-in-out hover:border-black hover:text-white"
            >
              Register
            </Link>
          </>
        )}

        {isLogin && (
          <Link
            to="/"
            className="text-second border-second hover:bg-third rounded-lg border-2 px-2 py-1 transition-all duration-300 ease-in-out hover:border-black hover:text-white"
            onClick={handeLogout}
          >
            Logout
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
