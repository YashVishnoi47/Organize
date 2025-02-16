import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaUsers, FaStar, FaCalendarCheck } from "react-icons/fa";

export default function AboutUs() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center px-4 py-10 md:px-20 text-gray-900">
      {/* Header Section */}
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-purple-700">
          About Us
        </h1>
        <p className="text-lg md:text-xl text-gray-700">
          Welcome to Organize – your go-to platform for discovering and managing
          amazing events seamlessly.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 w-full max-w-5xl">
        <div className="p-6 text-center shadow-lg border border-purple-300 bg-white rounded-xl hover:shadow-2xl transition">
          <div className="flex flex-col items-center">
            <FaUsers className="text-5xl text-purple-700 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Community Driven</h2>
            <p className="text-gray-600">
              Join a growing community of event enthusiasts.
            </p>
          </div>
        </div>
        <div className="p-6 text-center shadow-lg border border-purple-300 bg-white rounded-xl hover:shadow-2xl transition">
          <div className="flex flex-col items-center">
            <FaStar className="text-5xl text-yellow-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Top-Rated Events</h2>
            <p className="text-gray-600">
              Find the best events curated just for you.
            </p>
          </div>
        </div>
        <div className="p-6 text-center  shadow-lg border border-purple-300 bg-white rounded-xl hover:shadow-2xl transition">
          <div className="flex flex-col items-center">
            <FaCalendarCheck className="text-5xl text-green-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Seamless Booking</h2>
            <p className="text-gray-600">
              Easily book and manage your events in one place.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-10 text-center">
        <h3 className="text-2xl font-semibold mb-3">
          Start Exploring Events Today!
        </h3>
        <Link className="" href="/">
          <Button className="bg-purple-700 mt-2 hover:bg-purple-800 text-white px-6 py-3 rounded-full text-lg shadow-md">
            Browse Events
          </Button>
        </Link>
      </div>
    </div>
  );
}
