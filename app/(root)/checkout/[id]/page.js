import Payment from "@/components/Payment";
import { Button } from "@/components/ui/button";
import { getEventById } from "@/lib/actions/events.actions";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const Checkout = async ({ params: { id } }) => {
  const event = await getEventById(id);
  const {sessionClaims } = auth();
  const userId = sessionClaims?.publicMetadata?.userId;
  
 
  return (
    <div className="w-full min-h-screen bg-gray-50 text-black">
      <Payment event={event} userId={userId}/>
    </div>
  );
};

export default Checkout;
