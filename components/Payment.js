"use client";
import React from "react";
import { Button } from "./ui/button";
import { buyTicket } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

const Payment = ({ event, userId }) => {
  const router = useRouter();

  const buyTickets = async () => {
    try {
      const Ticket = await buyTicket({ userId, eventId: event._id });

      if (Ticket) {
        router.push("/profile");
      }
    } catch (error) {
      console.log("Payment error",error);
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
