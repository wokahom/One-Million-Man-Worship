import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Volunteer from "@/models/Volunteer";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const department = searchParams.get("department");
    const status = searchParams.get("status");

    await connectDB();

    const query: Record<string, unknown> = {};
    if (department && department !== "all") query.department = department;
    if (status && status !== "all") query.status = status;

    const volunteers = await Volunteer.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      data: volunteers,
      count: volunteers.length,
    });
  } catch (err: unknown) {
    console.error("GET /api/volunteers error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve volunteers", data: [] },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, phone, gender, location, department, experience, availability } = body;

    if (!fullName || !email || !phone || !gender || !location || !department || !availability) {
      return NextResponse.json(
        { success: false, error: "Please fill out all required volunteer fields." },
        { status: 400 }
      );
    }

    await connectDB();

    const newVolunteer = await Volunteer.create({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      gender,
      location: location.trim(),
      department,
      experience: experience ? experience.trim() : undefined,
      availability,
      edition: "2026",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for registering to volunteer for One Million Man Worship 2026! Our department coordinator will reach out to you.",
        data: newVolunteer,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("POST /api/volunteers error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to submit registration. Please try again." },
      { status: 500 }
    );
  }
}
