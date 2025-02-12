"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { createTicket } from "@/lib/actions/events.actions";

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

  return (
    <div>
      {event.title}
      <Button onClick={buyTickets} className="mt-4">
        Buy Ticket
      </Button>
    </div>
  );
};

export default Payment;
