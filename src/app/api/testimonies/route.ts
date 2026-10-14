import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Testimony from "@/models/Testimony";

// Seed fallback testimonies in case MongoDB is brand new or offline
const defaultSeed = [
  {
    _id: "seed-1",
    name: "Sister Deborah Amadi",
    location: "Port Harcourt, Rivers State",
    testimony:
      "I came to 1MMW with severe spinal pain of 4 years. While Minister Nathaniel Bassey was leading the congregation in worship, a sudden warmth surged through my back. Immediately, every trace of pain vanished! I can now bend and run without any aid!",
    imageURL:
      "https://res.cloudinary.com/dtemxjmt6/image/upload/v1767105047/601807249_1736132051135946_5180954997817938290_n_tnl2ce.jpg",
    approved: true,
    createdAt: new Date("2025-01-15"),
  },
  {
    _id: "seed-2",
    name: "Pastor Emmanuel Uche",
    location: "Abuja, FCT",
    testimony:
      "The unity of believers lifting up praise at One Million Man Worship ignited a massive revival in our youth ministry. We experienced unprecedented salvations and spiritual renewals. God is truly doing something historic!",
    imageURL:
      "https://res.cloudinary.com/dtemxjmt6/image/upload/v1767105048/601812411_1736131704469314_8206748247949232720_n_b9nmix.jpg",
    approved: true,
    createdAt: new Date("2025-01-20"),
  },
  {
    _id: "seed-3",
    name: "Grace Oladipo",
    location: "Lagos, Nigeria",
    testimony:
      "During the midnight praise session, as thousands roared the name of Jesus, my business breakthrough arrived the very next Monday with a global partnership contract I had prayed for over 2 years. Glory to God alone!",
    imageURL:
      "https://res.cloudinary.com/dtemxjmt6/image/upload/v1767105044/601806188_1736131937802624_2925002357820166592_n_catex0.jpg",
    approved: true,
    createdAt: new Date("2025-02-02"),
  },
  {
    _id: "seed-4",
    name: "Michael Braide",
    location: "Bonny Island, Rivers State",
    testimony:
      "I was battling chronic depression and suicidal thoughts. Standing among the one million men worshipping, a peace that surpasses all understanding flooded my heart. Jesus gave me a fresh reason to live!",
    approved: true,
    createdAt: new Date("2025-02-10"),
  },
];

/**
 * GET /api/testimonies
 * Query params:
 * - approved: "true" | "false" | "all" (default: "true")
 * - limit: number (default: 50)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const approvedParam = searchParams.get("approved");
    const limit = parseInt(searchParams.get("limit") || "50", 10);

    await connectDB();

    const query: Record<string, unknown> = {};
    if (approvedParam === "true") {
      query.approved = true;
    } else if (approvedParam === "false") {
      query.approved = false;
    }

    const testimonies = await Testimony.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    // If query was for approved testimonies and DB is empty, combine with seed data
    if (approvedParam !== "false" && testimonies.length === 0) {
      return NextResponse.json({
        success: true,
        data: defaultSeed,
        count: defaultSeed.length,
        source: "seed-fallback",
      });
    }

    return NextResponse.json({
      success: true,
      data: testimonies,
      count: testimonies.length,
      source: "mongodb",
    });
  } catch (err: unknown) {
    console.error("GET /api/testimonies error:", err);
    // Graceful fallback to default seed
    return NextResponse.json({
      success: true,
      data: defaultSeed,
      count: defaultSeed.length,
      source: "offline-fallback",
    });
  }
}

/**
 * POST /api/testimonies
 * Body: { name, email, location, testimony, imageURL, videoURL }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, location, testimony, imageURL, videoURL } = body;

    if (!name || !location || !testimony) {
      return NextResponse.json(
        {
          success: false,
          error: "Name, location, and testimony story are required fields.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const newTestimony = await Testimony.create({
      name: name.trim(),
      email: email ? email.trim() : undefined,
      location: location.trim(),
      testimony: testimony.trim(),
      imageURL: imageURL || undefined,
      videoURL: videoURL || undefined,
      approved: false, // Moderated by default
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your testimony has been submitted and is pending review!",
        data: newTestimony,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("POST /api/testimonies error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit testimony. Please try again.",
      },
      { status: 500 }
    );
  }
}
