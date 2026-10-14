import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";

interface Params {
  params: Promise<{ id: string }>;
}

/**
 * PATCH /api/contact/[id]
 * Body: { status: "new" | "read" | "replied" | "archived" }
 */
export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const validStatuses = ["new", "read", "replied", "archived"];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          error: `Status must be one of: ${validStatuses.join(", ")}`,
        },
        { status: 400 }
      );
    }

    await connectDB();

    const updated = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Message not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Message status updated to ${status}.`,
      data: updated,
    });
  } catch (err: unknown) {
    console.error("PATCH /api/contact/[id] error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to update message." },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/contact/[id]
 */
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    await connectDB();

    const deleted = await Contact.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Message not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message deleted successfully.",
    });
  } catch (err: unknown) {
    console.error("DELETE /api/contact/[id] error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to delete message." },
      { status: 500 }
    );
  }
}
