import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { getProjects, saveProject, deleteProject } from "@/lib/storage";
import type { Project } from "@/data/types";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPriceRange } from "@/lib/formatters";

const blankProject = (): Project => ({
  id: crypto.randomUUID(),
  slug: "",
  name: "",
  city: "Noida",
  microMarket: "",
  address: "",
  propertyType: "Residential Apartments",
  priceMin: 5000000,
  priceMax: 10000000,
  configurations: [],
  carpetAreaRange: "",
  reraNumber: "",
  builder: "",
  possessionDate: "",
  status: "under-construction",
  usps: [],
  amenities: [],
  images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"],
  description: "",
});

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>(getProjects());
  const [editing, setEditing] = useState<Project | null>(null);

  const refresh = () => setProjects(getProjects());

  const handleSave = () => {
    if (!editing) return;
    if (!editing.slug) editing.slug = editing.name.toLowerCase().replace(/\s+/g, "-");
    saveProject(editing);
    refresh();
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this project?")) { deleteProject(id); refresh(); }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-navy">Projects</h1>
          <Button onClick={() => setEditing(blankProject())} className="bg-crimson hover:bg-crimson-dark text-white">
            <Plus className="h-4 w-4" /> Add Project
          </Button>
        </div>

        <div className="bg-white rounded-xl border border-border shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                {["Name","City","Status","Price Range","RERA","Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-semibold text-navy text-xs">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-t border-border hover:bg-muted/50">
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.city}</td>
                  <td className="px-4 py-3"><span className="text-xs bg-muted px-2 py-1 rounded-full">{p.status}</span></td>
                  <td className="px-4 py-3 text-muted-foreground text-xs inr-badge">{formatPriceRange(p.priceMin, p.priceMax)}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{p.reraNumber || "—"}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button onClick={() => setEditing({ ...p })} className="text-navy hover:text-crimson"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => handleDelete(p.id)} className="text-crimson"><Trash2 className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        {editing && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-navy">{editing.name || "New Project"}</h2>
                <button onClick={() => setEditing(null)}><X className="h-5 w-5" /></button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Project Name" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
                <Input placeholder="Slug (auto-generated)" value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} />
                <Input placeholder="City" value={editing.city} onChange={(e) => setEditing({ ...editing, city: e.target.value })} />
                <Input placeholder="Micro Market" value={editing.microMarket} onChange={(e) => setEditing({ ...editing, microMarket: e.target.value })} />
                <Input placeholder="Builder" value={editing.builder} onChange={(e) => setEditing({ ...editing, builder: e.target.value })} />
                <Input placeholder="RERA Number" value={editing.reraNumber} onChange={(e) => setEditing({ ...editing, reraNumber: e.target.value })} />
                <Input placeholder="Min Price (₹)" type="number" value={editing.priceMin} onChange={(e) => setEditing({ ...editing, priceMin: Number(e.target.value) })} />
                <Input placeholder="Max Price (₹)" type="number" value={editing.priceMax} onChange={(e) => setEditing({ ...editing, priceMax: Number(e.target.value) })} />
                <Input placeholder="Possession Date" value={editing.possessionDate} onChange={(e) => setEditing({ ...editing, possessionDate: e.target.value })} />
                <select value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value as Project["status"] })} className="h-10 border border-input rounded-md px-3 text-sm">
                  <option value="ready-to-move">Ready to Move</option>
                  <option value="under-construction">Under Construction</option>
                  <option value="new-launch">New Launch</option>
                </select>
              </div>
              <textarea placeholder="Description" rows={3} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="mt-3 w-full border border-input rounded-md px-3 py-2 text-sm resize-none" />
              <textarea placeholder="Amenities (one per line)" rows={3} value={editing.amenities.join("\n")} onChange={(e) => setEditing({ ...editing, amenities: e.target.value.split("\n").filter(Boolean) })} className="mt-3 w-full border border-input rounded-md px-3 py-2 text-sm resize-none" />
              <div className="mt-4 flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
                <Button onClick={handleSave} className="bg-crimson hover:bg-crimson-dark text-white">Save Project</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
