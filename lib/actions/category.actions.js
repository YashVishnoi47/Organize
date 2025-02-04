"use server";

import { connectDb } from "../mongodb";
import Category from "../mongodb/models/Category.model";
import { handleError } from "../utils";

// Function to create Category
export const createCatagory = async ({ categoryName }) => {
  try {
    await connectDb();

    const newCatagory = await Category.create({ name: categoryName });

    return JSON.parse(JSON.stringify(newCatagory));
  } catch (error) {
    handleError(error);
  }
};
// Function to Fetch all the Categories
export const allCategories = async () => {
  try {
    await connectDb();

    const category = await Category.find();

    return JSON.parse(JSON.stringify(category));
  } catch (error) {
    handleError(error);
  }
};
