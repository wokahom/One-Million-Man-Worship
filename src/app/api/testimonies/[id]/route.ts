import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Testimony from "@/models/Testimony";

interface Params {
  params: Promise<{ id: string }>;
}

/**
 * PATCH /api/testimonies/[id]
 * Body: { approved: boolean }
 */
export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { approved } = body;

    if (typeof approved !== "boolean") {
      return NextResponse.json(
        { success: false, error: "The 'approved' field must be a boolean." },
        { status: 400 }
      );
    }

    await connectDB();

    const updated = await Testimony.findByIdAndUpdate(
      id,
      { approved },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Testimony not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: approved ? "Testimony approved!" : "Testimony unapproved.",
      data: updated,
    });
  } catch (err: unknown) {
    console.error("PATCH /api/testimonies/[id] error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to update testimony." },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/testimonies/[id]
 */
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    await connectDB();

    const deleted = await Testimony.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Testimony not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Testimony deleted successfully.",
    });
  } catch (err: unknown) {
    console.error("DELETE /api/testimonies/[id] error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to delete testimony." },
      { status: 500 }
    );
  }
}
