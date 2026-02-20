import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { getProjects, saveProject, deleteProject } from "@/lib/storage";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPriceRange } from "@/lib/formatters";

interface Config { bhk: string; carpetArea: string; price: number; }

const blankProject = (): TablesInsert<"projects"> & { _configs: Config[] } => ({
  slug: "",
  name: "",
  city: "Noida",
  micro_market: "",
  address: "",
  property_type: "Residential Apartments",
  price_min: 5000000,
  price_max: 10000000,
  configurations: [],
  carpet_area_range: "",
  rera_number: "",
  builder: "",
  possession_date: "",
  status: "under-construction",
  usps: [],
  amenities: [],
  images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"],
  description: "",
  map_embed_url: "",
  featured: false,
  _configs: [],
});

type EditingProject = TablesInsert<"projects"> & { _configs: Config[] };

export default function AdminProjects() {
  const [projects, setProjects] = useState<Tables<"projects">[]>([]);
  const [editing, setEditing] = useState<EditingProject | null>(null);

  const refresh = () => getProjects().then(setProjects);
  useEffect(() => { refresh(); }, []);

  const handleSave = async () => {
    if (!editing) return;
    const slug = editing.slug || editing.name?.toLowerCase().replace(/\s+/g, "-") || "";
    const { _configs, ...rest } = editing;
    await saveProject({ ...rest, slug, configurations: _configs as unknown as any });
    refresh();
    setEditing(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this project?")) { await deleteProject(id); refresh(); }
  };

  const startEdit = (p: Tables<"projects">) => {
    const configs = (p.configurations as Config[]) || [];
    setEditing({ ...p, _configs: configs });
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-navy">Projects</h1>
          <Button onClick={() => setEditing(blankProject())} className="bg-crimson hover:bg-crimson-dark text-white"><Plus className="h-4 w-4" /> Add Project</Button>
        </div>
        <div className="bg-white border border-border shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted"><tr>
              {["Name","City","Status","Price Range","RERA","Actions"].map((h) => (
                <th key={h} className="text-left px-4 py-3 font-semibold text-navy text-xs">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-t border-border hover:bg-muted/50">
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.city}</td>
                  <td className="px-4 py-3"><span className="text-xs bg-muted px-2 py-1">{p.status}</span></td>
                  <td className="px-4 py-3 text-muted-foreground text-xs inr-badge">{formatPriceRange(p.price_min || 0, p.price_max || 0)}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{p.rera_number || "—"}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button onClick={() => startEdit(p)} className="text-navy hover:text-crimson"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => handleDelete(p.id)} className="text-crimson"><Trash2 className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {editing && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-navy">{editing.name || "New Project"}</h2>
                <button onClick={() => setEditing(null)}><X className="h-5 w-5" /></button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Project Name" value={editing.name || ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
                <Input placeholder="Slug (auto-generated)" value={editing.slug || ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} />
                <Input placeholder="City" value={editing.city || ""} onChange={(e) => setEditing({ ...editing, city: e.target.value })} />
                <Input placeholder="Micro Market" value={editing.micro_market || ""} onChange={(e) => setEditing({ ...editing, micro_market: e.target.value })} />
                <Input placeholder="Builder" value={editing.builder || ""} onChange={(e) => setEditing({ ...editing, builder: e.target.value })} />
                <Input placeholder="RERA Number" value={editing.rera_number || ""} onChange={(e) => setEditing({ ...editing, rera_number: e.target.value })} />
                <Input placeholder="Min Price (₹)" type="number" value={editing.price_min || 0} onChange={(e) => setEditing({ ...editing, price_min: Number(e.target.value) })} />
                <Input placeholder="Max Price (₹)" type="number" value={editing.price_max || 0} onChange={(e) => setEditing({ ...editing, price_max: Number(e.target.value) })} />
                <Input placeholder="Possession Date" value={editing.possession_date || ""} onChange={(e) => setEditing({ ...editing, possession_date: e.target.value })} />
                <select value={editing.status || "under-construction"} onChange={(e) => setEditing({ ...editing, status: e.target.value })} className="h-10 border border-input px-3 text-sm">
                  <option value="ready-to-move">Ready to Move</option>
                  <option value="under-construction">Under Construction</option>
                  <option value="new-launch">New Launch</option>
                </select>
              </div>
              <textarea placeholder="Description" rows={3} value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="mt-3 w-full border border-input px-3 py-2 text-sm resize-none" />
              <Input placeholder="Address" value={editing.address || ""} onChange={(e) => setEditing({ ...editing, address: e.target.value })} className="mt-3" />
              <Input placeholder="Carpet Area Range" value={editing.carpet_area_range || ""} onChange={(e) => setEditing({ ...editing, carpet_area_range: e.target.value })} className="mt-3" />
              <Input placeholder="Property Type" value={editing.property_type || ""} onChange={(e) => setEditing({ ...editing, property_type: e.target.value })} className="mt-3" />
              <Input placeholder="Google Map Embed URL" value={editing.map_embed_url || ""} onChange={(e) => setEditing({ ...editing, map_embed_url: e.target.value })} className="mt-3" />
              <div className="mt-3">
                <label className="text-xs font-semibold text-navy block mb-1">Image URLs (one per line)</label>
                <textarea placeholder="https://example.com/image1.jpg" rows={3} value={(editing.images as string[] || []).join("\n")} onChange={(e) => setEditing({ ...editing, images: e.target.value.split("\n").filter(Boolean) })} className="w-full border border-input px-3 py-2 text-sm resize-none" />
                {((editing.images as string[]) || []).filter(Boolean).length > 0 && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {((editing.images as string[]) || []).filter(Boolean).map((img, i) => (
                      <div key={i} className="relative w-20 h-20 border border-border overflow-hidden">
                        <img src={img} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" />
                        <button onClick={() => setEditing({ ...editing, images: ((editing.images as string[]) || []).filter((_, idx) => idx !== i) })} className="absolute top-0 right-0 bg-crimson text-white text-xs w-4 h-4 flex items-center justify-center">×</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <textarea placeholder="USPs (one per line)" rows={3} value={(editing.usps as string[] || []).join("\n")} onChange={(e) => setEditing({ ...editing, usps: e.target.value.split("\n").filter(Boolean) })} className="mt-3 w-full border border-input px-3 py-2 text-sm resize-none" />
              <textarea placeholder="Amenities (one per line)" rows={3} value={(editing.amenities as string[] || []).join("\n")} onChange={(e) => setEditing({ ...editing, amenities: e.target.value.split("\n").filter(Boolean) })} className="mt-3 w-full border border-input px-3 py-2 text-sm resize-none" />
              <div className="mt-3">
                <label className="text-xs font-semibold text-navy block mb-1">Configurations</label>
                {editing._configs.map((c, i) => (
                  <div key={i} className="flex gap-2 mb-2 items-center">
                    <Input placeholder="BHK" value={c.bhk} onChange={(e) => { const configs = [...editing._configs]; configs[i] = { ...c, bhk: e.target.value }; setEditing({ ...editing, _configs: configs }); }} className="flex-1" />
                    <Input placeholder="Area" value={c.carpetArea} onChange={(e) => { const configs = [...editing._configs]; configs[i] = { ...c, carpetArea: e.target.value }; setEditing({ ...editing, _configs: configs }); }} className="flex-1" />
                    <Input placeholder="Price ₹" type="number" value={c.price} onChange={(e) => { const configs = [...editing._configs]; configs[i] = { ...c, price: Number(e.target.value) }; setEditing({ ...editing, _configs: configs }); }} className="flex-1" />
                    <button onClick={() => setEditing({ ...editing, _configs: editing._configs.filter((_, idx) => idx !== i) })} className="text-crimson text-sm font-bold">×</button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => setEditing({ ...editing, _configs: [...editing._configs, { bhk: "", carpetArea: "", price: 0 }] })}>
                  <Plus className="h-3 w-3" /> Add Config
                </Button>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <input type="checkbox" checked={editing.featured || false} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} id="featured" />
                <label htmlFor="featured" className="text-sm text-navy font-medium">Featured on Home Page</label>
              </div>
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
