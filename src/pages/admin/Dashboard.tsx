import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { getProjects, getLeads, getBlogPosts } from "@/lib/storage";
import { Building2, Users, FileText, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import type { Tables } from "@/integrations/supabase/types";

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Tables<"projects">[]>([]);
  const [leads, setLeads] = useState<Tables<"leads">[]>([]);
  const [blogs, setBlogs] = useState<Tables<"blog_posts">[]>([]);

  useEffect(() => {
    getProjects().then(setProjects);
    getLeads().then(setLeads);
    getBlogPosts().then(setBlogs);
  }, []);

  const newLeads = leads.filter((l) => l.status === "new").length;

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-navy mb-6">Dashboard</h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Projects", value: projects.length, icon: Building2, href: "/admin/projects" },
            { label: "Total Leads", value: leads.length, icon: Users, href: "/admin/leads" },
            { label: "New Leads", value: newLeads, icon: TrendingUp, href: "/admin/leads" },
            { label: "Blog Posts", value: blogs.length, icon: FileText, href: "/admin/blog" },
          ].map(({ label, value, icon: Icon, href }) => (
            <Link key={label} to={href} className="bg-white p-5 shadow-sm border border-border hover:shadow-md transition-shadow">
              <Icon className="h-6 w-6 text-crimson mb-2" />
              <p className="text-2xl font-bold text-navy">{value}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </Link>
          ))}
        </div>
        <h2 className="text-lg font-bold text-navy mb-3">Recent Leads</h2>
        <div className="bg-white border border-border shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted"><tr>
              <th className="text-left px-4 py-3 font-semibold text-navy">Name</th>
              <th className="text-left px-4 py-3 font-semibold text-navy">Phone</th>
              <th className="text-left px-4 py-3 font-semibold text-navy">Project</th>
              <th className="text-left px-4 py-3 font-semibold text-navy">Status</th>
              <th className="text-left px-4 py-3 font-semibold text-navy">Date</th>
            </tr></thead>
            <tbody>
              {leads.slice(0, 5).map((lead) => (
                <tr key={lead.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{lead.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{lead.phone}</td>
                  <td className="px-4 py-3 text-muted-foreground">{lead.project_name || "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 font-semibold ${lead.status === "new" ? "bg-amber-100 text-amber-800" : lead.status === "contacted" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}>{lead.status}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{new Date(lead.created_at).toLocaleDateString("en-IN")}</td>
                </tr>
              ))}
              {leads.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No leads yet</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
