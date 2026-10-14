import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";

/**
 * GET /api/contact
 * Admin listing of inquiries
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "100", 10);

    await connectDB();

    const query: Record<string, unknown> = {};
    if (status && status !== "all") {
      query.status = status;
    }

    const messages = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      data: messages,
      count: messages.length,
    });
  } catch (err: unknown) {
    console.error("GET /api/contact error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve messages.",
        data: [],
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/contact
 * Submit contact inquiry
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "Name, email, subject, and message are required fields.",
        },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a valid email address.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const newContact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : undefined,
      subject: subject.trim(),
      message: message.trim(),
      status: "new",
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for contacting us! Your message has been sent successfully and our team will get back to you shortly.",
        data: newContact,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("POST /api/contact error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send your message. Please try again or email us directly.",
      },
      { status: 500 }
    );
  }
}
