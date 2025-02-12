import { Schema, model, models } from "mongoose";

const ticketSchema = new Schema({
  ticketName: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now() },
});

const ticket = models.ticket || model("ticket", ticketSchema);

export default ticket;
