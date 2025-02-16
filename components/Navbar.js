import React from "react";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TfiMenu } from "react-icons/tfi";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="w-full relative flex justify-center h-20">
      {/* Left side of the Navbar */}
      <div className="left p-2 justify-between items-center w-[40%] h-full  flex">
        <div className="logo">
          <Link href="/">
            <h1 className="font-bold text-4xl text-purple-600">Organize</h1>
          </Link>
        </div>
      </div>

      {/* Right side of the Navbar */}
      <div className="right p-4 w-[40%] items-center gap-8 justify-end h-full  flex">
        <SignedOut>
          <SignInButton className="cursor-pointer transition-all rounded-full py-2 bg-purple-500 text-white px-6 py-rounded-lg border-purple-900 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px]  active:border-b-[2px] active:brightness-90 active:translate-y-[2px]" />
          <SignUpButton className="cursor-pointer transition-all rounded-full py-2 bg-purple-500 text-white px-6 py-rounded-lg border-purple-900 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px]  active:border-b-[2px] active:brightness-90 active:translate-y-[2px]" />
        </SignedOut>

        <SignedIn>
          <div className="Links hidden lg:flex gap-8">
            <Link
              className="relative group text-black font-medium hover:text-purple-400 transition-colors duration-300"
              href="/"
            >
              Home
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              className="relative group text-black font-medium hover:text-purple-400 transition-colors duration-300"
              href="/aboutus"
            >
              About Us
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              className="relative group text-black font-medium hover:text-purple-400 transition-colors duration-300"
              href="/profile"
            >
              Your Profile
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          <UserButton className="ml-4" />

          <Sheet>
            {/* Menu Button */}
            <SheetTrigger>
              <TfiMenu className="text-3xl text-purple-800 font-extrabold hover:cursor-pointer border-black block lg:hidden" />
            </SheetTrigger>

            {/* Sidebar Menu */}
            <SheetContent className="w-full max-w-[280px] bg-white shadow-lg rounded-l-xl p-6 flex flex-col gap-6">
              {/* Logo or Title */}
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-purple-800">
                  MyApp
                </span>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-4">
                <Link
                  href="/"
                  className="flex items-center gap-3 p-3 text-lg font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-100 rounded-lg transition-all duration-300"
                >
                  🏠 Home
                </Link>
                <Link
                  href="/aboutus"
                  className="flex items-center gap-3 p-3 text-lg font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-100 rounded-lg transition-all duration-300"
                >
                  ℹ️ About Us
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center gap-3 p-3 text-lg font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-100 rounded-lg transition-all duration-300"
                >
                  👤 Your Profile
                </Link>
              </nav>

              {/* CTA Button */}
              <div className="mt-auto">
                <Link
                  href="/contact"
                  className="block w-full text-center bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
