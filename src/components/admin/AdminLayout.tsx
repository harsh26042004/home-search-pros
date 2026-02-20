import { Link, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Building2, Users, FileText, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/logo.jpg";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", icon: Building2 },
  { label: "Leads", href: "/admin/leads", icon: Users },
  { label: "Blog", href: "/admin/blog", icon: FileText },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-muted">
      <aside className="w-56 bg-navy text-white flex flex-col shrink-0">
        <div className="p-4 border-b border-white/10">
          <img src={logo} alt="Impyreal Homes" className="h-10 w-auto" />
          <p className="text-xs text-white/50 mt-1">Admin Portal</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = location.pathname === href;
            return (
              <Link
                key={href}
                to={href}
                className={`flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium transition-colors ${
                  active ? "bg-crimson text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 px-3 py-2.5 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors w-full"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
          <Link to="/" className="mt-1 flex items-center gap-2.5 px-3 py-2 text-xs text-white/40 hover:text-white/60 transition-colors">
            ← Back to Site
          </Link>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
