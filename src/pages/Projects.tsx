import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";
import ProjectCard from "@/components/ProjectCard";
import { getProjects } from "@/lib/storage";
import type { Project } from "@/data/types";

const cities = ["Mathura", "Noida", "Greater Noida"];
const statuses = [
  { value: "ready-to-move", label: "Ready to Move" },
  { value: "under-construction", label: "Under Construction" },
  { value: "new-launch", label: "New Launch" },
];
const bhkOptions = ["2 BHK", "3 BHK", "4 BHK"];

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [leadOpen, setLeadOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    city: searchParams.get("city") || "",
    status: searchParams.get("status") || "",
    bhk: searchParams.get("bhk") || "",
  });

  const allProjects = getProjects();
  const filtered = allProjects.filter((p) => {
    if (filters.city && p.city !== filters.city) return false;
    if (filters.status && p.status !== filters.status) return false;
    if (filters.bhk && !p.configurations.some((c) => c.bhk.startsWith(filters.bhk.split(" ")[0]))) return false;
    return true;
  });

  useEffect(() => {
    const params: Record<string, string> = {};
    if (filters.city) params.city = filters.city;
    if (filters.status) params.status = filters.status;
    if (filters.bhk) params.bhk = filters.bhk;
    setSearchParams(params);
  }, [filters]);

  const clearFilters = () => setFilters({ city: "", status: "", bhk: "" });
  const hasFilters = filters.city || filters.status || filters.bhk;

  const FilterPanel = () => (
    <div className="space-y-5">
      <div>
        <h4 className="font-semibold text-navy text-sm mb-2">City</h4>
        <div className="space-y-1.5">
          {cities.map((c) => (
            <label key={c} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="city"
                checked={filters.city === c}
                onChange={() => setFilters((f) => ({ ...f, city: f.city === c ? "" : c }))}
                className="accent-crimson"
              />
              <span className="text-sm">{c}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-navy text-sm mb-2">Status</h4>
        <div className="space-y-1.5">
          {statuses.map((s) => (
            <label key={s.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                checked={filters.status === s.value}
                onChange={() => setFilters((f) => ({ ...f, status: f.status === s.value ? "" : s.value }))}
                className="accent-crimson"
              />
              <span className="text-sm">{s.label}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-navy text-sm mb-2">BHK Type</h4>
        <div className="space-y-1.5">
          {bhkOptions.map((b) => (
            <label key={b} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="bhk"
                checked={filters.bhk === b}
                onChange={() => setFilters((f) => ({ ...f, bhk: f.bhk === b ? "" : b }))}
                className="accent-crimson"
              />
              <span className="text-sm">{b}</span>
            </label>
          ))}
        </div>
      </div>
      {hasFilters && (
        <button
          onClick={clearFilters}
          className="text-sm text-crimson font-medium flex items-center gap-1 hover:underline"
        >
          <X className="h-3 w-3" /> Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header onEnquire={() => setLeadOpen(true)} />
      <LeadForm
        isOpen={leadOpen}
        onClose={() => setLeadOpen(false)}
        source="projects-listing"
        projectId={selectedProject?.id}
        projectName={selectedProject?.name}
      />

      {/* Page Header */}
      <div className="bg-navy pt-24 pb-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white">All Projects</h1>
          <p className="text-white/70 mt-1">
            {filtered.length} project{filtered.length !== 1 ? "s" : ""} found
            {filters.city && ` in ${filters.city}`}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters — Desktop */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-24 bg-white border border-border rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-navy mb-4">Filter Projects</h3>
              <FilterPanel />
            </div>
          </aside>

          {/* Main Grid */}
          <div className="flex-1">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                <SlidersHorizontal className="h-4 w-4" />
                {showFilters ? "Hide Filters" : "Show Filters"}
                {hasFilters && <span className="bg-crimson text-white text-xs px-1.5 py-0.5 rounded-full">!</span>}
              </button>
              {showFilters && (
                <div className="mt-3 bg-white border border-border rounded-xl p-5 shadow-sm">
                  <FilterPanel />
                </div>
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <p className="text-lg font-medium mb-2">No projects found</p>
                <p className="text-sm">Try adjusting your filters</p>
                <button onClick={clearFilters} className="mt-4 text-crimson font-semibold hover:underline">
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((p) => (
                  <ProjectCard
                    key={p.id}
                    project={p}
                    onEnquire={() => {
                      setSelectedProject(p);
                      setLeadOpen(true);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
