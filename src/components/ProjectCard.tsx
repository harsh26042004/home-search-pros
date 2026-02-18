import { Link } from "react-router-dom";
import { MapPin, Building2 } from "lucide-react";
import { formatPriceRange } from "@/lib/formatters";
import type { Project } from "@/data/types";

const statusConfig = {
  "ready-to-move": { label: "Ready to Move", className: "bg-green-100 text-green-800" },
  "under-construction": { label: "Under Construction", className: "bg-amber-100 text-amber-800" },
  "new-launch": { label: "New Launch", className: "bg-crimson/10 text-crimson" },
};

interface ProjectCardProps {
  project: Project;
  onEnquire?: () => void;
}

export default function ProjectCard({ project, onEnquire }: ProjectCardProps) {
  const status = statusConfig[project.status];

  return (
    <div className="card-hover rounded-xl overflow-hidden border border-border bg-white shadow-sm group">
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <img
          src={project.images[0]}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${status.className}`}>
          {status.label}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-navy text-lg leading-tight">{project.name}</h3>

        <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
          <MapPin className="h-3.5 w-3.5 text-crimson" />
          <span>{project.microMarket}, {project.city}</span>
        </div>

        <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
          <Building2 className="h-3.5 w-3.5 text-crimson" />
          <span>{project.configurations.map((c) => c.bhk).join(", ")}</span>
        </div>

        <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Starting From</p>
            <p className="font-bold text-navy text-base inr-badge">
              {formatPriceRange(project.priceMin, project.priceMax)}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onEnquire}
              className="text-xs bg-crimson text-white px-3 py-1.5 rounded-lg hover:bg-crimson-dark transition-colors font-medium"
            >
              Enquire
            </button>
            <Link
              to={`/projects/${project.slug}`}
              className="text-xs bg-navy text-white px-3 py-1.5 rounded-lg hover:bg-navy-dark transition-colors font-medium"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
