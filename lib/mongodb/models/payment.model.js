import { Schema, model, models } from "mongoose";

const paymentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const payment = models.payment || model("payment", paymentSchema);

export default payment;
