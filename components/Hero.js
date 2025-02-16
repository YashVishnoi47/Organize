import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { auth } from "@clerk/nextjs/server";

const Hero = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.publicMetadata.userId;
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center gap-12 py-20 px-8 sm:px-16 md:py-24 lg:px-20 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-16 left-[-50px] w-48 h-48 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-16 right-[-50px] w-48 h-48 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center">
        {/* Heading with Highlight */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-6 md:mb-8 relative">
          <span className="text-purple-600">Organize</span> and{" "}
          <span className="text-purple-600">Celebrate</span> Your Events
          Seamlessly
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-10 max-w-4xl leading-relaxed">
          Organize events, and create{" "}
          <span className="text-purple-600 font-semibold">
            unforgettable moments
          </span>
          . Join thousands of successful event organizers today!
        </p>

        {/* Trust Elements - Adjusted Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
          {[
            {
              icon: "/eventicon.svg",
              title: "10,000+ Events Hosted",
              text: "Join thousands of successful event organizers.",
            },
            {
              icon: "/shieldheart.svg",
              title: "Secure and Reliable",
              text: "Your events are safe with us.",
            },
            {
              icon: "/support.svg",
              title: "24/7 Customer Support",
              text: "We're always here to help.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-purple-100 p-6 rounded-xl shadow-md border border-purple-300 hover:shadow-lg transition-shadow w-full max-w-xs"
            >
              <div className="w-14 h-14 flex items-center justify-center bg-purple-200 rounded-full shadow-md">
                <img
                  src={item.icon}
                  className="w-10 h-10 object-contain"
                  alt={item.title}
                />
              </div>
              <h3 className="text-lg font-semibold mt-4 text-purple-900">
                {item.title}
              </h3>
              <p className="text-sm text-purple-700 mt-2">{item.text}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="w-full flex justify-center mt-12">
          <Link href={userId ? "/events/create" : "/sign-in"} passHref>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white py-4 px-10 rounded-full text-lg font-semibold transition-all duration-300 shadow-xl transform hover:scale-105">
              Organize Your First Event Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

{
  /* Right Side Visual */
}
{
  /* <div className="relative w-full lg:w-1/2 h-64 sm:h-80 md:h-96 lg:h-auto lg:min-h-[600px] mt-8 lg:mt-0">
  <Image
    src="/eventgheroimage.jpg"
    alt="Event Celebration"
    layout="fill"
    objectFit="cover"
    className="rounded-xl lg:rounded-2xl shadow-lg"
    priority
  />
</div> */
}

export default Hero;
