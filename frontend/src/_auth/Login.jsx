import React from "react";
import { Link, Navigate } from "react-router-dom";

const Login = () => {
  const isAuthenticated = false;

  return isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <div className="w-full h-[100vh]">
      <img
        src="https://static.cdninstagram.com/rsrc.php/yH/r/JesX5Buw5jT.webp"
        alt="..."
        className="w-[95%] absolute top-0 left-[50%] -translate-x-1/2 z-[-1] md:block hidden"
      />
      <div className="w-full h-[100vh] flex justify-center items-center z-10">
        <div className="flex flex-col justify-center items-center gap-5 max-w-[400px] w-[100%] p-[24px] placeholder-fuchsia-100">
          <h2 className="text-3xl font-bold">Log in to vichar</h2>
          <form className="flex flex-col gap-5 w-[100%]">
            <input
              type="text"
              placeholder="Username, Email or Phone number"
              className="w-[100%] py-4 px-3 text-[13px] rounded-xl bg-gray-100 focus:outline-gray-500 focus:outline focus: outline-1"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-[100%] py-4 px-3 text-[13px] rounded-xl bg-gray-100 focus:outline-gray-500 focus:outline focus: outline-1"
            />
            <button className="w-[100%] py-4 px-3 rounded-xl bg-black text-white">
              Login
            </button>
          </form>
          <p className="text-[13px] cursor-pointer">Forgotten password?</p>
          <p className="text-[13px]">
            Don't have an account?{" "}
            <Link to={"/signup"} className="font-bold cursor-pointer">
              Sign up
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
