import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEdition extends Document {
  year: string;
  theme: string;
  editionNumber: string;
  dates: string;
  venue: string;
  attendance?: string;
  description: string;
  ministers: string[];
  highlights: string[];
  mediaPhotos: string[];
  mediaVideos: { title: string; url: string; platform?: string }[];
  programs?: string[];
  bannerUrl?: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EditionSchema = new Schema<IEdition>(
  {
    year: { type: String, required: true, unique: true, trim: true },
    theme: { type: String, required: true, trim: true },
    editionNumber: { type: String, required: true, trim: true }, // e.g. "1st Edition", "4th Edition"
    dates: { type: String, required: true, trim: true },
    venue: { type: String, required: true, trim: true },
    attendance: { type: String, trim: true },
    description: { type: String, required: true, trim: true },
    ministers: [{ type: String, trim: true }],
    highlights: [{ type: String, trim: true }],
    mediaPhotos: [{ type: String, trim: true }],
    mediaVideos: [
      {
        title: { type: String, required: true, trim: true },
        url: { type: String, required: true, trim: true },
        platform: { type: String, default: "youtube" },
      },
    ],
    programs: [{ type: String, trim: true }],
    bannerUrl: { type: String, trim: true },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Edition: Model<IEdition> =
  mongoose.models.Edition || mongoose.model<IEdition>("Edition", EditionSchema);

export default Edition;
