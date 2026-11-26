import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import NewsletterSubscriber from "@/models/NewsletterSubscriber";

export async function GET() {
  try {
    await connectDB();
    const subscribers = await NewsletterSubscriber.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: subscribers,
      count: subscribers.length,
    });
  } catch (err: unknown) {
    console.error("GET /api/newsletter error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch subscribers", data: [] },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, source } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email address is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    await connectDB();

    const existing = await NewsletterSubscriber.findOne({
      email: email.trim().toLowerCase(),
    });

    if (existing) {
      if (existing.status === "unsubscribed") {
        existing.status = "active";
        await existing.save();
        return NextResponse.json({
          success: true,
          message: "Welcome back! Your newsletter subscription has been reactivated.",
        });
      }
      return NextResponse.json({
        success: true,
        message: "You are already subscribed to the One Million Man Worship newsletter!",
      });
    }

    const newSubscriber = await NewsletterSubscriber.create({
      email: email.trim().toLowerCase(),
      name: name ? name.trim() : undefined,
      source: source || "website",
      status: "active",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for subscribing! You will receive official ministry announcements, event updates, and spiritual articles.",
        data: newSubscriber,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("POST /api/newsletter error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to subscribe. Please try again." },
      { status: 500 }
    );
  }
}
