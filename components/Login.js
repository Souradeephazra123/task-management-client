"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const handleSignin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const body = {
      email,
      password,
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    localStorage.setItem("user", JSON.stringify(data.user));
    if (res.status === 200) {
      router.push("/");
    }
  };
  return (
    <div className=" flex items-center justify-center bg-gray-300 min-h-screen">
      <div className=" p-6 rounded bg-gray-400 border-black flex flex-col gap-10">
        <h1 className=" text-center font-bold text-2xl">Signin</h1>
        <form onSubmit={handleSignin} className=" flex flex-col gap-3 ">
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="Email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="password"
            />
          </div>
          <button className=" p-2 rounded bg-[#E9C638] w-fit" type="submit">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
