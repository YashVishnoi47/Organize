import React from "react";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full relative flex justify-center h-20">
      {/* Left side of the Navbar */}
      <div className="left p-2 justify-between items-center w-[40%] h-full  flex">
        <div className="logo">
          <Link href="/">
            <h1 className="font-bold text-2xl">LogoHere</h1>
          </Link>
        </div>
      </div>

      {/* Right side of the Navbar */}
      <div className="right p-4 w-[40%] items-center gap-8 justify-end h-full  flex">
        <SignedOut>
          <SignInButton className="cursor-pointer transition-all rounded-full py-2 bg-red-500 text-white px-6 py-rounded-lg border-red-900 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px]  active:border-b-[2px] active:brightness-90 active:translate-y-[2px]" />
          <SignUpButton className="cursor-pointer transition-all rounded-full py-2 bg-red-500 text-white px-6 py-rounded-lg border-red-900 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px]  active:border-b-[2px] active:brightness-90 active:translate-y-[2px]" />
        </SignedOut>

        <SignedIn>
          <div className="Links flex gap-4">
            <Link className="hover:underline" href="/events/create">Create Events</Link>
            <Link className="hover:underline" href="/profile">Your Profile</Link>
            <Link className="hover:underline" href="/">Your Tickets</Link>
          </div>
          <UserButton className="ml-4"/>
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
