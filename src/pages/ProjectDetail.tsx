import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin, Calendar, Building2, Shield, Phone, MessageSquare,
  Download, Eye, Play, CheckCircle2, ChevronLeft, ChevronRight, Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";
import EMICalculator from "@/components/EMICalculator";
import { getProjects } from "@/lib/storage";
import { formatPriceRange, formatINR } from "@/lib/formatters";
import type { Project } from "@/data/types";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [leadOpen, setLeadOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const found = getProjects().find((p) => p.slug === slug);
    if (!found) navigate("/projects");
    else setProject(found);
  }, [slug]);

  if (!project) return null;

  const statusLabel =
    project.status === "ready-to-move"
      ? "Ready to Move"
      : project.status === "new-launch"
      ? "New Launch"
      : "Under Construction";

  const statusColor =
    project.status === "ready-to-move"
      ? "bg-green-100 text-green-800"
      : project.status === "new-launch"
      ? "bg-crimson/10 text-crimson"
      : "bg-amber-100 text-amber-800";

  return (
    <div className="min-h-screen bg-background">
      <Header onEnquire={() => setLeadOpen(true)} />
      <LeadForm
        isOpen={leadOpen}
        onClose={() => setLeadOpen(false)}
        source="project-detail"
        projectId={project.id}
        projectName={project.name}
      />

      {/* Gallery */}
      <div className="pt-16">
        <div className="relative bg-black h-[55vh] overflow-hidden">
          <img
            src={project.images[activeImage]}
            alt={project.name}
            className="w-full h-full object-cover opacity-90"
          />
          {project.images.length > 1 && (
            <>
              <button
                onClick={() => setActiveImage((i) => Math.max(0, i - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
              >
                <ChevronLeft className="h-5 w-5 text-navy" />
              </button>
              <button
                onClick={() => setActiveImage((i) => Math.min(project.images.length - 1, i + 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
              >
                <ChevronRight className="h-5 w-5 text-navy" />
              </button>
            </>
          )}
          {/* Virtual Tour placeholder */}
          <button className="absolute bottom-4 right-4 flex items-center gap-2 bg-navy/80 hover:bg-navy text-white text-sm px-4 py-2 rounded-lg transition-colors">
            <Play className="h-4 w-4 fill-white" />
            Virtual Tour
          </button>
          <div className="absolute bottom-4 left-4 flex gap-2">
            {project.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`h-2 rounded-full transition-all ${i === activeImage ? "w-6 bg-white" : "w-2 bg-white/50"}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Title */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor}`}>
                  {statusLabel}
                </span>
                <span className="text-xs bg-navy/10 text-navy font-semibold px-2.5 py-1 rounded-full">
                  {project.propertyType}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-navy">{project.name}</h1>
              <p className="flex items-center gap-1 text-muted-foreground mt-1">
                <MapPin className="h-4 w-4 text-crimson" />
                {project.address}
              </p>
              <p className="text-2xl font-bold text-crimson mt-3 inr-badge">
                {formatPriceRange(project.priceMin, project.priceMax)}
              </p>
            </div>

            {/* Key Highlights */}
            <div className="bg-muted rounded-2xl p-6">
              <h2 className="font-bold text-navy text-lg mb-4">Key Highlights</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: Shield, label: "RERA No.", value: project.reraNumber },
                  { icon: Building2, label: "Builder", value: project.builder },
                  { icon: Calendar, label: "Possession", value: project.possessionDate },
                  { icon: Eye, label: "Area Range", value: project.carpetAreaRange },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-white rounded-xl p-3 shadow-sm">
                    <Icon className="h-4 w-4 text-crimson mb-1" />
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-xs font-semibold text-navy mt-0.5 break-words">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="font-bold text-navy text-lg mb-3">About This Project</h2>
              <p className="text-muted-foreground leading-relaxed">{project.description}</p>
            </div>

            {/* USPs */}
            <div>
              <h2 className="font-bold text-navy text-lg mb-3">Key USPs</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.usps.map((usp) => (
                  <li key={usp} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-crimson shrink-0 mt-0.5" />
                    {usp}
                  </li>
                ))}
              </ul>
            </div>

            {/* Configurations */}
            <div>
              <h2 className="font-bold text-navy text-lg mb-3">Configurations & Pricing</h2>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-navy text-white">
                    <tr>
                      <th className="text-left px-4 py-3">Type</th>
                      <th className="text-left px-4 py-3">Carpet Area</th>
                      <th className="text-left px-4 py-3">Price (Starting)</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.configurations.map((c, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-muted"}>
                        <td className="px-4 py-3 font-medium">{c.bhk}</td>
                        <td className="px-4 py-3 text-muted-foreground">{c.carpetArea}</td>
                        <td className="px-4 py-3 font-bold text-crimson inr-badge">{formatINR(c.price)}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => setLeadOpen(true)}
                            className="text-xs bg-navy text-white px-3 py-1.5 rounded-lg hover:bg-navy-dark transition-colors"
                          >
                            Enquire
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="font-bold text-navy text-lg mb-3">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {project.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2 text-sm">
                    <span className="text-crimson">✓</span>
                    {a}
                  </div>
                ))}
              </div>
            </div>

            {/* EMI Calculator */}
            <EMICalculator />

            {/* Map */}
            <div>
              <h2 className="font-bold text-navy text-lg mb-3">Location</h2>
              <div className="rounded-2xl overflow-hidden border border-border h-72">
                {project.mapEmbedUrl ? (
                  <iframe
                    src={project.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Project Location"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-sm">
                    <MapPin className="h-6 w-6 mr-2 text-crimson" />
                    {project.address}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <aside className="lg:w-80 shrink-0">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white border border-border rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-navy mb-4">Interested? Let's Talk!</h3>
                <div className="space-y-2.5">
                  <Button
                    onClick={() => setLeadOpen(true)}
                    className="w-full bg-crimson hover:bg-crimson-dark text-white h-11"
                  >
                    Enquire Now
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-navy text-navy hover:bg-navy hover:text-white h-11"
                    onClick={() => setLeadOpen(true)}
                  >
                    <Calendar className="h-4 w-4" />
                    Schedule Site Visit
                  </Button>
                  <a
                    href="tel:+919876543210"
                    className="flex items-center justify-center gap-2 w-full border border-input text-foreground hover:bg-muted h-11 rounded-md text-sm font-medium transition-colors"
                  >
                    <Phone className="h-4 w-4 text-crimson" />
                    Call Now
                  </a>
                  <a
                    href={getWhatsAppUrl({ projectName: project.name })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white h-11 rounded-md text-sm font-medium transition-colors"
                  >
                    <MessageSquare className="h-4 w-4" />
                    WhatsApp
                  </a>
                  <button className="flex items-center justify-center gap-2 w-full border border-input text-foreground hover:bg-muted h-11 rounded-md text-sm font-medium transition-colors">
                    <Download className="h-4 w-4 text-crimson" />
                    Download Brochure
                  </button>
                  <button className="flex items-center justify-center gap-2 w-full border border-input text-foreground hover:bg-muted h-11 rounded-md text-sm font-medium transition-colors">
                    <Share2 className="h-4 w-4 text-crimson" />
                    Share Project
                  </button>
                </div>
              </div>

              {/* RERA Box */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm">
                <div className="flex items-center gap-2 mb-1.5">
                  <Shield className="h-4 w-4 text-green-700" />
                  <span className="font-semibold text-green-800">RERA Registered</span>
                </div>
                <p className="text-green-700 text-xs font-mono">{project.reraNumber}</p>
                <p className="text-green-600 text-xs mt-1">
                  Verified on UP-RERA portal. Your investment is protected.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Sticky Bottom CTA — Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border p-3 flex gap-2 z-50">
        <button
          onClick={() => setLeadOpen(true)}
          className="flex-1 bg-crimson text-white text-sm font-semibold py-2.5 rounded-lg"
        >
          Enquire
        </button>
        <a
          href="tel:+919876543210"
          className="flex-1 bg-navy text-white text-sm font-semibold py-2.5 rounded-lg text-center"
        >
          Call Now
        </a>
        <a
          href={`https://wa.me/919876543210`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-green-600 text-white text-sm font-semibold py-2.5 rounded-lg text-center"
        >
          WhatsApp
        </a>
      </div>

      <div className="lg:hidden pb-16" />
      <Footer />
    </div>
  );
}
