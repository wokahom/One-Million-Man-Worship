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
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  List,
  ListOrdered,
  Code,
  Link as LinkIcon,
  Eye,
  FileEdit,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import MarkdownRenderer from "@/components/MarkdownRenderer";

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
  const [editorTab, setEditorTab] = useState<"write" | "preview">("write");

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

  const insertMarkdown = (syntaxBefore: string, syntaxAfter: string = "", placeholder: string = "") => {
    const textarea = document.getElementById("post-content-textarea") as HTMLTextAreaElement | null;
    const current = editingPost?.content || "";
    if (!textarea) {
      setEditingPost({ ...editingPost, content: `${current}\n${syntaxBefore}${placeholder}${syntaxAfter}` });
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = current.substring(start, end) || placeholder;
    const replacement = `${syntaxBefore}${selected}${syntaxAfter}`;
    const nextContent = current.substring(0, start) + replacement + current.substring(end);

    setEditingPost({ ...editingPost, content: nextContent });
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + syntaxBefore.length, start + syntaxBefore.length + selected.length);
    }, 10);
  };

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

              {/* Rich Markdown Editor & Preview */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-300">
                    Article Body (Markdown Supported)
                  </label>
                  <div className="flex rounded-lg bg-slate-950 p-1 border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setEditorTab("write")}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition ${
                        editorTab === "write"
                          ? "bg-amber-500 text-slate-950 shadow"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <FileEdit className="w-3.5 h-3.5" /> Write
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorTab("preview")}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition ${
                        editorTab === "preview"
                          ? "bg-amber-500 text-slate-950 shadow"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" /> Live Preview
                    </button>
                  </div>
                </div>

                {editorTab === "write" ? (
                  <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden focus-within:border-amber-500/60 transition">
                    {/* Formatting Toolbar */}
                    <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-900/90 border-b border-slate-800 text-slate-300">
                      <button
                        type="button"
                        title="Heading 1"
                        onClick={() => insertMarkdown("# ", "", "Main Heading")}
                        className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-amber-400 text-xs font-bold flex items-center gap-1"
                      >
                        <Heading1 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        title="Heading 2"
                        onClick={() => insertMarkdown("## ", "", "Subheading")}
                        className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-amber-400 text-xs font-bold flex items-center gap-1"
                      >
                        <Heading2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        title="Heading 3"
                        onClick={() => insertMarkdown("### ", "", "Section Title")}
                        className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-amber-400 text-xs font-bold flex items-center gap-1"
                      >
                        <Heading3 className="w-4 h-4" />
                      </button>
                      <div className="w-[1px] h-4 bg-slate-800 mx-1" />
                      <button
                        type="button"
                        title="Bold"
                        onClick={() => insertMarkdown("**", "**", "bold text")}
                        className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-amber-400"
                      >
                        <Bold className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        title="Italic"
                        onClick={() => insertMarkdown("*", "*", "italic text")}
                        className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-amber-400"
                      >
                        <Italic className="w-4 h-4" />
                      </button>
                      <div className="w-[1px] h-4 bg-slate-800 mx-1" />
                      <button
                        type="button"
                        title="Bullet List"
                        onClick={() => insertMarkdown("- ", "", "List item")}
                        className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-amber-400"
                      >
                        <List className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        title="Numbered List"
                        onClick={() => insertMarkdown("1. ", "", "First step")}
                        className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-amber-400"
                      >
                        <ListOrdered className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        title="Blockquote"
                        onClick={() => insertMarkdown("> ", "", "Inspirational quote or verse")}
                        className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-amber-400"
                      >
                        <Quote className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        title="Code Block"
                        onClick={() => insertMarkdown("```\n", "\n```", "code block")}
                        className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-amber-400"
                      >
                        <Code className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        title="Link"
                        onClick={() => insertMarkdown("[", "](https://example.com)", "link title")}
                        className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-amber-400"
                      >
                        <LinkIcon className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Textarea */}
                    <textarea
                      id="post-content-textarea"
                      required
                      rows={12}
                      placeholder="Write your article using markdown: # for headings, **bold**, > quotes, - lists..."
                      value={editingPost.content || ""}
                      onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                      className="w-full p-4 bg-slate-950 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none font-mono leading-relaxed resize-y"
                    />
                  </div>
                ) : (
                  <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/70 min-h-[300px] max-h-[480px] overflow-y-auto">
                    {editingPost.content ? (
                      <MarkdownRenderer content={editingPost.content} />
                    ) : (
                      <p className="text-sm text-slate-500 italic">No content to preview.</p>
                    )}
                  </div>
                )}
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
