import React from "react";
import EventForm from "@/components/EventForm";
import { auth } from "@clerk/nextjs/server";
import { getEventById } from "@/lib/actions/events.actions";

const updateEvent = async ({ params: { id } }) => {
  const { userId } = auth();
  const userid = userId?.userId;

  const event = await getEventById(id);
  const eventId = event._id;
  // console.log(event._id);

  return (
    <>
      <div className="w-full h-20 bg-gray-200 text-black flex justify-center items-center">
        <h3>Update Event</h3>
      </div>

      <EventForm event={event} type="Update" eventId={eventId} userId={userid} />
    </>
  );
};

export default updateEvent;
