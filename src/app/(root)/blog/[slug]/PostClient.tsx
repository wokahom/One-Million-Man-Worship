"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  ArrowLeft,
  Share2,
  MessageSquare,
  Send,
  User,
  CheckCircle2,
  Tag,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: "Announcement" | "Article" | "Recap" | "News" | "Devotional";
  author: string;
  authorRole?: string;
  tags: string[];
  createdAt: string;
}

interface Comment {
  _id: string;
  authorName: string;
  content: string;
  createdAt: string;
}

export default function PostClient({ slug }: { slug: string }) {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  // New comment form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  useEffect(() => {
    async function loadPostData() {
      try {
        const res = await fetch(`/api/posts/${slug}`);
        const data = await res.json();
        if (data.success && data.data) {
          setPost(data.data);

          // Fetch comments
          const resComm = await fetch(`/api/comments?postSlug=${slug}&approvedOnly=true`);
          const dataComm = await resComm.json();
          if (dataComm.success && Array.isArray(dataComm.data)) {
            setComments(dataComm.data);
          }
        }
      } catch (err) {
        console.error("Error loading post:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPostData();
  }, [slug]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !content) {
      toast.error("Please fill in all comment fields");
      return;
    }
    setSubmittingComment(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: post?._id,
          postSlug: slug,
          authorName: name,
          authorEmail: email,
          content,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      setCommentSubmitted(true);
      setName("");
      setEmail("");
      setContent("");
      toast.success("Comment submitted for review!", {
        description: "It will be published once approved by our moderation team.",
      });
    } catch (err: unknown) {
      toast.error((err as Error).message || "Failed to submit comment");
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.excerpt,
          url: window.location.href,
        });
      } catch {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-500">
        Loading article...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-950 pt-32 text-center text-slate-300">
        <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
        <Link href="/blog">
          <Button variant="outline">Return to News & Articles</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 selection:bg-amber-400 selection:text-slate-950">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-amber-400 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to News & Articles
          </Link>
        </div>

        {/* Article Header */}
        <header className="space-y-6 mb-10">
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">
              {post.category}
            </Badge>
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 font-bold text-sm">
                1M
              </div>
              <div>
                <span className="text-sm font-bold text-white block">{post.author}</span>
                <span className="text-xs text-slate-400">{post.authorRole || "Media Team"}</span>
              </div>
            </div>

            <Button
              onClick={handleShare}
              variant="outline"
              size="sm"
              className="border-slate-800 bg-slate-900 text-slate-300 hover:text-white"
            >
              <Share2 className="w-4 h-4 mr-1.5" /> Share
            </Button>
          </div>
        </header>

        {/* Featured Cover */}
        {post.coverImage && (
          <div className="aspect-[16/9] relative rounded-3xl overflow-hidden border border-slate-800 mb-12 shadow-2xl">
            <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
          </div>
        )}

        {/* Article Content */}
        <article className="max-w-none mb-16 text-slate-300 leading-relaxed font-normal border-b border-slate-800 pb-12">
          <MarkdownRenderer content={post.content} />
        </article>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-16">
            <Tag className="w-4 h-4 text-amber-400 mr-1" />
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Comments Section */}
        <section className="space-y-10">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-amber-400" />
            <h3 className="text-2xl font-bold text-white">
              Discussion & Reflections ({comments.length})
            </h3>
          </div>

          {/* Comment Form */}
          <div className="p-6 md:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h4 className="text-base font-bold text-white">Leave a Comment</h4>
            <p className="text-xs text-slate-400">
              Your email will not be published. All comments are moderated before appearing.
            </p>

            {commentSubmitted ? (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                Thank you! Your comment has been submitted and is pending moderation.
              </div>
            ) : (
              <form onSubmit={handleSubmitComment} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <textarea
                  required
                  rows={4}
                  placeholder="Share your thoughts, praise report, or reflections..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500"
                />
                <Button
                  type="submit"
                  disabled={submittingComment}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                >
                  <Send className="w-4 h-4 mr-1.5" />
                  {submittingComment ? "Submitting..." : "Post Comment"}
                </Button>
              </form>
            )}
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.length === 0 ? (
              <p className="text-sm text-slate-500 italic">
                Be the first to leave a comment on this article.
              </p>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment._id}
                  className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-xs text-slate-300 font-bold">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-bold text-white text-sm">{comment.authorName}</span>
                    </div>
                    <span className="text-xs text-slate-500">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 pl-9 leading-relaxed">{comment.content}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
