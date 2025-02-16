import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-6 py-12  dark:bg-gray-900">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center">
          Contact Us
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
          Have questions or need support? Reach out to us anytime.
        </p>

        {/* Contact Info */}
        <div className="mt-8 space-y-6">
          {/* Email */}
          <div className="flex items-center gap-4">
            <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <Link
              href="mailto:support@yourwebsite.com"
              className="text-lg font-medium text-gray-900 dark:text-white hover:underline"
            >
              support@yourwebsite.com
            </Link>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-4">
            <Phone className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <Link
              href="tel:+1234567890"
              className="text-lg font-medium text-gray-900 dark:text-white hover:underline"
            >
              +1 234 567 890
            </Link>
          </div>

          {/* Location */}
          <div className="flex items-center gap-4">
            <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              123 Main Street, New York, NY 10001
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mt-8">
          <Link
            href="https://twitter.com/yourhandle"
            target="_blank"
            className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            <FaTwitter className="text-2xl" />
          </Link>
          <Link
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            <FaLinkedin className="text-2xl" />
          </Link>
          <Link
            href="https://instagram.com/yourprofile"
            target="_blank"
            className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            <FaInstagram className="text-2xl" />
          </Link>
        </div>
      </div>
    </div>
  );
}
