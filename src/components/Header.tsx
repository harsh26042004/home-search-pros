import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpg";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  {
    label: "Areas",
    href: "#",
    children: [
      { label: "Mathura", href: "/areas/mathura" },
      { label: "Noida", href: "/areas/noida" },
      { label: "Greater Noida", href: "/areas/greater-noida" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

interface HeaderProps {
  onEnquire?: () => void;
}

export default function Header({ onEnquire }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy shadow-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Impyreal Homes" className="h-10 w-auto rounded" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="relative group">
                <button
                  className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-white transition-colors"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  {link.label}
                  <ChevronDown className="h-3 w-3" />
                </button>
                <div
                  className="absolute top-full left-0 mt-1 w-44 bg-white rounded-lg shadow-xl border border-border opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all z-50"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      to={child.href}
                      className="block px-4 py-2.5 text-sm text-navy hover:bg-muted hover:text-crimson transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-medium text-white/90 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* CTA Area */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:+919876543210"
            className="flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors"
          >
            <Phone className="h-3.5 w-3.5" />
            +91 98765 43210
          </a>
          <span className="text-white/30">|</span>
          <button
            onClick={() => navigate("/?lang=hi")}
            className="text-xs text-white/60 hover:text-white transition-colors"
          >
            हिंदी
          </button>
          <Button
            onClick={onEnquire}
            className="bg-crimson hover:bg-crimson-dark text-white text-sm px-5 h-9"
          >
            Enquire Now
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-navy-dark border-t border-white/10">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  to={link.href === "#" ? "/" : link.href}
                  className="block py-2.5 text-white/90 hover:text-white text-sm font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="pl-4 flex flex-col gap-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="py-1.5 text-white/70 hover:text-white text-sm"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 border-t border-white/10">
              <Button
                onClick={() => { onEnquire?.(); setMobileOpen(false); }}
                className="w-full bg-crimson hover:bg-crimson-dark text-white"
              >
                Enquire Now
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
