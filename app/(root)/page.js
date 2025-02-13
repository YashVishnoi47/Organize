import Image from "next/image";
import Hero from "@/components/Hero";
import PixelCard from "@/components/SharedAnimatedComp/PixelCard";
import { gettAllEvents } from "@/lib/actions/events.actions";
import Collections from "@/components/Collections";
import SelectCategory from "@/components/SelectCategory";

export default async function Home({ searchParams }) {
  const page = Number(searchParams?.page) || 1;
  const searchText = searchParams?.query || "";
  const category = searchParams?.categoryName || "";

  const events = await gettAllEvents({
    query: searchText,
    category,
    page,
    Limit: 6,
  });

  return (
    <>
      <div className="w-full h-auto relative flex flex-col justify-center items-center">
        <Hero />
        <SelectCategory />

        <Collections
          data={events?.data}
          emptyTitle="No events Found"
          collectionType="All_Events"
          limit={6}
          page={1}
          totalPages={events?.length}
        />
      </div>
    </>
  );
}
