import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronRight, Star, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";
import ProjectCard from "@/components/ProjectCard";
import BlogCard from "@/components/BlogCard";
import { getProjects, getBlogPosts, getTestimonials } from "@/lib/storage";
import type { Tables } from "@/integrations/supabase/types";
import heroBg from "@/assets/hero-bg.jpg";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const locations = ["Mathura", "Noida", "Greater Noida", "Agra", "Vrindavan"];
const budgets = ["Under ₹50L", "₹50L–₹1Cr", "₹1Cr–₹2Cr", "Above ₹2Cr"];
const bhks = ["1 BHK", "2 BHK", "3 BHK", "4 BHK"];

const whyUs = [
  { icon: "🏆", title: "Curated Projects Only", desc: "We partner exclusively with RERA-registered developers with proven track records." },
  { icon: "🔍", title: "100% Transparency", desc: "No hidden charges. Full documentation support. What you see is what you pay." },
  { icon: "🤝", title: "End-to-End Support", desc: "From site visits to home loan assistance to registration — we're with you at every step." },
  { icon: "📱", title: "Tech-Enabled Experience", desc: "Virtual tours, digital documentation, and real-time project updates at your fingertips." },
];

const areaCards = [
  { name: "Mathura", slug: "mathura", desc: "Spiritual & serene. Rising real estate destination.", image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600" },
  { name: "Noida", slug: "noida", desc: "IT hub with world-class infrastructure & connectivity.", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600" },
  { name: "Greater Noida", slug: "greater-noida", desc: "Affordable luxury with metro & expressway access.", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600" },
];

export default function Home() {
  const [leadOpen, setLeadOpen] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchBudget, setSearchBudget] = useState("");
  const [searchBhk, setSearchBhk] = useState("");
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [projects, setProjects] = useState<Tables<"projects">[]>([]);
  const [blogs, setBlogs] = useState<Tables<"blog_posts">[]>([]);
  const [testimonials, setTestimonials] = useState<Tables<"testimonials">[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProjects().then((p) => setProjects(p.filter((x) => x.featured).slice(0, 3)));
    getBlogPosts().then((b) => setBlogs(b.slice(0, 3)));
    getTestimonials().then(setTestimonials);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchLocation) params.set("city", searchLocation);
    if (searchBudget) params.set("budget", searchBudget);
    if (searchBhk) params.set("bhk", searchBhk);
    navigate(`/projects?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onEnquire={() => setLeadOpen(true)} />
      <LeadForm isOpen={leadOpen} onClose={() => setLeadOpen(false)} source="home-hero" />

      {/* ─── Hero ─── */}
      <section className="relative min-h-screen flex items-center">
        <img src={heroBg} alt="Impyreal Homes Hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative container mx-auto px-4 pt-20 pb-16">
          <div className="max-w-3xl">
            <span className="inline-block bg-crimson/90 text-white text-xs font-semibold px-3 py-1.5 mb-4 tracking-wider uppercase">
              India's Premium Real Estate Partner
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              Curated Homes for an <span className="text-gold">Impyreal</span> Life
            </h1>
            <p className="text-lg text-white/80 mb-8 max-w-xl">
              Discover handpicked residential projects in Mathura, Noida, and Greater Noida — crafted for discerning buyers who demand the best.
            </p>
            <div className="bg-white/95 backdrop-blur-sm p-4 shadow-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                <select value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)} className="h-11 border border-input px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="">📍 Select Location</option>
                  {locations.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
                <select value={searchBudget} onChange={(e) => setSearchBudget(e.target.value)} className="h-11 border border-input px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="">💰 Budget Range</option>
                  {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
                <select value={searchBhk} onChange={(e) => setSearchBhk(e.target.value)} className="h-11 border border-input px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="">🏠 BHK Type</option>
                  {bhks.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <Button onClick={handleSearch} className="w-full h-11 bg-crimson hover:bg-crimson-dark text-white font-semibold text-base">
                <Search className="h-4 w-4" /> Search Properties
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 flex items-start justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/70" />
          </div>
        </div>
      </section>

      {/* ─── Stats Bar ─── */}
      <section className="bg-crimson text-white py-5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[["500+", "Happy Families"], ["25+", "Premium Projects"], ["3", "Cities"], ["₹500 Cr+", "Properties Sold"]].map(([num, label]) => (
              <div key={label}><p className="text-2xl font-bold">{num}</p><p className="text-sm text-white/80">{label}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Projects ─── */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-crimson text-sm font-semibold uppercase tracking-wider mb-1">Our Portfolio</p>
            <h2 className="text-3xl font-bold text-navy">Featured Projects</h2>
          </div>
          <a href="/projects" className="text-navy text-sm font-semibold hover:text-crimson flex items-center gap-1 transition-colors">
            View All <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} onEnquire={() => setLeadOpen(true)} />
          ))}
        </div>
      </section>

      {/* ─── Why Impyreal Homes ─── */}
      <section className="section-gradient py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-gold text-sm font-semibold uppercase tracking-wider mb-2">Why Choose Us</p>
            <h2 className="text-3xl font-bold">Why Impyreal Homes?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item) => (
              <div key={item.title} className="bg-white/10 hover:bg-white/15 transition-colors p-6 text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-white/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      {testimonials.length > 0 && (
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <p className="text-crimson text-sm font-semibold uppercase tracking-wider mb-2">Happy Clients</p>
              <h2 className="text-3xl font-bold text-navy">What Our Clients Say</h2>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="bg-white p-8 shadow-sm text-center">
                <div className="flex justify-center gap-1 mb-4">
                  {Array(testimonials[testimonialIdx]?.rating || 5).fill(0).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed italic mb-6">
                  "{testimonials[testimonialIdx]?.review}"
                </p>
                <div>
                  <p className="font-bold text-navy">{testimonials[testimonialIdx]?.name}</p>
                  <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                    <MapPin className="h-3 w-3 text-crimson" />
                    {testimonials[testimonialIdx]?.location} · {testimonials[testimonialIdx]?.project}
                  </p>
                </div>
              </div>
              <div className="flex justify-center gap-2 mt-5">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setTestimonialIdx(i)} className={`h-2.5 transition-all ${i === testimonialIdx ? "w-6 bg-crimson" : "w-2.5 bg-navy/30"}`} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── Area Guides ─── */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-crimson text-sm font-semibold uppercase tracking-wider mb-2">Explore Locations</p>
          <h2 className="text-3xl font-bold text-navy">Area Guides</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {areaCards.map((area) => (
            <a key={area.slug} href={`/areas/${area.slug}`} className="card-hover relative overflow-hidden h-56 block group">
              <img src={area.image} alt={area.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <h3 className="text-white font-bold text-xl">{area.name}</h3>
                <p className="text-white/75 text-sm mt-1">{area.desc}</p>
                <span className="inline-flex items-center gap-1 text-gold text-xs font-semibold mt-2">Explore Guide <ChevronRight className="h-3 w-3" /></span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ─── Blog Preview ─── */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-crimson text-sm font-semibold uppercase tracking-wider mb-1">Insights</p>
              <h2 className="text-3xl font-bold text-navy">Latest Articles</h2>
            </div>
            <a href="/blog" className="text-navy text-sm font-semibold hover:text-crimson flex items-center gap-1 transition-colors">
              All Articles <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogs.map((post) => <BlogCard key={post.id} post={post} />)}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className="bg-crimson text-white py-14">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-3">Ready to Find Your Dream Home?</h2>
          <p className="text-white/80 text-lg mb-7 max-w-xl mx-auto">Talk to our experts today. Free consultation, no obligations.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => setLeadOpen(true)} className="bg-white text-crimson hover:bg-white/90 font-semibold px-8 h-12 text-base">
              Enquire Now — It's Free
            </Button>
            <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white/10 font-semibold px-8 h-12 text-base transition-colors">
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
