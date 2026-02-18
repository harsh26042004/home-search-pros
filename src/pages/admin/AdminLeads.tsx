import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { getLeads, updateLeadStatus, deleteLead } from "@/lib/storage";
import type { Lead } from "@/data/types";
import { Trash2 } from "lucide-react";

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>(getLeads());
  const [filter, setFilter] = useState("");

  const refresh = () => setLeads(getLeads());

  const handleStatus = (id: string, status: Lead["status"]) => {
    updateLeadStatus(id, status);
    refresh();
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this lead?")) { deleteLead(id); refresh(); }
  };

  const filtered = leads.filter((l) =>
    !filter || l.status === filter || l.project_name?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-navy">Leads Inbox</h1>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="h-9 border border-input rounded-lg px-3 text-sm">
            <option value="">All Leads</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="lost">Lost</option>
          </select>
        </div>
        <div className="bg-white rounded-xl border border-border shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                {["Name","Phone","Email","Project","Budget","BHK","Status","Date","Action"].map((h) => (
                  <th key={h} className="text-left px-3 py-3 font-semibold text-navy text-xs">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => (
                <tr key={lead.id} className="border-t border-border hover:bg-muted/50">
                  <td className="px-3 py-2.5 font-medium">{lead.name}</td>
                  <td className="px-3 py-2.5 text-muted-foreground">{lead.phone}</td>
                  <td className="px-3 py-2.5 text-muted-foreground text-xs">{lead.email || "—"}</td>
                  <td className="px-3 py-2.5 text-muted-foreground text-xs">{lead.project_name || lead.source}</td>
                  <td className="px-3 py-2.5 text-muted-foreground text-xs">{lead.budget || "—"}</td>
                  <td className="px-3 py-2.5 text-muted-foreground text-xs">{lead.bhk || "—"}</td>
                  <td className="px-3 py-2.5">
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatus(lead.id, e.target.value as Lead["status"])}
                      className="text-xs border border-input rounded px-1.5 py-1"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="lost">Lost</option>
                    </select>
                  </td>
                  <td className="px-3 py-2.5 text-muted-foreground text-xs">{new Date(lead.created_at).toLocaleDateString("en-IN")}</td>
                  <td className="px-3 py-2.5">
                    <button onClick={() => handleDelete(lead.id)} className="text-crimson hover:text-crimson-dark">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={9} className="px-4 py-8 text-center text-muted-foreground">No leads found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
