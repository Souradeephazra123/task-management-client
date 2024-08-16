'use client'
import Link from "next/link";

export default function Home() {
  return (
    <div className=" flex flex-col">
      <p>Homepage</p>
      <Link href={"/project"}  className=" underline">
        <p>Go to Project page</p>
      </Link>
      <Link href={"/task"} className=" underline">
        <p>Go to Task page</p>
      </Link>
    </div>
  );
}
