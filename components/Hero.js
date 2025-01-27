import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="w-full flex flex-col gap-6 select-none justify-center items-center h-[70vh] p-6 animate-fadeIn">
      {/* Hero Text */}
      <div className="herotext text-center">
        <h1 className="font-bold text-5xl text-black animate-bounce">
          Welcome to Our Service
        </h1>
        <p className="text-lg text-gray-700 mt-2">
          We provide the best solutions for your needs
        </p>
      </div>

      {/* Search Div */}
      <div className="search relative flex justify-center items-center w-full max-w-xl mt-4">
        <input
          className="border-2 outline-none w-full h-14 rounded-full px-5 border-gray-300 focus:border-[#EF4444] transition duration-300 hover:border-transparent hover:bg-clip-padding hover:from-transparent hover:to-transparent "
          type="search"
          name=""
          id="removeC"
          placeholder="Search for services..."
        />
        <Link className="absolute right-5" href="/search">
          <Image src="/search.svg" width={30} height={30} alt="Search" />
        </Link>
      </div>

      {/* Sub head */}
      <div className="subhead text-center mt-4">
        <h2 className="text-2xl font-semibold text-black animate-pulse">
          Discover More
        </h2>
      </div>
    </div>
  );
};

export default Hero;
