import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { getBlogPosts, saveBlogPost, deleteBlogPost } from "@/lib/storage";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const blankPost = (): TablesInsert<"blog_posts"> => ({
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  category: "Market Insights",
  tags: [],
  cover_image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800",
  author: "Impyreal Research Desk",
  published_at: new Date().toISOString().split("T")[0],
});

export default function AdminBlog() {
  const [posts, setPosts] = useState<Tables<"blog_posts">[]>([]);
  const [editing, setEditing] = useState<TablesInsert<"blog_posts"> | null>(null);

  const refresh = () => getBlogPosts().then(setPosts);
  useEffect(() => { refresh(); }, []);

  const handleSave = async () => {
    if (!editing) return;
    const slug = editing.slug || editing.title?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || "";
    await saveBlogPost({ ...editing, slug });
    refresh();
    setEditing(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this post?")) { await deleteBlogPost(id); refresh(); }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-navy">Blog Posts</h1>
          <Button onClick={() => setEditing(blankPost())} className="bg-crimson hover:bg-crimson-dark text-white"><Plus className="h-4 w-4" /> New Post</Button>
        </div>
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="bg-white border border-border shadow-sm p-4 flex gap-4 items-start">
              <img src={post.cover_image || ""} alt={post.title} className="w-16 h-16 object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-navy truncate">{post.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{post.category} · {post.published_at}</p>
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
            <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-navy">{editing.title || "New Post"}</h2>
                <button onClick={() => setEditing(null)}><X className="h-5 w-5" /></button>
              </div>
              <div className="space-y-3">
                <Input placeholder="Title" value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
                <Input placeholder="Slug (auto)" value={editing.slug || ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} />
                <div className="grid grid-cols-2 gap-3">
                  <select value={editing.category || ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="h-10 border border-input px-3 text-sm">
                    {["Market Insights", "Buyer's Guide", "Legal", "Investment"].map((c) => <option key={c}>{c}</option>)}
                  </select>
                  <Input placeholder="Published Date" type="date" value={typeof editing.published_at === 'string' ? editing.published_at.split('T')[0] : ''} onChange={(e) => setEditing({ ...editing, published_at: e.target.value })} />
                </div>
                <Input placeholder="Cover Image URL" value={editing.cover_image || ""} onChange={(e) => setEditing({ ...editing, cover_image: e.target.value })} />
                <textarea placeholder="Excerpt" rows={2} value={editing.excerpt || ""} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} className="w-full border border-input px-3 py-2 text-sm resize-none" />
                <textarea placeholder="Content (Markdown supported)" rows={8} value={editing.content || ""} onChange={(e) => setEditing({ ...editing, content: e.target.value })} className="w-full border border-input px-3 py-2 text-sm resize-none font-mono" />
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
