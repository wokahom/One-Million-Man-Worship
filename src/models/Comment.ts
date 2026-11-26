import mongoose, { Schema, Document, Model } from "mongoose";

export interface IComment extends Document {
  postId: mongoose.Types.ObjectId;
  postSlug: string;
  authorName: string;
  authorEmail: string;
  content: string;
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    postSlug: { type: String, required: true, trim: true },
    authorName: { type: String, required: true, trim: true },
    authorEmail: { type: String, required: true, lowercase: true, trim: true },
    content: { type: String, required: true, trim: true },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Comment: Model<IComment> =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;
