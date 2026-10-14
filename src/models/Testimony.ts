import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITestimony extends Document {
  name: string;
  email?: string;
  location: string;
  testimony: string;
  imageURL?: string;
  videoURL?: string;
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonySchema: Schema<ITestimony> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
      maxlength: [120, "Location cannot exceed 120 characters"],
    },
    testimony: {
      type: String,
      required: [true, "Testimony text is required"],
      trim: true,
      maxlength: [4000, "Testimony text is too long"],
    },
    imageURL: {
      type: String,
      trim: true,
    },
    videoURL: {
      type: String,
      trim: true,
    },
    approved: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model recompilation error in Next.js hot reload
const Testimony: Model<ITestimony> =
  mongoose.models.Testimony ||
  mongoose.model<ITestimony>("Testimony", TestimonySchema);

export default Testimony;
