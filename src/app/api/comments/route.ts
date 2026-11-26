import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Comment from "@/models/Comment";
import Post from "@/models/Post";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postSlug = searchParams.get("postSlug");
    const approvedOnly = searchParams.get("approvedOnly") === "true";

    await connectDB();

    const query: Record<string, unknown> = {};
    if (postSlug) query.postSlug = postSlug;
    if (approvedOnly) query.approved = true;

    const comments = await Comment.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      data: comments,
      count: comments.length,
    });
  } catch (err: unknown) {
    console.error("GET /api/comments error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch comments", data: [] },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postId, postSlug, authorName, authorEmail, content } = body;

    if (!postId || !postSlug || !authorName || !authorEmail || !content) {
      return NextResponse.json(
        { success: false, error: "All comment fields are required." },
        { status: 400 }
      );
    }

    await connectDB();

    const newComment = await Comment.create({
      postId,
      postSlug,
      authorName: authorName.trim(),
      authorEmail: authorEmail.trim().toLowerCase(),
      content: content.trim(),
      approved: false, // Requires moderation
    });

    // Increment commentsCount on Post
    await Post.findByIdAndUpdate(postId, { $inc: { commentsCount: 1 } });

    return NextResponse.json(
      {
        success: true,
        message: "Your comment has been submitted and is awaiting administrator approval.",
        data: newComment,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("POST /api/comments error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to submit comment." },
      { status: 500 }
    );
  }
}
