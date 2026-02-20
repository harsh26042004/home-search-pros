import { Link } from "react-router-dom";
import { CalendarDays, Tag } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

interface BlogCardProps {
  post: Tables<"blog_posts">;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link to={`/blog/${post.slug}`} className="card-hover group block overflow-hidden border border-border bg-white shadow-sm">
      <div className="overflow-hidden h-44">
        <img
          src={post.cover_image || ""}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
          <span className="flex items-center gap-1">
            <Tag className="h-3 w-3 text-crimson" />
            {post.category}
          </span>
          <span className="flex items-center gap-1">
            <CalendarDays className="h-3 w-3" />
            {new Date(post.published_at).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
        <h3 className="font-bold text-navy text-base leading-snug group-hover:text-crimson transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{post.excerpt}</p>
        <p className="text-xs text-crimson font-semibold mt-3">Read More →</p>
      </div>
    </Link>
  );
}
