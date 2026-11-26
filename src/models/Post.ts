import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: "Announcement" | "Article" | "Recap" | "News" | "Devotional";
  author: string;
  authorRole?: string;
  tags: string[];
  published: boolean;
  publishedAt?: Date;
  views: number;
  commentsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    coverImage: { type: String, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["Announcement", "Article", "Recap", "News", "Devotional"],
      default: "News",
    },
    author: { type: String, required: true, default: "1MMW Editorial Team" },
    authorRole: { type: String, default: "Media Team" },
    tags: [{ type: String, trim: true }],
    published: { type: Boolean, default: true },
    publishedAt: { type: Date, default: Date.now },
    views: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

export default Post;
