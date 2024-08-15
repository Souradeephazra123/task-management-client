"use client";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const navArr = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Project",
      link: "/project",
    },
    {
      name: "Task",
      link: "/task",
    },
  ];
  return (
    <div className=" bg-gray-900 py-10 flex flex-col gap-0 w-full min-h-screen">
      {navArr.map((nav, index) => (
        <Link
          key={index}
          href={nav.link}
          className="text-white bg-gray-800 hover:bg-gray-600 p-2  "
        >
          {nav.name}
        </Link>
      ))}
    </div>
  );
};

export default NavBar;
