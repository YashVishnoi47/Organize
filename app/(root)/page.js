import Image from "next/image";
import Hero from "@/components/Hero";
import PixelCard from "@/components/SharedAnimatedComp/PixelCard";
import { gettAllEvents } from "@/lib/actions/events.actions";
import Collections from "@/components/Collections";

export default async function Home() {
  const events = await gettAllEvents({
    query: '',
    category: '',
    Limit: 6,
    page: 1,
  });

  return (
    <>
    <div className="w-full h-auto relative flex flex-col justify-center items-center">
      <Hero />

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
