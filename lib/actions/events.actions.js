"use server";

import { revalidatePath } from "next/cache";
import { connectDb } from "../mongodb";
import Category from "../mongodb/models/Category.model";
import Event from "../mongodb/models/event.model";
import User from "../mongodb/models/user.model";
import { handleError } from "../utils";
const populateEvent = async (query) => {
  return query
    .populate({
      path: "organizer",
      model: User,
      select: "_id firstName lastName",
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
      console.log("Event not found");
    }

    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    console.error(error);
    handleError(error);
  }
};

// Function to get all the Events and Number of Events,
export const gettAllEvents = async ({ query, Limit = 6, page, category }) => {
  try {
    await connectDb();
    const conditions = {};

    const eventQuery = Event.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(0)
      .limit(Limit);

    const events = await populateEvent(eventQuery);
    const eventsCount = await Event.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / Limit),
    };
  } catch (error) {}
};

// Funtion to Delete the Event by its ID.
export const deleteEventbyId = async ({ eventId, path }) => {
  try {
    await connectDb();
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (deletedEvent) {
      revalidatePath(path);
    }
  } catch (error) {
    console.error(error);
  }
};

// Function to update a new Event.
export const updateEvent = async function ({ event, userId, path }) {
  try {
    await connectDb();

    const updatedEvent = await Event.findByIdAndUpdate(
      event._id,
      { ...event, category: event.categoryId },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedEvent));
  } catch (error) {
    console.log("Update Event Action", error);
    // handleError(error);
  }
};

export const getRelatedEventsByCategory = async function (
  categoryId,
  eventId,
  limit = 3,
  page = 1
) {
  try {
    await connectDb();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = {
      $and: [{ category: categoryId }, { _id: { $ne: eventId } }],
    };

    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const events = await populateEvent(eventsQuery);
    const eventsCount = await Event.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    console.log(error);
    // handleError(error);
  }
};
// Function to Get the Event By user.
export async function getEventsByUser({ userId, limit = 6, page }) {
  try {
    await connectDb()

    const conditions = { organizer: userId }
    const skipAmount = (page - 1) * limit

    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const events = await populateEvent(eventsQuery)
    const eventsCount = await Event.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit) }
  } catch (error) {
    handleError(error)
  }
};

