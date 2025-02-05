import React from "react";
import EventForm from "@/components/EventForm";
import { auth } from "@clerk/nextjs/server";

const updateEvent = async () => {
  const { userId } = await auth();
  const userid = userId?.userId;
  console.log(userId);

  return (
    <>
      <div className="w-full h-20 bg-gray-200 text-black flex justify-center items-center">
        <h3>Create Event</h3>
      </div>

      <EventForm type="update" userId={userid} />
    </>
  );
};

export default updateEvent;
