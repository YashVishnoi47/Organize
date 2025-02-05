"use server";

import { connectDb } from "../mongodb";
import Category from "../mongodb/models/Category.model";
import Event from "../mongodb/models/event.model";
import User from "../mongodb/models/user.model";
import { handleError } from "../utils";
// http://localhost:3000/events/67a34be9cb808b35886e70c7

const populateEvent = async (query) => {
  return query
    .populate({
      path: "organizer",
      model: User,
      select: "_id first_name last_name",
    })
    .populate({ path: "category", model: Category, select: "_id name" });
};

// Function to create a new Event.
export const createEvent = async function ({ event, userId, path }) {
  try {
    await connectDb();
    const organizer = await User.findById(userId);

    if (!organizer) throw new Error("User not found");

    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organizer: userId,
    });
    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
};

// Function to get the Event by its ID and populate them.
export const getEventById = async (eventId) => {
  try {
    await connectDb();

    const event = await populateEvent(Event.findById(eventId));

    if (!event) {
      throw new Error("Event not found");
    }

    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    console.error(error);
    handleError(error);
  }
};
