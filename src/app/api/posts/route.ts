import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const slug = searchParams.get("slug");
    const publishedOnly = searchParams.get("publishedOnly") !== "false";

    await connectDB();

    // Direct lookup by slug
    if (slug) {
      const post = await Post.findOne({ slug }).lean();
      if (!post) {
        return NextResponse.json(
          { success: false, error: "Post not found" },
          { status: 404 }
        );
      }
      // Increment view count non-blockingly
      Post.findByIdAndUpdate(post._id, { $inc: { views: 1 } }).catch(() => {});
      return NextResponse.json({ success: true, data: post });
    }

    // Seed initial posts if blog is empty
    const count = await Post.countDocuments();
    if (count === 0) {
      await Post.create([
        {
          title: "Countdown to 1MMW 2026: 3 Days, One God, One Sound, One Stage",
          slug: "countdown-to-1mmw-2026-3-days-one-god-one-sound-one-stage",
          excerpt:
            "The leadership and organizing committee officially unveils the 4th edition of One Million Man Worship, holding December 18–20, 2026 at Yakubu Gowon Stadium.",
          content: `### A Divine Call to All Believers Across the Nations

The countdown has officially begun for the historic **4th Edition of One Million Man Worship**, scheduled for **December 18th to 20th, 2026** at the prestigious **Yakubu Gowon Stadium, Elekahia, Port Harcourt**.

#### A 3-Day Sacred Convocation
For the very first time in our history, the convocation expands into a full three-day holy convocation:
- **Day 1 (Friday, Dec 18):** Opening Night of Glory & Prophetic Praises.
- **Day 2 (Saturday, Dec 19):** Atmosphere of Miracles, Healing, and Apostolic Deliverance.
- **Day 3 (Sunday, Dec 20):** Grand Consecration, National Intercession, and Revival Fire.

#### Minister Lineup & Global Broadcast
Anointed fathers of faith and revival psalmists will lead the gathering, including **Dr. Pastor Paul & Dr. Mrs. Becky Paul-Enenche**, **Tye Tribbett**, **Dunsin Oyekan**, **Min. GUC**, **Chioma Jesus**, **Apostle Zilly Aggrey**, **Rev. Chris Ugoh**, **Pastor George Izunwa**, **Dr. Panam Percy Paul**, **Godswill Oyor**, **Chinyere Udoma**, **Lilian Nneji**, and many more.

Admission into the stadium is **100% Free**. Free shuttle transit has also been arranged across 6 major regional corridors in Port Harcourt to ensure effortless mobility for worshippers.`,
          category: "Announcement",
          author: "1MMW Executive Committee",
          authorRole: "Media & Publicity",
          coverImage: "/assets/2026/1MMW 2026 MAIN TV.png",
          tags: ["1MMW2026", "Announcement", "Ministers", "Port Harcourt"],
          published: true,
          publishedAt: new Date(),
        },
        {
          title: "The Heart of Worship: Transcending Denominations and Tribes",
          slug: "the-heart-of-worship-transcending-denominations-and-tribes",
          excerpt:
            "Reflecting on why the unity of believers remains the cornerstone of supernatural revival in Nigeria and across the continent.",
          content: `### One Sound, One Voice, One Lord

When over one million worshippers lift hands in unison under open skies, artificial denomination barriers melt away. Scripture reveals in Psalm 133 that *“how good and how pleasant it is for brethren to dwell together in unity... for there the Lord commanded the blessing, even life forevermore.”*

#### The Mandate
One Million Man Worship is not a denomination, nor is it a church. It is an altar of pure adoration erected to King Jesus. When we sing in harmony, we release an incense of adoration that shifts spiritual climates over cities and nations.

As we prepare for the 2026 convocation, let every believer prepare their heart as a temple of praise.`,
          category: "Article",
          author: "Editorial Board",
          authorRole: "Spiritual Content",
          coverImage: "https://res.cloudinary.com/dtemxjmt6/image/upload/v1767105047/601807249_1736132051135946_5180954997817938290_n_tnl2ce.jpg",
          tags: ["Worship", "Spiritual Revival", "Unity"],
          published: true,
          publishedAt: new Date(Date.now() - 86400000 * 3),
        },
        {
          title: "Volunteer Mobilization Commences for 2026 Workforce",
          slug: "volunteer-mobilization-commences-for-2026-workforce",
          excerpt:
            "Applications are officially open across 10 vital service departments. Join thousands of dedicated volunteers serving in God's vineyard.",
          content: `### Join the 2026 Workforce

Serving in God's house is an honor of high calling. The Secretariat of One Million Man Worship has opened volunteer applications for the 4th edition.

#### Available Departments:
1. **Protocol & Guest Relations**
2. **Ushering & Crowd Direction**
3. **Mass Choir & Orchestral Psalmists**
4. **Media, Photography & Broadcast Operations**
5. **Medical & Emergency First Aid**
6. **Security & Traffic Coordination**
7. **Transit & Logistics Drivers**
8. **Intercessory & Prayer Support**
9. **Technical, Stage & Sound Engineering**
10. **Sanitation & Venue Maintenance**

Volunteers receive specialized pre-event training, accreditation credentials, and official team gear. Head over to the **Volunteer Portal** on our website to register today.`,
          category: "News",
          author: "Volunteers Directorate",
          authorRole: "Human Resources",
          coverImage: "https://res.cloudinary.com/dtemxjmt6/image/upload/v1767105040/601533422_1735778371171314_8234935736717962226_n_pei7nn.jpg",
          tags: ["Volunteer", "Workforce", "Service"],
          published: true,
          publishedAt: new Date(Date.now() - 86400000 * 7),
        },
      ]);
    }

    const query: Record<string, unknown> = {};
    if (publishedOnly) query.published = true;
    if (category && category !== "all") query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const posts = await Post.find(query).sort({ publishedAt: -1, createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      data: posts,
      count: posts.length,
    });
  } catch (err: unknown) {
    console.error("GET /api/posts error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch articles", data: [] },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, excerpt, content, category, author, coverImage, tags, published } = body;

    if (!title || !excerpt || !content) {
      return NextResponse.json(
        { success: false, error: "Title, excerpt, and content are required." },
        { status: 400 }
      );
    }

    await connectDB();

    let slug = body.slug ? slugify(body.slug) : slugify(title);
    // Ensure slug uniqueness
    const existing = await Post.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const newPost = await Post.create({
      title: title.trim(),
      slug,
      excerpt: excerpt.trim(),
      content,
      category: category || "News",
      author: author ? author.trim() : "1MMW Editorial Team",
      coverImage: coverImage ? coverImage.trim() : undefined,
      tags: Array.isArray(tags) ? tags : typeof tags === "string" ? tags.split(",").map((t: string) => t.trim()) : [],
      published: published !== false,
      publishedAt: published !== false ? new Date() : undefined,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Article published successfully!",
        data: newPost,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("POST /api/posts error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to publish article." },
      { status: 500 }
    );
  }
}
