import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Edition from "@/models/Edition";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    const edition = await Edition.findById(id).lean();
    if (!edition) {
      return NextResponse.json(
        { success: false, error: "Edition not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: edition });
  } catch (err: unknown) {
    console.error("GET /api/editions/[id] error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch edition" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    await connectDB();

    const updated = await Edition.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Edition not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Edition updated successfully!",
      data: updated,
    });
  } catch (err: unknown) {
    console.error("PUT /api/editions/[id] error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to update edition" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    const deleted = await Edition.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Edition not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Edition deleted successfully!",
    });
  } catch (err: unknown) {
    console.error("DELETE /api/editions/[id] error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to delete edition" },
      { status: 500 }
    );
  }
}
