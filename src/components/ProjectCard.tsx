import { Link } from "react-router-dom";
import { MapPin, Building2 } from "lucide-react";
import { formatPriceRange } from "@/lib/formatters";
import type { Tables } from "@/integrations/supabase/types";

const statusConfig: Record<string, { label: string; className: string }> = {
  "ready-to-move": { label: "Ready to Move", className: "bg-green-100 text-green-800" },
  "under-construction": { label: "Under Construction", className: "bg-amber-100 text-amber-800" },
  "new-launch": { label: "New Launch", className: "bg-crimson/10 text-crimson" },
};

interface ProjectCardProps {
  project: Tables<"projects">;
  onEnquire?: () => void;
}

export default function ProjectCard({ project, onEnquire }: ProjectCardProps) {
  const status = statusConfig[project.status] || statusConfig["under-construction"];
  const images = project.images || [];
  const configurations = (project.configurations as any[]) || [];

  return (
    <div className="card-hover overflow-hidden border border-border bg-white shadow-sm group">
      <div className="relative overflow-hidden h-52">
        <img
          src={images[0] || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 ${status.className}`}>
          {status.label}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-navy text-lg leading-tight">{project.name}</h3>
        <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
          <MapPin className="h-3.5 w-3.5 text-crimson" />
          <span>{project.micro_market}, {project.city}</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
          <Building2 className="h-3.5 w-3.5 text-crimson" />
          <span>{configurations.map((c: any) => c.bhk).join(", ") || "—"}</span>
        </div>
        <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Starting From</p>
            <p className="font-bold text-navy text-base inr-badge">
              {formatPriceRange(project.price_min || 0, project.price_max || 0)}
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={onEnquire} className="text-xs bg-crimson text-white px-3 py-1.5 hover:bg-crimson-dark transition-colors font-medium">
              Enquire
            </button>
            <Link to={`/projects/${project.slug}`} className="text-xs bg-navy text-white px-3 py-1.5 hover:bg-navy-dark transition-colors font-medium">
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
