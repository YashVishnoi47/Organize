import React from "react";
import Image from "next/image";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import { CiUser } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { deleteEventbyId } from "@/lib/actions/events.actions";
import DeleteEventBtn from "./DeleteEventBtn";

const TicketCard = async ({ event, hasOrderLink, hidePrice }) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.publicMetadata.userId;

  return (
    <div className="max-w-lg mx-auto hover:scale-105 transition-all duration-300 bg-white border-2 border-dotted border-black rounded-xl shadow-md relative overflow-hidden">

  {/* Ticket Header */}
  <div className="bg-purple-400 text-white p-4 text-center">
    <h2 className="text-3xl font-bold uppercase tracking-widest">Movie Ticket</h2>
  </div>

  {/* Ticket Content */}
  <div className="p-6 flex bg-purple-100 justify-between items-center">
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-1">{event.eventId.title}</h3>
      <p className="text-sm text-gray-600">{event.eventId.location}</p>
      <div className="mt-2 flex items-center  text-gray-600">
        <FiCalendar className="mr-2 text-blue-500" />
        <span>{formatDateTime(event.eventId.startDateTime).dateTime}</span>
      </div>
    </div>
    <span className="bg-red-500  text-white py-1 px-4 rounded-full text-lg font-bold">
      ${event.eventId.price || "Free"}
    </span>
  </div>

  {/* Divider */}
  <div className="border-t border-black mx-4"></div>

  {/* Barcode Section */}
  <div className="p-4 bg-purple-100 flex justify-between items-center">
    <div className="text-gray-600 text-xs">
      <p>Admit One</p>
      <p>Non-transferable</p>
    </div>
    <div className="h-12 w-48 bg-gray-200 flex items-center justify-center">
      <div className="h-full w-[90%] bg-gradient-to-r from-black to-transparent"></div>
    </div>
  </div>
</div>

  );
};

export default TicketCard;
