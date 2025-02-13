"use client";
import { allCategories } from "@/lib/actions/category.actions";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Search from "./Search";

const SelectCategory = () => {
  const [categories, setcategories] = useState([]);

  const [category, setCategory] = useState("");
  const searParams = useSearchParams();
  const router = useRouter();

  // Fetching categories
  useEffect(() => {
    const getAllCategories = async function () {
      const categoriesList = await allCategories();

      categoriesList && setcategories(categoriesList);
    };

    getAllCategories();
  }, []);

  // Handling Category Click.
  const handleCategoryClick = (categoryName) => {
    let newUrl = "";

    if (categoryName && categoryName !== "ALL") {
      newUrl = formUrlQuery({
        params: searParams.toString(),
        key: "categoryName",
        value: categoryName,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searParams.toString(),
        keysToRemove: ["categoryName"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="w-full flex flex-col items-center px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-5xl font-bold text-center leading-tight">
        Trusted by
      </h1>
      <h1 className="text-3xl sm:text-5xl font-bold text-center mb-6 sm:mb-8">
        Thousands of Events
      </h1>

      <Search />

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center mt-4 gap-3 sm:gap-4">
        <button
          className="px-5 py-2 border border-gray-300 rounded-full text-gray-700 bg-white hover:bg-purple-500 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-purple-500"
          onClick={() => handleCategoryClick("ALL")}
        >
          All
        </button>
        {categories.length > 0 &&
          categories.map((category) => (
            <button
              key={category._id}
              className="px-5 py-2 border border-gray-300 rounded-full text-gray-700 bg-white hover:bg-purple-500 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-purple-500"
              onClick={() =>
                handleCategoryClick(category.name) && setCategory(category.name)
              }
            >
              {category.name}
            </button>
          ))}
      </div>
    </div>
  );
};

export default SelectCategory;
