import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { CiCircleCheck, CiCircleRemove } from "react-icons/ci";

const Signup = () => {
  const isAuthenticated = false;

  const [validEmailOrPhone, setValidEmailOrPhone] = useState("");
  const [validUsername, setValidUsername] = useState("");

  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [username, setUsername] = useState("");

  // email regex
  const emailPhoneRegex = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const phoneRegex = /^\d{10}$/;

    if (emailRegex.test(emailOrPhone) || phoneRegex.test(emailOrPhone)) {
      setValidEmailOrPhone(true);
    } else {
      setValidEmailOrPhone(false);
    }
  };

  // handle email or phone change
  const handleEmailOrPhoneChange = (e) => {
    setEmailOrPhone(e.target.value);
    emailPhoneRegex();
  };

  // handle username change
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    checkUsername(); // Call the function to check the username
  };

  const checkUsername = () => {
    if (username.length > 0) {
      setValidUsername(true);
    } else {
      setValidUsername(false);
    }
  };

  useEffect(() => {
    if (emailOrPhone === "") {
      setValidEmailOrPhone(""); // Set it to false when empty
    }

    if (username === "") {
      setValidUsername(""); // Set it to false when empty
    }
  }, [emailOrPhone, username]);

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
        <div className="flex flex-col justify-center items-center gap-5 max-w-[400px] mt-0 md:mt-[150px] w-[100%] p-[24px] placeholder-fuchsia-100">
          <h2 className="text-3xl font-bold text-textLight dark:text-textDark">
            Signup to vichar
          </h2>
          <form className="flex flex-col gap-5 w-[100%]" autoComplete="off">
            <div className="relative">
              <div className="absolute top-[50%] right-[15px] -translate-y-1/2 text-[20px]">
                {validEmailOrPhone === true ? (
                  <CiCircleCheck className="text-[30px] text-green-500 cursor-pointer" />
                ) : validEmailOrPhone === false ? (
                  <div className="relative">
                    <CiCircleRemove className="text-[30px] text-red-500" />
                  </div>
                ) : null}
              </div>
              <input
                type="text"
                placeholder="Email or Phone number"
                className={`w-[100%] py-4 px-3 text-[13px] rounded-xl focus:outline outline-1 bg-inputColorLight dark:bg-inputColorDark dark:text-textDark
                focus:outline-primaryLight dark:focus:outline-primaryDark ${
                  validEmailOrPhone === false ? "focus:outline-red-500" : ""
                }`}
                onChange={handleEmailOrPhoneChange}
              />
            </div>
            <input
              type="text"
              placeholder="Full name"
              className="w-[100%] py-4 px-3 text-[13px] rounded-xl focus:outline outline-1 bg-inputColorLight dark:bg-inputColorDark dark:text-textDark
                focus:outline-primaryLight dark:focus:outline-primaryDark"
            />
            <div className="relative">
              <div className="absolute top-[50%] right-[15px] -translate-y-1/2 text-[20px]">
                {validUsername === true ? (
                  <CiCircleCheck className="text-[30px] text-green-500 cursor-pointer" />
                ) : validUsername === false ? (
                  <div className="relative">
                    <CiCircleRemove className="text-[30px] text-red-500" />
                  </div>
                ) : null}
              </div>
              <input
                type="text"
                placeholder="Username"
                className="w-[100%] py-4 px-3 text-[13px] rounded-xl focus:outline outline-1 bg-inputColorLight dark:bg-inputColorDark dark:text-textDark
                focus:outline-primaryLight dark:focus:outline-primaryDark"
                maxLength={20}
                onChange={handleUsernameChange}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                className="w-[100%] py-4 px-3 text-[13px] rounded-xl focus:outline outline-1 bg-inputColorLight dark:bg-inputColorDark dark:text-textDark
                focus:outline-primaryLight dark:focus:outline-primaryDark"
              />
            </div>
            <button
              className="w-[100%] py-4 px-3 rounded-xl 
              bg-[#101010] hover:bg-[#202020] transition dark:bg-gradient-to-r dark:from-teal-400 dark:to-blue-300 dark:hover:from-teal-500 dark:hover:to-blue-400 text-textDark dark:text-textLight"
            >
              Signup
            </button>
          </form>
          <p className="text-[13px] cursor-pointer text-textLight dark:text-textDark">
            Allready have an account?{" "}
            <Link to={"/login"} className="font-bold cursor-pointer">
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
