import React from "react";

import { GrHomeRounded } from "react-icons/gr";
import { CiSearch } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
import { CgMenuRight } from "react-icons/cg";
const Navbar = () => {
  return (
    <>
      <nav className=" w-full fixed bottom-0 md:top-0 left-0 right-0 flex items-center max-h-[80px] bg-white drop-shadow-md">
        <div className="flex md:justify-between justify-center items-center container py-2 px-5 ">
          <picture>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg"
              alt="logo"
              className="h-[40px] cursor-pointer md:block hidden"
            />
          </picture>
          <ul className="flex md:gap-2 gap-0">
            <li className="px-4 py-3 my-2 mx-2">
              <GrHomeRounded className="text-[20px]" />
            </li>
            <li className="px-4 py-3 my-2 mx-2">
              <CiSearch className="text-[20px]" />
            </li>
            <li className="px-4 py-3 my-2 mx-2">
              <IoCreateOutline className="text-[20px]" />
            </li>
            <li className="px-4 py-3 my-2 mx-2">
              <GoHeart className="text-[20px]" />
            </li>
            <li className="px-4 py-3 my-2 mx-2">
              <FaRegUser className="text-[20px]" />
            </li>
          </ul>
          <CgMenuRight className="md:block hidden text-[20px]" />
        </div>
      </nav>
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1523720131524-71ae6dbed986?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="w-full h-[250px] object-cover mt-[80px] hidden md:block relative"
        />
        <div className="absolute inset-0 bg-[#00000052]"></div>
      </div>
    </>
  );
};

export default Navbar;
