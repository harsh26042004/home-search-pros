import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { getBlogPosts, saveBlogPost, deleteBlogPost } from "@/lib/storage";
import type { BlogPost } from "@/data/types";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const blankPost = (): BlogPost => ({
  id: crypto.randomUUID(),
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  category: "Market Insights",
  tags: [],
  coverImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800",
  author: "Impyreal Research Desk",
  publishedAt: new Date().toISOString().split("T")[0],
});

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>(getBlogPosts());
  const [editing, setEditing] = useState<BlogPost | null>(null);

  const refresh = () => setPosts(getBlogPosts());

  const handleSave = () => {
    if (!editing) return;
    if (!editing.slug) editing.slug = editing.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    saveBlogPost(editing);
    refresh();
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this post?")) { deleteBlogPost(id); refresh(); }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-navy">Blog Posts</h1>
          <Button onClick={() => setEditing(blankPost())} className="bg-crimson hover:bg-crimson-dark text-white">
            <Plus className="h-4 w-4" /> New Post
          </Button>
        </div>

        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl border border-border shadow-sm p-4 flex gap-4 items-start">
              <img src={post.coverImage} alt={post.title} className="w-16 h-16 rounded-lg object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-navy truncate">{post.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{post.category} · {post.publishedAt}</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{post.excerpt}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setEditing({ ...post })} className="text-navy hover:text-crimson"><Pencil className="h-4 w-4" /></button>
                <button onClick={() => handleDelete(post.id)} className="text-crimson"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>

        {editing && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-navy">{editing.title || "New Post"}</h2>
                <button onClick={() => setEditing(null)}><X className="h-5 w-5" /></button>
              </div>
              <div className="space-y-3">
                <Input placeholder="Title" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
                <Input placeholder="Slug (auto)" value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} />
                <div className="grid grid-cols-2 gap-3">
                  <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="h-10 border border-input rounded-md px-3 text-sm">
                    {["Market Insights", "Buyer's Guide", "Legal", "Investment"].map((c) => <option key={c}>{c}</option>)}
                  </select>
                  <Input placeholder="Published Date" type="date" value={editing.publishedAt} onChange={(e) => setEditing({ ...editing, publishedAt: e.target.value })} />
                </div>
                <Input placeholder="Cover Image URL" value={editing.coverImage} onChange={(e) => setEditing({ ...editing, coverImage: e.target.value })} />
                <textarea placeholder="Excerpt" rows={2} value={editing.excerpt} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} className="w-full border border-input rounded-md px-3 py-2 text-sm resize-none" />
                <textarea placeholder="Content (Markdown supported)" rows={8} value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} className="w-full border border-input rounded-md px-3 py-2 text-sm resize-none font-mono" />
              </div>
              <div className="mt-4 flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
                <Button onClick={handleSave} className="bg-crimson hover:bg-crimson-dark text-white">Save Post</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
