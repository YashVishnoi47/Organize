"use client";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Search = () => {
  const [query, setquery] = useState("");
  const searParams = useSearchParams();
  const router = useRouter();

// Debounce Search 
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      let newUrl = "";
      if (query) {
        newUrl = formUrlQuery({
          params: searParams.toString(),
          key: "query",
          value: query,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searParams.toString(),
          keysToRemove: ["query"],
        });
      }

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query, searParams, router]);

  return (
    <div className="relative w-full flex max-w-lg">
      <input
        type="text"
        onChange={(e) => setquery(e.target.value)}
        placeholder="Search for events, venues, or organizers..."
        className="w-full h-14 pl-5 pr-16 rounded-full border border-purple-300 shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all"
      />
      <Link href="/search">
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-purple-500 p-3 rounded-full hover:bg-purple-600 transition-all">
          <Image
            className="fill-white"
            src="/search.svg"
            width={20}
            height={20}
            alt="Search"
          />
        </div>
      </Link>
    </div>
  );
};

export default Search;
