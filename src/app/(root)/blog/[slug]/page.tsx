import { Metadata } from "next";
import PostClient from "./PostClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug.replace(/-/g, " ").toUpperCase()} | One Million Man Worship`,
    description: "Read official news and reflections from One Million Man Worship.",
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  return <PostClient slug={slug} />;
}
