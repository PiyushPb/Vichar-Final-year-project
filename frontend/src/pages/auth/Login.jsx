import React from "react";
import { Link, Navigate } from "react-router-dom";

const Login = () => {
  const isAuthenticated = false;

  return isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <div className="w-full h-[100vh] bg-bgLight dark:bg-bgDark">
      <img
        src="https://static.cdninstagram.com/rsrc.php/yH/r/JesX5Buw5jT.webp"
        alt="..."
        className="w-[95%] absolute top-0 left-[50%] -translate-x-1/2 md:block hidden"
      />
      <div className="w-full h-[100vh] flex justify-center items-center relative z-10">
        <div className="flex flex-col justify-center items-center gap-5 max-w-[400px] w-[100%] p-[24px] placeholder-fuchsia-100">
          <h2 className="text-3xl font-bold text-textLight dark:text-textDark ">
            Log in to vichar
          </h2>
          <form className="flex flex-col gap-5 w-[100%]">
            <input
              type="text"
              placeholder="Username, Email or Phone number"
              className="w-[100%] py-4 px-3 text-[13px] rounded-xl focus:outline outline-1 bg-inputColorLight dark:bg-inputColorDark dark:text-textDark
              focus:outline-primaryLight dark:focus:outline-primaryDark
              "
            />
            <input
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              className="w-[100%] py-4 px-3 text-[13px] rounded-xl focus:outline outline-1 bg-inputColorLight dark:bg-inputColorDark dark:text-textDark
              focus:outline-primaryLight dark:focus:outline-primaryDark"
            />
            <button
              className="w-[100%] py-4 px-3 rounded-xl 
              bg-[#101010] hover:bg-[#202020] transition dark:bg-gradient-to-r dark:from-teal-400 dark:to-blue-300 dark:hover:from-teal-500 dark:hover:to-blue-400 text-textDark dark:text-textLight"
            >
              Login
            </button>
          </form>
          <p className="text-[13px] cursor-pointer text-textLight dark:text-textDark">
            Forgotten password?
          </p>
          <p className="text-[13px] text-textLight dark:text-textDark">
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
