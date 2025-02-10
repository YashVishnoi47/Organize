import React from "react";
import Image from "next/image";
import Link from "next/link";


const Hero = () => {
  return (
    <div className="relative w-full h-screen bg-white flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/light-bg-pattern.png')] bg-cover opacity-10"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl p-6">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-800 mb-6">
          Plan and Celebrate Your Events Seamlessly
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Discover the perfect venues, organize events, and create unforgettable
          memories with ease.
        </p>

        {/* Search and CTA */}
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search for events, venues, or organizers..."
              className="w-full h-14 pl-5 pr-16 rounded-full border border-purple-300 shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all"
            />
            <Link href="/search">
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-purple-500 p-3 rounded-full hover:bg-purple-600 transition-all">
                <Image className="fill-white" src="/search.svg" width={20} height={20} alt="Search" />
              </div>
            </Link>
          </div>

          <Link href="/get-started">
            <div className="bg-purple-500 hover:bg-purple-600 text-white py-3 px-10 rounded-full text-lg transition-all duration-300 shadow-lg">
              Get Started
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
