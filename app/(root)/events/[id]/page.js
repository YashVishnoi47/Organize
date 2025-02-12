import {
  getEventById,
  getRelatedEventsByCategory,
} from "@/lib/actions/events.actions";
import Image from "next/image";
import React from "react";
import { FiMapPin, FiCalendar, FiDollarSign } from "react-icons/fi";
import { FaExternalLinkAlt } from "react-icons/fa";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";
import Collections from "@/components/Collections";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";

const EventPage = async ({ params: { id }, searchParams }) => {
  const { sessionClaims } = await auth();
  const userId = sessionClaims?.publicMetadata.userId;
  const event = await getEventById(id);
  const relatedEvents = await getRelatedEventsByCategory(
    event.category._id,
    event._id,
    searchParams.page
  );

  const isEventOwner = userId === event.organizer._id.toString();

  return (
    <div className="w-full min-h-screen bg-gray-50 text-black">
      <div className="max-w-7xl mx-auto p-8 flex flex-col lg:flex-row items-stretch gap-8">
        {/* Left: Event Image */}
        <div className="relative w-full lg:w-2/5 h-80 lg:h-auto overflow-hidden rounded-xl shadow-md">
          <Image
            src={event.imageUrl}
            alt="Event Banner"
            layout="fill"
            className="object-cover"
          />
        </div>

        {/* Right: Event Details */}
        <div className="flex-1 bg-white p-8 rounded-xl shadow-md">
          <h1
            title={event.title}
            className="text-4xl line-clamp-2 font-bold text-gray-800"
          >
            {event.title}
          </h1>
          <p className="mt-4 mb-2 text-gray-600 text-lg">{event.discription}</p>

          <p className="text-white inline mt-7 p-1 px-3 rounded-full bg-purple-400 text-center text-xs">
            {event.category.name}
          </p>

          <div className="mt-6 space-y-6">
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

            {/* Event Link */}
            {event.url && (
              <div className="flex items-center gap-4">
                <FaExternalLinkAlt className="text-2xl text-green-500" />
                <Link
                  className="text-lg hover:text-purple-500 transition-all duration-200 ease-in-out"
                  href={event.url}
                >
                  Let's Go
                </Link>
                {/* <span className="text-lg">{event.url}</span> */}
              </div>
            )}
          </div>
          {!isEventOwner ? (
            <Link href={`/checkout/${event._id}`}>
              <button className="mt-8 w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 px-8 rounded-full text-lg font-bold shadow-lg hover:opacity-90 transition-opacity">
                Buy Ticket Now
              </button>
            </Link>
          ) : (
            <Button disabled className="mt-8 w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 px-8 rounded-full text-lg font-bold shadow-lg hover:opacity-90 transition-opacity">
              Buy Ticket Now
            </Button>
          )}
        </div>
      </div>

      <Collections
        data={relatedEvents?.data}
        emptyTitle="No events Found"
        collectionType="All_Events"
        limit={6}
        page={1}
        totalPages={2}
      />
    </div>
  );
};

export default EventPage;
