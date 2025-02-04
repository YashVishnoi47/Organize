"use server";

import { connectDb } from "../mongodb";
import User from "../mongodb/models/user.model";
import { handleError } from "../utils";

export const createEvent = async function ({ event, userId, path }) {
  try {
    await connectDb();
    const organizer = await User.findById(userId);

    if (!organizer) throw new Error("User not found");

    const newEvent = await Event.create({
      ...event,
      categoryId: event.categoryId,
      organizer: userId,
    });

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    // handleError(error);
    console.log(error)
  }
};
