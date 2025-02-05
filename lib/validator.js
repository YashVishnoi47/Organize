import { z } from "zod";

export const eventFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  discription: z
    .string()
    .min(10, { message: "Discription must be at least 10 characters long." })
    .max(500, { message: "Discription must be at least 500 characters long." }),
  location: z
    .string()
    .min(2, { message: "Discription must be at least 2 characters long." })
    .max(200, { message: "Discription must be at least 200 characters long." }),
  imageUrl: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url(),
});
