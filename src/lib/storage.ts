import type { Lead, Project, BlogPost } from "@/data/types";

// ---- Leads ----
export function getLeads(): Lead[] {
  try {
    return JSON.parse(localStorage.getItem("ih_leads") || "[]");
  } catch {
    return [];
  }
}

export function saveLead(lead: Omit<Lead, "id" | "created_at" | "ai_intent_level" | "ai_notes" | "interactions">): Lead {
  const leads = getLeads();
  const newLead: Lead = {
    ...lead,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    status: "new",
    ai_intent_level: null,
    ai_notes: null,
    interactions: [],
  };
  leads.unshift(newLead);
  localStorage.setItem("ih_leads", JSON.stringify(leads));
  return newLead;
}

export function updateLeadStatus(id: string, status: Lead["status"]): void {
  const leads = getLeads();
  const idx = leads.findIndex((l) => l.id === id);
  if (idx !== -1) {
    leads[idx].status = status;
    localStorage.setItem("ih_leads", JSON.stringify(leads));
  }
}

export function deleteLead(id: string): void {
  const leads = getLeads().filter((l) => l.id !== id);
  localStorage.setItem("ih_leads", JSON.stringify(leads));
}

// ---- Projects ----
import { seedProjects } from "@/data/projects";

export function getProjects(): Project[] {
  try {
    const stored = localStorage.getItem("ih_projects");
    if (stored) return JSON.parse(stored);
    // Seed on first load
    localStorage.setItem("ih_projects", JSON.stringify(seedProjects));
    return seedProjects;
  } catch {
    return seedProjects;
  }
}

export function saveProject(project: Project): void {
  const projects = getProjects();
  const idx = projects.findIndex((p) => p.id === project.id);
  if (idx !== -1) {
    projects[idx] = project;
  } else {
    projects.unshift(project);
  }
  localStorage.setItem("ih_projects", JSON.stringify(projects));
}

export function deleteProject(id: string): void {
  const projects = getProjects().filter((p) => p.id !== id);
  localStorage.setItem("ih_projects", JSON.stringify(projects));
}

// ---- Blog Posts ----
import { seedBlogs } from "@/data/blogs";

export function getBlogPosts(): BlogPost[] {
  try {
    const stored = localStorage.getItem("ih_blogs");
    if (stored) return JSON.parse(stored);
    localStorage.setItem("ih_blogs", JSON.stringify(seedBlogs));
    return seedBlogs;
  } catch {
    return seedBlogs;
  }
}

export function saveBlogPost(post: BlogPost): void {
  const posts = getBlogPosts();
  const idx = posts.findIndex((p) => p.id === post.id);
  if (idx !== -1) {
    posts[idx] = post;
  } else {
    posts.unshift(post);
  }
  localStorage.setItem("ih_blogs", JSON.stringify(posts));
}

export function deleteBlogPost(id: string): void {
  const posts = getBlogPosts().filter((p) => p.id !== id);
  localStorage.setItem("ih_blogs", JSON.stringify(posts));
}

// ---- Admin Auth ----
export function adminLogin(email: string, password: string): boolean {
  return email === "admin@impyrealhomes.com" && password === "Impyreal@2025";
}

export function isAdminLoggedIn(): boolean {
  return localStorage.getItem("ih_admin_auth") === "true";
}

export function adminLogout(): void {
  localStorage.removeItem("ih_admin_auth");
}

export function setAdminLoggedIn(): void {
  localStorage.setItem("ih_admin_auth", "true");
}
