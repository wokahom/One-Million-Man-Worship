import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPrayer extends Document {
  name?: string;
  email?: string;
  phone?: string;
  category: string;
  request: string;
  isAnonymous: boolean;
  status: "received" | "prayed" | "archived";
  createdAt: Date;
  updatedAt: Date;
}

const PrayerSchema = new Schema<IPrayer>(
  {
    name: { type: String, trim: true, default: "Anonymous" },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    category: {
      type: String,
      required: true,
      enum: [
        "Healing & Divine Health",
        "Financial Breakthrough & Employment",
        "Family & Fruit of the Womb",
        "Spiritual Growth & Deliverance",
        "Academic & Career Success",
        "Peace & Progress in Nigeria",
        "Special Intention",
      ],
    },
    request: { type: String, required: true, trim: true },
    isAnonymous: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["received", "prayed", "archived"],
      default: "received",
    },
  },
  { timestamps: true }
);

const Prayer: Model<IPrayer> =
  mongoose.models.Prayer || mongoose.model<IPrayer>("Prayer", PrayerSchema);

export default Prayer;
