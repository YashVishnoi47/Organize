import { auth } from "@clerk/nextjs/server";
import React from "react";
import { getEventsByUser } from "@/lib/actions/events.actions";
import Collections from "@/components/Collections";

const Profile = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.publicMetadata?.userId;
  const OrganizedEvents = await getEventsByUser({ userId, page: 1 });

  return (
    <div className="min-h-screen w-full py-10 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Profile Header */}
        <div className="relative text-center">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-2">Profile</h1>
          <p className="text-lg text-gray-600">
            Manage your organized events and check your tickets.
          </p>
        </div>

        {/* Organized Events Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Organized Events</h2>
          <div className="bg-white rounded-xl shadow-lg p-6">
            {OrganizedEvents?.data?.length > 0 ? (
              <Collections
                data={OrganizedEvents.data}
                emptyTitle="No events organized yet!"
                collectionType="Organized_Events"
                limit={3}
                page={1}
                totalPages={OrganizedEvents.length}
              />
            ) : (
              <p className="text-gray-600">No events organized yet!</p>
            )}
          </div>
        </section>

        {/* Tickets Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Tickets</h2>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <Collections
              data={OrganizedEvents?.data} // Dummy data; replace with actual ticket data.
              emptyTitle="No tickets found!"
              collectionType="Tickets"
              limit={3}
              page={1}
              totalPages={OrganizedEvents.length}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
