import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Edition from "@/models/Edition";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get("year");
    const publishedOnly = searchParams.get("publishedOnly") === "true";

    await connectDB();

    const query: Record<string, unknown> = {};
    if (year) query.year = year;
    if (publishedOnly) query.isPublished = true;

    // Seed initial historical editions if database is empty so visitors have rich content immediately!
    const count = await Edition.countDocuments();
    if (count === 0) {
      await Edition.create([
        {
          year: "2024",
          editionNumber: "2nd Edition",
          theme: "THE COVENANT OF WORSHIP",
          dates: "December 13, 2024",
          venue: "Yakubu Gowon Stadium, Elekahia, Port Harcourt",
          attendance: "850,000+ Believers",
          description:
            "A momentous gathering that united believers across all 23 LGAs of Rivers State and neighboring states in unbroken praise, prophetic declarations, and historic physical healings.",
          ministers: [
            "Dr. Pst. Paul & Dr. Becky Paul-Enenche",
            "Dunsin Oyekan",
            "Apostle Zilly Aggrey",
            "Rev. Chris Ugoh",
            "Panam Percy Paul",
            "Wisdom K",
            "1MMW Mass Choir",
          ],
          highlights: [
            "Record-setting stadium overflow stretching across all 4 entry quadrants",
            "Over 12 hours of uninterrupted prophetic praise and worship",
            "Miraculous healings and life testimonies documented on ground",
          ],
          mediaPhotos: [
            "https://res.cloudinary.com/dtemxjmt6/image/upload/v1767105041/600394143_1735794001169751_6309423566317643769_n_h0njhy.jpg",
            "https://res.cloudinary.com/dtemxjmt6/image/upload/v1767105040/600978115_1735793931169758_8531156171123650146_n_jsjtbt.jpg",
            "https://res.cloudinary.com/dtemxjmt6/image/upload/v1767105039/600350884_1735811974501287_7634278073864609618_n_z5lfkf.jpg",
          ],
          mediaVideos: [
            {
              title: "1MMW 2024 Live Session 1",
              url: "https://www.youtube.com/watch?v=TVxOqNhZbUA",
              platform: "youtube",
            },
            {
              title: "1MMW 2024 Glorious Atmosphere",
              url: "https://www.youtube.com/watch?v=iSAgS4oRAHQ",
              platform: "youtube",
            },
          ],
          bannerUrl: "https://res.cloudinary.com/dtemxjmt6/image/upload/v1767105050/601814423_1736131854469299_2926881306216183961_n_mfk69e.jpg",
          isPublished: true,
        },
        {
          year: "2025",
          editionNumber: "3rd Edition",
          theme: "DIVINE ADORATION",
          dates: "December 19, 2025",
          venue: "Yakubu Gowon Stadium, Elekahia, Port Harcourt",
          attendance: "1,100,000+ Believers",
          description:
            "A transcendent evening that witnessed an unprecedented wave of God's presence, marked by profound worship declarations and global satellite streaming across 40+ nations.",
          ministers: [
            "Dr. Pst. Paul Enenche",
            "Dunsin Oyekan",
            "Minister GUC",
            "Chioma Jesus",
            "Rev. Prof. Mosy Madugba",
            "Pastor George Izunwa",
          ],
          highlights: [
            "Surpassed the 1 million threshold with global online streams reaching 40+ countries",
            "Introduction of the official 1MMW Avatar generator uniting believers visually",
            "Multi-session live recording broadcast on international Christian satellite channels",
          ],
          mediaPhotos: [
            "https://res.cloudinary.com/dtemxjmt6/image/upload/v1767105050/601814423_1736131854469299_2926881306216183961_n_mfk69e.jpg",
            "https://res.cloudinary.com/dtemxjmt6/image/upload/v1767105048/601812411_1736131704469314_8206748247949232720_n_b9nmix.jpg",
            "https://res.cloudinary.com/dtemxjmt6/image/upload/v1767105044/601806188_1736131937802624_2925002357820166592_n_catex0.jpg",
          ],
          mediaVideos: [
            {
              title: "1MMW 2025 Prophetic Praises",
              url: "https://www.youtube.com/watch?v=kAV4E-ayrXo",
              platform: "youtube",
            },
          ],
          bannerUrl: "/assets/images/1mmw_banner2.jpg",
          isPublished: true,
        },
        {
          year: "2026",
          editionNumber: "4th Edition",
          theme: "JESUS",
          dates: "December 18 – 20, 2026 (3 Days)",
          venue: "Yakubu Gowon Stadium, Elekahia, Port Harcourt",
          attendance: "Projected 1,500,000+ Believers",
          description:
            "The flagship 4th edition expanded into a 3-Day holy convocation under the exalted banner '3 DAYS • ONE GOD • ONE SOUND • ONE STAGE' centered solely on Jesus Christ.",
          ministers: [
            "Dr. Pst. Paul & Dr. Becky Paul-Enenche",
            "Tye Tribbett",
            "Dunsin Oyekan",
            "Min. GUC",
            "Chioma Jesus",
            "Apostle Zilly Aggrey",
            "Rev. Chris Ugoh",
            "Pastor George Izunwa",
            "Panam Percy Paul",
            "Godswill Oyor",
            "Chinyere Udoma",
            "Lilian Nneji",
          ],
          highlights: [
            "Expanded into an unprecedented 3-Day global worship convocation",
            "Official 'I'll Be Attending' 2026 avatar studio integration",
            "Dedicated 6-zone transit shuttle network across Port Harcourt corridors",
          ],
          mediaPhotos: [
            "/assets/2026/1MMW 2026 MAIN TV.png",
            "/assets/2026/1MMW 2026 MAIN SQ.png",
            "/assets/2026/PAUL.png",
            "/assets/2026/TYE.png",
          ],
          mediaVideos: [],
          bannerUrl: "/assets/2026/1MMW 2026 MAIN TV.png",
          isPublished: true,
        },
      ]);
    }

    const editions = await Edition.find(query).sort({ year: -1 }).lean();

    return NextResponse.json({
      success: true,
      data: editions,
      count: editions.length,
    });
  } catch (err: unknown) {
    console.error("GET /api/editions error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch editions archive", data: [] },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { year, theme, editionNumber, dates, venue, description } = body;

    if (!year || !theme || !editionNumber || !dates || !venue || !description) {
      return NextResponse.json(
        { success: false, error: "Missing required edition fields (year, theme, editionNumber, dates, venue, description)." },
        { status: 400 }
      );
    }

    await connectDB();

    const existing = await Edition.findOne({ year: year.trim() });
    if (existing) {
      return NextResponse.json(
        { success: false, error: `An archive record for year ${year} already exists.` },
        { status: 409 }
      );
    }

    const newEdition = await Edition.create({
      ...body,
      year: year.trim(),
      theme: theme.trim(),
      editionNumber: editionNumber.trim(),
      dates: dates.trim(),
      venue: venue.trim(),
      description: description.trim(),
    });

    return NextResponse.json(
      {
        success: true,
        message: `Edition ${year} archived successfully!`,
        data: newEdition,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("POST /api/editions error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to create edition record." },
      { status: 500 }
    );
  }
}
