"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Edit,
  Trash2,
  RefreshCw,
  Search,
  ExternalLink,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

interface PostRecord {
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
  published: boolean;
  createdAt: string;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<PostRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingPost, setEditingPost] = useState<Partial<PostRecord> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/posts?publishedOnly=false");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setPosts(json.data);
      }
    } catch {
      toast.error("Failed to load articles");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  const savePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost?.title || !editingPost?.excerpt || !editingPost?.content) {
      toast.error("Title, excerpt, and content are required");
      return;
    }

    try {
      const isNew = !editingPost._id;
      const slug =
        editingPost.slug ||
        editingPost.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");

      const payload = { ...editingPost, slug };
      const url = isNew ? "/api/posts" : `/api/posts/${editingPost._id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      toast.success(isNew ? "Article published!" : "Article updated!");
      setIsModalOpen(false);
      setEditingPost(null);
      loadPosts();
    } catch (err: unknown) {
      toast.error((err as Error).message || "Failed to save post");
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setPosts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Article deleted");
    } catch (err: unknown) {
      toast.error((err as Error).message || "Failed to delete post");
    }
  };

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
            <span>Publishing & Media</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Articles & Announcements
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => {
              setEditingPost({
                title: "",
                slug: "",
                category: "News",
                excerpt: "",
                content: "",
                author: "1MMW Editorial Team",
                authorRole: "Media Team",
                tags: ["One Million Man Worship", "2026", "Gospel"],
                published: true,
                coverImage: "/assets/2026/1MMW 2026 MAIN SQ.png",
              });
              setIsModalOpen(true);
            }}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
          >
            <Plus className="w-4 h-4 mr-1.5" /> New Article
          </Button>
          <Button
            onClick={loadPosts}
            variant="outline"
            className="border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      {/* Search & Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-amber-500"
          />
        </div>
        <Link
          href="/blog"
          target="_blank"
          className="text-xs text-amber-400 hover:underline flex items-center gap-1"
        >
          View Public Blog <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filtered.map((post) => (
          <div
            key={post._id}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-700 transition"
          >
            <div className="flex items-start gap-4">
              {post.coverImage && (
                <div className="w-20 h-20 relative rounded-xl overflow-hidden shrink-0 hidden sm:block">
                  <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
                </div>
              )}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="border-amber-500/40 text-amber-400">
                    {post.category}
                  </Badge>
                  <span className="text-xs text-slate-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white hover:text-amber-400 transition">
                  <Link href={`/blog/${post.slug}`} target="_blank">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-xs text-slate-400 line-clamp-1 mt-1">{post.excerpt}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setEditingPost(post);
                  setIsModalOpen(true);
                }}
                className="text-slate-300 hover:text-white"
              >
                <Edit className="w-4 h-4 mr-1" /> Edit
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => deletePost(post._id)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal CRUD */}
      {isModalOpen && editingPost && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 max-w-3xl w-full my-8 space-y-6 max-h-[90vh] overflow-y-auto cursor-default shadow-2xl"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="text-xl font-bold text-white">
                {editingPost._id ? "Edit Article" : "Create New Article"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={savePost} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editingPost.title || ""}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Category</label>
                  <select
                    value={editingPost.category || "News"}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        category: e.target.value as PostRecord["category"],
                      })
                    }
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                  >
                    <option value="News">News</option>
                    <option value="Announcement">Announcement</option>
                    <option value="Article">Article</option>
                    <option value="Recap">Recap</option>
                    <option value="Devotional">Devotional</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Cover Image URL
                  </label>
                  <input
                    type="text"
                    value={editingPost.coverImage || ""}
                    onChange={(e) => setEditingPost({ ...editingPost, coverImage: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Excerpt</label>
                <textarea
                  required
                  rows={2}
                  value={editingPost.excerpt || ""}
                  onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Content</label>
                <textarea
                  required
                  rows={8}
                  value={editingPost.content || ""}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white font-mono"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                >
                  Save & Publish
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
