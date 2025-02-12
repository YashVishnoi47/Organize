import { auth } from "@clerk/nextjs/server";
import React from "react";
import {
  getEventsByUser,
  getTicketByUserId,
} from "@/lib/actions/events.actions";
import Collections from "@/components/Collections";
import Link from "next/link";
import Card from "@/components/Card";
import TicketCard from "@/components/TicketCard";

const Profile = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.publicMetadata?.userId;
  const OrganizedEvents = await getEventsByUser({ userId, page: 1 });
  const tickets = await getTicketByUserId(userId);
  const data = tickets;

  return (
    <div className="min-h-screen w-full py-10 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Profile Header */}
        <div className="relative text-center">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-2">
            Profile
          </h1>
          <p className="text-lg text-gray-600">
            Manage your organized events and check your tickets.
          </p>
        </div>

        {/* Organized Events Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Your Organized Events
          </h2>
          <div className="bg-white rounded-xl shadow-lg p-6">
            {OrganizedEvents?.data?.length > 0 ? (
              <Collections
                data={OrganizedEvents?.data}
                emptyTitle="No events organized yet!"
                collectionType="Organized_Events"
                limit={3}
                page={1}
                totalPages={OrganizedEvents?.length}
              />
            ) : (
              <p className="text-gray-600">No events organized yet!</p>
            )}
          </div>
        </section>

        {/* Tickets Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Your Tickets
          </h2>
          <div className="bg-white rounded-xl shadow-lg p-6">
            {data.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4 max-w-6xl">
                {data.map((ticket) => {
                  // const hasOrderLink = collectionType === "Events_Organized";
                  // const hidePrice = collectionType === "My-Tickets";
                  return (
                    <div key={ticket._id}>
                      <li className="list-none">
                        <TicketCard event={ticket} />
                      </li>
                    </div>
                  );
                })}
              </div>
            ) : (
              <h3 className="text-lg text-gray-500 mt-10">{emptyTitle}</h3>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
