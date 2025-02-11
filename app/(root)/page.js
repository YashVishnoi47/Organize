import Image from "next/image";
import Hero from "@/components/Hero";
import PixelCard from "@/components/SharedAnimatedComp/PixelCard";
import { gettAllEvents } from "@/lib/actions/events.actions";
import Collections from "@/components/Collections";

export default async function Home() {
  const events = await gettAllEvents({
    query: "",
    category: "",
    Limit: 6,
    page: 1,
  });

  return (
    <>
      <div className="w-full h-auto relative flex flex-col justify-center items-center">
        <Hero />
        <h1 className="text-4xl sm:text-5xl font-bold text-center leading-tight">
          Trusted by
        </h1>
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-8">
          Thousands of Events
        </h1>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search By Category"
          className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
        />
        
        <Collections
          data={events?.data}
          emptyTitle="No events Found"
          collectionType="All_Events"
          limit={6}
          page={1}
          totalPages={events.length}
        />
      </div>
    </>
  );
}
