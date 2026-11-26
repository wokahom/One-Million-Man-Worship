import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVolunteer extends Document {
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  location: string;
  department: string;
  experience?: string;
  availability: string;
  status: "pending" | "reviewed" | "approved" | "assigned";
  edition: string;
  createdAt: Date;
  updatedAt: Date;
}

const VolunteerSchema = new Schema<IVolunteer>(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    gender: { type: String, required: true, enum: ["Male", "Female", "Prefer not to say"] },
    location: { type: String, required: true, trim: true },
    department: {
      type: String,
      required: true,
      enum: [
        "Protocol & Guest Relations",
        "Ushering & Crowd Management",
        "Mass Choir & Vocalists",
        "Media, Photography & Live Broadcast",
        "Medical & First Aid Response",
        "Security & Traffic Coordination",
        "Transportation & Shuttle Logistics",
        "Intercessory & Prayer Team",
        "Technical, Stage & Sound",
        "Sanitation & Venue Maintenance",
      ],
    },
    experience: { type: String, trim: true },
    availability: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "reviewed", "approved", "assigned"],
      default: "pending",
    },
    edition: { type: String, default: "2026" },
  },
  { timestamps: true }
);

const Volunteer: Model<IVolunteer> =
  mongoose.models.Volunteer ||
  mongoose.model<IVolunteer>("Volunteer", VolunteerSchema);

export default Volunteer;
