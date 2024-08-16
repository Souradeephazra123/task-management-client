"use client";
import Link from "next/link";

export default function Home() {
  const user =
    typeof window !== "undefined" && JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <div className=" flex flex-col">
        <p>Homepage</p>
        <p>If you are a new user please sign up at first</p>
        <Link href={"/signup"} className=" underline">
          <p>Sign Up</p>
        </Link>
        <Link href={"/login"} className=" underline">
          <p>Login</p>
        </Link>
      </div>
    );
  }
  return (
    <div className=" flex flex-col">
      <p>Homepage</p>
      <Link href={"/project"} className=" underline">
        <p>Go to Project page</p>
      </Link>
      <Link href={"/task"} className=" underline">
        <p>Go to Task page</p>
      </Link>
    </div>
  );
}
