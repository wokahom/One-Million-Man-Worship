import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGalleryItem extends Document {
  title: string;
  src: string;
  year: string;
  category: "ministers" | "worship" | "crowd" | "logistics";
  description?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryItemSchema = new Schema<IGalleryItem>(
  {
    title: { type: String, required: true, trim: true },
    src: { type: String, required: true, trim: true },
    year: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["ministers", "worship", "crowd", "logistics"],
      default: "worship",
    },
    description: { type: String, trim: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const GalleryItem: Model<IGalleryItem> =
  mongoose.models.GalleryItem ||
  mongoose.model<IGalleryItem>("GalleryItem", GalleryItemSchema);

export default GalleryItem;
