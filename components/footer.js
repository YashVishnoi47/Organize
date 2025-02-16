import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-purple-700 text-white py-8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Section - Company Info */}
          <div className="flex flex-col items-start">
            <h3 className="text-xl font-bold">Your Company</h3>
            <p className="text-gray-300 mt-2">
              A short description about your company.
            </p>

            <Link
              href={"/contact"}
              className="mt-4 px-4 py-2  bg-white text-purple-700 font-semibold rounded-lg hover:bg-purple-600 hover:text-white transition"
            >
              Contact Us
            </Link>
          </div>

          {/* Middle Section - Quick Links */}
          <div>
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Right Section - Legal & Social Media */}
          <div>
            <h3 className="text-xl font-bold">Legal</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Cookie Policy
                </a>
              </li>
            </ul>

            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-white text-2xl">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white text-2xl">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white text-2xl">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 text-center text-gray-300">
          <p>
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
