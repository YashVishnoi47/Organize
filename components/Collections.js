import React from "react";
import Card from "./Card";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";

const Collections = ({
  data = [],
  emptyTitle = "No Events Available",
  collectionType,
}) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.publicMetadata.userId;
  return (
    <div className="w-full min-h-screen flex flex-col items-center px-4 py-10">
      {/* Events List */}
      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4 max-w-6xl">
          {data.map((event) => {
            const hasOrderLink = collectionType === "Evnets_Organized";
            const hidePrice = collectionType === "My-Tickets";
            return (
              <Link key={event._id} href={userId ?`/events/${event._id}`:("/sign-in")}>
                <li className="list-none">
                  <Card
                    event={event}
                    hasOrderLink={hasOrderLink}
                    hidePrice={hidePrice}
                  />
                </li>
              </Link>
            );
          })}
        </div>
      ) : (
        <h3 className="text-lg text-gray-500 mt-10">
          <div className="flex flex-col items-center select-none justify-center gap-8">
            {" "}
            <Image
              src="/no data found.svg"
              width={300}
              height={300}
              alt="No Data Found"
            />
            {emptyTitle}
          </div>
        </h3>
      )}
    </div>
  );
};

export default Collections;
