"use client";

import { deleteEventbyId } from "@/lib/actions/events.actions";
import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { usePathname } from "next/navigation";

const DeleteEventBtn = ({ event, path }) => {
  const pathname = usePathname();
  const eventId = event._id;
  return (
    <div className="z-50">
      <button
        onClick={async () => {
          await deleteEventbyId({ eventId, path: pathname });
        }}
        className=" text-black hover:text-white bg-white flex justify-center items-center hover:bg-purple-400 p-2 rounded-xl font-medium transition-all duration-200 ease-in-out"
      >
        <MdDeleteOutline className="text-2xl" />
      </button>
    </div>
  );
};

export default DeleteEventBtn;
