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
import { Button } from "./ui/button";
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

const Card = async ({ event, hasOrderLink, hidePrice }) => {
  const { sessionClaims } = await auth();
  const userId = sessionClaims?.publicMetadata.userId;
  const isEventOwner = userId === event.organizer._id.toString();

  return (
    <Link href={isEventOwner ? "#" :`/events/${event._id}`}>

    <div className="bg-white relative border flex-shrink-0 border-purple-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-purple-100 hover:scale-95 transition-all h-[530px] duration-300 max-w-lg">
      {/* Event Image */}
      <div className="relative h-56">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover rounded-t-2xl"
        />
        {isEventOwner && !hidePrice && (
          // <div className="flex gap-3 z-10 right-2 top-2 absolute">
          //   <Link href={`/events/create/${event._id}/update`}>
          //     <div className=" text-black hover:text-white bg-white flex justify-center items-center hover:bg-purple-400 p-2 rounded-xl font-medium transition-all duration-200 ease-in-out">
          //       <CiEdit className="text-2xl" />
          //     </div>
          //   </Link>
          //   <DeleteEventBtn event={event} />
          // </div>

          <div className="flex gap-3 z-10 right-2 top-2 absolute">
            <Link href={`/events/create/${event._id}/update`}>
              <div className=" text-black hover:text-white bg-white flex justify-center items-center hover:bg-purple-400 p-2 rounded-xl font-medium transition-all duration-200 ease-in-out">
                <CiEdit className="text-2xl" />
              </div>
            </Link>
            <DeleteEventBtn event={event} />
          </div>
        )}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-t-2xl"></div>
      </div>
      <Link key={event._id} href={userId ?`/events/${event._id}`:("/sign-in")}>
      {/* Event Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 line-clamp-2 mb-2">
          {event.title}
        </h3>
        <p className="text-white inline p-1 px-3 rounded-full bg-purple-400 text-center text-xs mb-4">
          {event.category ? event.category.name : "Category Not Available"}
        </p>
        {!hidePrice && (
          <span className="text-xs bg-red-400  ml-4 p-1 px-3 rounded-full text-white">
            ${event.price || " Free"}
          </span>
        )}

        {/* Event Details */}
        <div className="flex items-center mt-3 text-gray-600 text-sm mb-3">
          <FiCalendar className="mr-2 text-blue-500" />
          <span>{formatDateTime(event.startDateTime).dateTime}</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm mb-4">
          <FiMapPin className="mr-2 text-red-500" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm mb-4">
          <CiUser className="mr-2 text-red-500" />
          <span>
            {event.organizer.firstName}
            {event.organizer.lastName}
          </span>
        </div>

        {/* Action Section */}
        <div className="flex justify-start gap-4 items-center">
          {!isEventOwner ? (
            <Link
              href={userId ? `/checkout/${event._id}` : "/sign-in"}
              className="bg-gradient-to-r from-purple-500 to-purple-800 text-white py-2 px-8 rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Buy Now
            </Link>
          ) : (
            <Button
              // href={`/checkout/${event._id}`}
              disabled
              className="bg-gradient-to-d from-purple-500 to-purple-800 text-white py-2 px-8 rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Buy Now
            </Button>
          )}
        </div>
      </div>
      
      </Link>
    </div>
    </Link>
  );
};

export default Card;
