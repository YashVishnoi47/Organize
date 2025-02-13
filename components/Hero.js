import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col lg:flex-row items-center justify-between gap-8 py-12 px-4 sm:px-6 md:py-16 lg:px-8 overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10 w-full lg:max-w-2xl flex flex-col items-center lg:items-start">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-gray-800 mb-4 md:mb-6 text-center lg:text-left">
          Plan and Celebrate Your Events Seamlessly
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 md:mb-10 text-center lg:text-left max-w-3xl">
          Discover the perfect venues, organize events, and create unforgettable
          memories with ease.
        </p>

        {/* Trust Elements */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {[
            { icon: "/eventicon.svg", title: "10,000+ Events Hosted", text: "Join thousands of successful event organizers." },
            { icon: "/shieldheart.svg", title: "Secure and Reliable", text: "Your events are safe with us." },
            { icon: "/support.svg", title: "24/7 Customer Support", text: "We're always here to help." }
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center bg-purple-100 p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 sm:w-14 sm:h-14 relative">
                <Image 
                  src={item.icon}
                  layout="fill"
                  objectFit="contain"
                  alt={item.title}
                />
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-semibold mt-3 sm:mt-4 text-center">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 text-center mt-1">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="w-full mt-8 sm:mt-12 flex justify-center lg:justify-start">
          <Link href="/get-started" passHref>
            <div className="bg-purple-500 hover:bg-purple-600 text-white py-3 px-8 sm:px-10 rounded-full text-base sm:text-lg transition-all duration-300 shadow-lg w-full sm:w-auto text-center">
              Get Started Now
            </div>
          </Link>
        </div>
      </div>

      {/* Right Side Visual */}
      <div className="relative w-full lg:w-1/2 h-64 sm:h-80 md:h-96 lg:h-auto lg:min-h-[600px] mt-8 lg:mt-0">
        <Image
          src="/eventgheroimage.jpg"
          alt="Event Celebration"
          layout="fill"
          objectFit="cover"
          className="rounded-xl lg:rounded-2xl shadow-lg"
          priority
        />
      </div>
    </div>
  );
};

export default Hero;