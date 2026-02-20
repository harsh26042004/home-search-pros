import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CalendarDays, Tag, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";
import BlogCard from "@/components/BlogCard";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/storage";
import type { Tables } from "@/integrations/supabase/types";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Tables<"blog_posts"> | null>(null);
  const [related, setRelated] = useState<Tables<"blog_posts">[]>([]);
  const [leadOpen, setLeadOpen] = useState(false);

  useEffect(() => {
    if (slug) {
      getBlogPostBySlug(slug).then((found) => {
        if (!found) navigate("/blog");
        else setPost(found);
      });
      getBlogPosts().then((all) => setRelated(all.filter((p) => p.slug !== slug).slice(0, 2)));
    }
  }, [slug]);

  if (!post) return null;

  const renderContent = (content: string) => {
    const lines = (content || "").trim().split("\n");
    return lines.map((line, i) => {
      if (line.startsWith("## ")) return <h2 key={i} className="text-xl font-bold text-navy mt-7 mb-3">{line.slice(3)}</h2>;
      if (line.startsWith("### ")) return <h3 key={i} className="text-lg font-bold text-navy mt-5 mb-2">{line.slice(4)}</h3>;
      if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="font-bold text-navy mb-2">{line.slice(2, -2)}</p>;
      if (line.trim() === "") return <div key={i} className="h-2" />;
      return <p key={i} className="text-muted-foreground leading-relaxed mb-2">{line}</p>;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onEnquire={() => setLeadOpen(true)} />
      <LeadForm isOpen={leadOpen} onClose={() => setLeadOpen(false)} source="blog-post" />
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
        <button onClick={() => navigate("/blog")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-navy mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </button>
        <div className="overflow-hidden h-64 mb-7">
          <img src={post.cover_image || ""} alt={post.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1"><Tag className="h-3 w-3 text-crimson" />{post.category}</span>
          <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" />{new Date(post.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
          <span>By {post.author}</span>
        </div>
        <h1 className="text-3xl font-bold text-navy leading-tight mb-6">{post.title}</h1>
        <div className="prose-like">{renderContent(post.content || "")}</div>
        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border">
          {(post.tags || []).map((tag) => <span key={tag} className="bg-muted text-muted-foreground text-xs px-3 py-1.5">#{tag}</span>)}
        </div>
        <div className="bg-navy text-white p-6 text-center mt-10">
          <h3 className="font-bold text-lg mb-2">Interested in Investing?</h3>
          <p className="text-white/70 text-sm mb-4">Talk to our experts for personalized property advice — completely free.</p>
          <button onClick={() => setLeadOpen(true)} className="bg-crimson hover:bg-crimson-dark text-white px-6 py-2.5 font-semibold text-sm transition-colors">Get Free Consultation</button>
        </div>
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-navy mb-4">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">{related.map((p) => <BlogCard key={p.id} post={p} />)}</div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
