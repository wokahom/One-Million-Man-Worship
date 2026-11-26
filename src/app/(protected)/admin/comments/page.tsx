"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Check,
  Trash2,
  RefreshCw,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

interface CommentRecord {
  _id: string;
  postId: string;
  postSlug: string;
  authorName: string;
  authorEmail: string;
  content: string;
  approved: boolean;
  createdAt: string;
}

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<CommentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const loadComments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/comments?approvedOnly=false");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setComments(json.data);
      }
    } catch {
      toast.error("Failed to load comments");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const updateStatus = async (id: string, approved: boolean) => {
    try {
      const res = await fetch(`/api/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setComments((prev) =>
        prev.map((c) => (c._id === id ? { ...c, approved } : c))
      );
      toast.success(approved ? "Comment approved!" : "Comment revoked");
    } catch {
      toast.error("Failed to update comment");
    }
  };

  const deleteComment = async (id: string) => {
    if (!confirm("Delete comment permanently?")) return;
    try {
      const res = await fetch(`/api/comments/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setComments((prev) => prev.filter((c) => c._id !== id));
      toast.success("Comment deleted");
    } catch {
      toast.error("Failed to delete comment");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
            <span>Engagement & Moderation</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Comments Moderation
          </h1>
        </div>
        <Button
          onClick={loadComments}
          variant="outline"
          className="border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <p className="text-sm text-slate-400">
        Review reader comments on articles. Only approved comments are rendered on the live blog.
      </p>

      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/40 rounded-3xl border border-slate-800 text-slate-400">
            No comments submitted yet.
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-white text-sm">{comment.authorName}</span>
                  <span className="text-xs text-slate-500">({comment.authorEmail})</span>
                  <span className="text-xs text-slate-500">• Slug: {comment.postSlug}</span>
                  {comment.approved ? (
                    <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Approved
                    </Badge>
                  ) : (
                    <Badge className="bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      Pending
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-slate-300 mt-2 bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                  &ldquo;{comment.content}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {!comment.approved ? (
                  <Button
                    size="sm"
                    onClick={() => updateStatus(comment._id, true)}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold"
                  >
                    <Check className="w-4 h-4 mr-1" /> Approve
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateStatus(comment._id, false)}
                    className="border-slate-700 text-slate-300"
                  >
                    Revoke
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => deleteComment(comment._id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
