import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import logo from "@/assets/logo.jpg";

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white/80">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <img src={logo} alt="Impyreal Homes" className="h-12 w-auto rounded mb-4" />
            <p className="text-sm leading-relaxed text-white/60 mb-4">
              Curated Homes for an Impyreal Life. Your trusted real estate partner for
              premium residential projects across NCR, Mathura & beyond.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-8 w-8 rounded-full bg-white/10 hover:bg-crimson flex items-center justify-center transition-colors"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                ["Home", "/"],
                ["Projects", "/projects"],
                ["Blog / Insights", "/blog"],
                ["About Us", "/about"],
                ["Contact", "/contact"],
                ["Admin Login", "/admin/login"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link to={href} className="hover:text-crimson transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h4 className="font-bold text-white mb-4">Our Projects</h4>
            <ul className="space-y-2 text-sm">
              {[
                ["Gangotri Ramtal, Mathura", "/projects/gangotri-ramtal"],
                ["Silverline Greens, Noida", "/projects/silverline-greens-noida"],
                ["Emerald Heights, Gr. Noida", "/projects/emerald-heights-greater-noida"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link to={href} className="hover:text-crimson transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="font-bold text-white mt-6 mb-4">Area Guides</h4>
            <ul className="space-y-2 text-sm">
              {[
                ["Mathura", "/areas/mathura"],
                ["Noida", "/areas/noida"],
                ["Greater Noida", "/areas/greater-noida"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link to={href} className="hover:text-crimson transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2.5">
                <MapPin className="h-4 w-4 text-crimson shrink-0 mt-0.5" />
                <span>402, Tower B, Iconic Cowork, Sector 62, Noida, UP 201309</span>
              </li>
              <li className="flex gap-2.5">
                <Phone className="h-4 w-4 text-crimson shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex gap-2.5">
                <Mail className="h-4 w-4 text-crimson shrink-0" />
                <a href="mailto:info@impyrealhomes.com" className="hover:text-white">
                  info@impyrealhomes.com
                </a>
              </li>
            </ul>

            <a
              href="https://wa.me/919876543210?text=Hi%2C%20I%20am%20interested%20in%20your%20properties."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <p>© 2025 Impyreal Homes. All Rights Reserved.</p>
          <p>RERA Registered | Committed to Transparency</p>
        </div>
      </div>
    </footer>
  );
}
