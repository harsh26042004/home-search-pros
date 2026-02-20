import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";
import BlogCard from "@/components/BlogCard";
import { getBlogPosts } from "@/lib/storage";
import type { Tables } from "@/integrations/supabase/types";

const categories = ["All", "Market Insights", "Buyer's Guide", "Legal", "Investment"];

export default function Blog() {
  const [leadOpen, setLeadOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [allPosts, setAllPosts] = useState<Tables<"blog_posts">[]>([]);

  useEffect(() => {
    getBlogPosts().then(setAllPosts);
  }, []);

  const posts = allPosts.filter((p) => {
    const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = !search || p.title?.toLowerCase().includes(search.toLowerCase()) || p.excerpt?.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header onEnquire={() => setLeadOpen(true)} />
      <LeadForm isOpen={leadOpen} onClose={() => setLeadOpen(false)} source="blog" />
      <div className="bg-navy pt-24 pb-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold text-sm font-semibold uppercase tracking-wider mb-2">Insights</p>
          <h1 className="text-3xl font-bold text-white">Blog & Insights</h1>
          <p className="text-white/70 mt-2 max-w-xl mx-auto">Market updates, buyer guides, and expert perspectives on Indian real estate.</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder="Search articles..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 h-10 border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-3 py-1.5 text-sm font-medium transition-colors ${selectedCategory === cat ? "bg-navy text-white" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No articles found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => <BlogCard key={post.id} post={post} />)}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
