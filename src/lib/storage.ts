import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

// ---- Projects ----
export async function getProjects(): Promise<Tables<"projects">[]> {
  const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
  if (error) { console.error("getProjects error:", error); return []; }
  return data || [];
}

export async function getProjectBySlug(slug: string): Promise<Tables<"projects"> | null> {
  const { data, error } = await supabase.from("projects").select("*").eq("slug", slug).maybeSingle();
  if (error) { console.error("getProjectBySlug error:", error); return null; }
  return data;
}

export async function saveProject(project: TablesInsert<"projects">): Promise<void> {
  const { error } = await supabase.from("projects").upsert(project, { onConflict: "id" });
  if (error) console.error("saveProject error:", error);
}

export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) console.error("deleteProject error:", error);
}

// ---- Blog Posts ----
export async function getBlogPosts(): Promise<Tables<"blog_posts">[]> {
  const { data, error } = await supabase.from("blog_posts").select("*").order("published_at", { ascending: false });
  if (error) { console.error("getBlogPosts error:", error); return []; }
  return data || [];
}

export async function getBlogPostBySlug(slug: string): Promise<Tables<"blog_posts"> | null> {
  const { data, error } = await supabase.from("blog_posts").select("*").eq("slug", slug).maybeSingle();
  if (error) { console.error("getBlogPostBySlug error:", error); return null; }
  return data;
}

export async function saveBlogPost(post: TablesInsert<"blog_posts">): Promise<void> {
  const { error } = await supabase.from("blog_posts").upsert(post, { onConflict: "id" });
  if (error) console.error("saveBlogPost error:", error);
}

export async function deleteBlogPost(id: string): Promise<void> {
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) console.error("deleteBlogPost error:", error);
}

// ---- Leads ----
export async function getLeads(): Promise<Tables<"leads">[]> {
  const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
  if (error) { console.error("getLeads error:", error); return []; }
  return data || [];
}

export async function saveLead(lead: TablesInsert<"leads">): Promise<Tables<"leads"> | null> {
  const { data, error } = await supabase.from("leads").insert(lead).select().single();
  if (error) { console.error("saveLead error:", error); return null; }
  return data;
}

export async function updateLeadStatus(id: string, status: string): Promise<void> {
  const { error } = await supabase.from("leads").update({ status }).eq("id", id);
  if (error) console.error("updateLeadStatus error:", error);
}

export async function deleteLead(id: string): Promise<void> {
  const { error } = await supabase.from("leads").delete().eq("id", id);
  if (error) console.error("deleteLead error:", error);
}

// ---- Testimonials ----
export async function getTestimonials(): Promise<Tables<"testimonials">[]> {
  const { data, error } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
  if (error) { console.error("getTestimonials error:", error); return []; }
  return data || [];
}
