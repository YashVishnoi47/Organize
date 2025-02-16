"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { createTicket } from "@/lib/actions/events.actions";
import { FiCalendar, FiDollarSign, FiMapPin } from "react-icons/fi";
import { formatDateTime } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CheckCircle, ShieldCheck } from "lucide-react";

const Payment = ({ event, userId }) => {
  const router = useRouter();

  // Creating Ticket.
  const buyTickets = async () => {
    try {
      const newTicket = await createTicket(userId, event);

      if (newTicket) {
        router.push("/profile");
      }
    } catch (error) {
      console.log("Ticket error", error);
    }
  };

  const [paymentMethod, setPaymentMethod] = useState("card");
  return (
    <div className="flex flex-col md:flex-row items-start justify-center min-h-screen p-6">
      {/* Event Details */}
      <div className="w-full md:w-2/3 p-6  rounded-2xl shadow-lg">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
        <h2 className="text-2xl font-bold text-purple-700 mt-4">
          {event.title}
        </h2>

        <div className="mt-4 space-y-6">
          {/* Event Date */}
          <div className="flex items-center gap-4">
            <FiCalendar className="text-2xl text-blue-500" />
            <span className="text-lg">
              {formatDateTime(event.startDateTime).dateTime}
            </span>
          </div>

          {/* Event Location */}
          <div className="flex items-center gap-4">
            <FiMapPin className="text-2xl text-red-500" />
            <span className="text-lg">{event.location}</span>
          </div>

          {/* Event Price */}
          <div className="flex items-center gap-4">
            <FiDollarSign className="text-2xl text-green-500" />
            <span className="text-lg">
              {event.price ? `$ ${event.price}` : "Free"}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Section */}
      <div className="w-full md:w-1/3 p-6 rounded-2xl shadow-lg mt-6 md:mt-0 md:ml-6 bg-white border border-gray-200">
        {/* Price & Limited Offer */}
        <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow">
          <p className="text-xl font-bold text-gray-900">
            Final Price: {event.price ? `$${event.price}` : "Free"}
          </p>
          {event.limitedSeats && (
            <span className="text-sm bg-red-500 text-white px-3 py-1 rounded-full font-semibold animate-pulse">
              Limited Seats Left!
            </span>
          )}
        </div>

        {/* Event Perks */}
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2 text-gray-700">
            <CheckCircle className="text-green-500 w-5 h-5" />
            <p className="text-sm font-medium">VIP Access & Front Row Seats</p>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <CheckCircle className="text-green-500 w-5 h-5" />
            <p className="text-sm font-medium">Exclusive Meet & Greet</p>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <CheckCircle className="text-green-500 w-5 h-5" />
            <p className="text-sm font-medium">Free Merchandise & Goodies</p>
          </div>
        </div>

        {/* Payment Security */}
        <div className="flex items-center justify-center gap-2 mt-8 text-sm text-gray-600">
          <ShieldCheck className="w-5 h-5 text-blue-600" />
          <p className="font-medium">100% Secure Payment</p>
        </div>

        {/* Purchase Button */}
        <AlertDialog>
          <AlertDialogTrigger className="mt-6 w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 text-lg rounded-lg font-semibold shadow-lg transition-all duration-200">
            Proceed to Buy
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-lg p-6 rounded-xl shadow-2xl border border-gray-200 bg-white">
            <AlertDialogHeader className="text-center">
              <AlertDialogTitle className="text-2xl font-bold text-gray-900">
                Final Payment
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600 mt-2 text-sm">
                Secure your spot now! Limited seats remaining. Once purchased,
                your ticket is confirmed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex justify-center gap-4 mt-4">
              <AlertDialogCancel className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-6 rounded-full font-medium transition-all">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-8 rounded-full font-semibold shadow-md hover:shadow-xl transition-all duration-200"
                onClick={buyTickets}
              >
                {event.price
                  ? `Pay $${event.price} Now`
                  : "Get Ticket for Free"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Payment;
