import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Prayer from "@/models/Prayer";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    await connectDB();

    const query: Record<string, unknown> = {};
    if (category && category !== "all") query.category = category;

    const prayers = await Prayer.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      data: prayers,
      count: prayers.length,
    });
  } catch (err: unknown) {
    console.error("GET /api/prayer error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve prayer requests", data: [] },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, category, request: reqText, isAnonymous } = body;

    if (!category || !reqText) {
      return NextResponse.json(
        { success: false, error: "Category and prayer request details are required." },
        { status: 400 }
      );
    }

    await connectDB();

    const newPrayer = await Prayer.create({
      name: isAnonymous ? "Anonymous" : (name ? name.trim() : "Anonymous"),
      email: isAnonymous ? undefined : (email ? email.trim().toLowerCase() : undefined),
      phone: isAnonymous ? undefined : (phone ? phone.trim() : undefined),
      category,
      request: reqText.trim(),
      isAnonymous: Boolean(isAnonymous),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your prayer request has been received. Our dedicated intercessory team is lifting your petition before the throne of grace.",
        data: newPrayer,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("POST /api/prayer error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to submit prayer request. Please try again." },
      { status: 500 }
    );
  }
}
