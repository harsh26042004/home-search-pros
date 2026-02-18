import { useParams } from "react-router-dom";
import { Train, Building, TrendingUp, Coffee, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";
import { useState } from "react";

const areaData: Record<string, {
  name: string;
  tagline: string;
  image: string;
  connectivity: string[];
  infrastructure: string[];
  priceTrend: { year: string; price: string }[];
  lifestyle: string[];
  highlights: { icon: string; value: string; label: string }[];
}> = {
  mathura: {
    name: "Mathura",
    tagline: "Spiritual Heritage Meets Modern Living",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1200",
    connectivity: [
      "Yamuna Expressway: 5 minutes — connects directly to Noida & Greater Noida",
      "Mathura Junction Railway Station: 8 km — trains to Delhi, Agra, Mumbai",
      "Agra (Taj Mahal): 55 km via NH19",
      "Delhi: 145 km via Yamuna Expressway (~2 hours)",
      "Proposed Metro study for Mathura-Vrindavan corridor",
    ],
    infrastructure: [
      "Mathura-Vrindavan Development Authority (MVDA) ₹12,000 Cr master plan",
      "4-lane ring road project underway",
      "New commercial complexes on Vrindavan Road",
      "Government medical college & AIIMS-affiliated facility planned",
      "Smart city features: LED lighting, CCTV, WiFi zones",
    ],
    priceTrend: [
      { year: "2021", price: "₹2,800/sq.ft" },
      { year: "2022", price: "₹3,400/sq.ft" },
      { year: "2023", price: "₹4,100/sq.ft" },
      { year: "2024", price: "₹4,800/sq.ft" },
      { year: "2025*", price: "₹5,500/sq.ft" },
    ],
    lifestyle: [
      "ISKCON Temple — 3 km from Vrindavan Road projects",
      "Mathura Refinery Sports Complex",
      "Radhashtami & Holi celebrations attract 25M+ pilgrims annually",
      "Delhi Public School, Ryan International School branches",
      "Multiple malls & multiplexes planned on bypass road",
    ],
    highlights: [
      { icon: "📈", value: "25%", label: "Annual Appreciation" },
      { icon: "🛕", value: "25M+", label: "Annual Pilgrims" },
      { icon: "🏠", value: "₹4,500+", label: "Per Sq.ft" },
      { icon: "🔑", value: "RERA", label: "Regulated Market" },
    ],
  },
  noida: {
    name: "Noida",
    tagline: "India's IT Capital — World-Class Living",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200",
    connectivity: [
      "Delhi Metro Blue Line: 20+ stations across Noida",
      "Yamuna Expressway: Noida to Agra in under 90 minutes",
      "DND Flyway: Direct Delhi access in 20 minutes",
      "Noida-Greater Noida Expressway: Fully operational 6-lane highway",
      "Hindon Airport (proposed terminal expansion): 15 km",
    ],
    infrastructure: [
      "Sector 150 Sports City: ₹5,000 Cr development",
      "Film City: Greenfield mega-project under development",
      "Noida International Airport (Jewar): 40 km, opening 2025-26",
      "AIIMS Noida: Fully operational",
      "Noida Authority's smart city mission — 3,000+ km CCTV network",
    ],
    priceTrend: [
      { year: "2021", price: "₹6,200/sq.ft" },
      { year: "2022", price: "₹7,800/sq.ft" },
      { year: "2023", price: "₹9,500/sq.ft" },
      { year: "2024", price: "₹11,200/sq.ft" },
      { year: "2025*", price: "₹13,000/sq.ft" },
    ],
    lifestyle: [
      "The Great India Place & DLF Mall of India",
      "Fortis, Kailash, Felix hospitals within 5 km",
      "Amity University, Sharda University",
      "Cultural Centre, Sector 18 market",
      "F1 racing track (Buddh International Circuit) nearby",
    ],
    highlights: [
      { icon: "💻", value: "1,000+", label: "IT Companies" },
      { icon: "🚇", value: "35 km", label: "Metro Network" },
      { icon: "🏠", value: "₹12,000+", label: "Per Sq.ft" },
      { icon: "✈️", value: "40 km", label: "To Jewar Airport" },
    ],
  },
  "greater-noida": {
    name: "Greater Noida",
    tagline: "Planned City, Unmatched Value",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
    connectivity: [
      "Aqua Line Metro: Connects to Blue Line at Noida Sector 52",
      "Greater Noida Expressway: 6-lane divided highway",
      "Yamuna Expressway: Direct to Agra & Jewar Airport",
      "Delhi: 50 km via DND + Yamuna Expressway",
      "Jewar International Airport: 25 km — key growth driver",
    ],
    infrastructure: [
      "GNIDA Master Plan 2041: 100% planned township",
      "Gaur City & Omaxe mixed-use townships",
      "Galgotias, Sharda, Gautam Buddha universities",
      "Pari Chowk — commercial & retail hub",
      "Data center & logistics park cluster emerging",
    ],
    priceTrend: [
      { year: "2021", price: "₹3,200/sq.ft" },
      { year: "2022", price: "₹3,800/sq.ft" },
      { year: "2023", price: "₹4,400/sq.ft" },
      { year: "2024", price: "₹5,200/sq.ft" },
      { year: "2025*", price: "₹6,000/sq.ft" },
    ],
    lifestyle: [
      "Worlds of Wonder & Worlds of Wonder Night Safari",
      "India Expo Mart — international exhibitions",
      "Stadium & sports facilities",
      "MAX, D-Mart, Big Bazaar hypermarkets",
      "Planned golf course & convention center",
    ],
    highlights: [
      { icon: "🏙️", value: "100%", label: "Planned City" },
      { icon: "🎓", value: "50+", label: "Universities" },
      { icon: "🏠", value: "₹5,500+", label: "Per Sq.ft" },
      { icon: "✈️", value: "25 km", label: "To Jewar Airport" },
    ],
  },
};

export default function AreaGuide() {
  const { slug } = useParams<{ slug: string }>();
  const [leadOpen, setLeadOpen] = useState(false);
  const area = areaData[slug || "mathura"];

  if (!area) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header onEnquire={() => setLeadOpen(true)} />
      <LeadForm isOpen={leadOpen} onClose={() => setLeadOpen(false)} source={`area-${slug}`} />

      {/* Hero */}
      <div className="relative h-72 mt-16 overflow-hidden">
        <img src={area.image} alt={area.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 flex items-center container mx-auto px-4">
          <div>
            <p className="text-gold text-sm font-semibold uppercase tracking-wider mb-2">Area Guide</p>
            <h1 className="text-4xl font-bold text-white">{area.name}</h1>
            <p className="text-white/80 mt-1">{area.tagline}</p>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="bg-navy py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-white">
            {area.highlights.map((h) => (
              <div key={h.label}>
                <div className="text-3xl mb-1">{h.icon}</div>
                <p className="text-xl font-bold">{h.value}</p>
                <p className="text-sm text-white/70">{h.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Connectivity */}
        <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Train className="h-5 w-5 text-crimson" />
            <h2 className="font-bold text-navy text-lg">Connectivity</h2>
          </div>
          <ul className="space-y-2.5">
            {area.connectivity.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-crimson shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Infrastructure */}
        <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Building className="h-5 w-5 text-crimson" />
            <h2 className="font-bold text-navy text-lg">Infrastructure</h2>
          </div>
          <ul className="space-y-2.5">
            {area.infrastructure.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-crimson mt-0.5">→</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Price Trends */}
        <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-crimson" />
            <h2 className="font-bold text-navy text-lg">Price Trends</h2>
          </div>
          <div className="space-y-2">
            {area.priceTrend.map((pt) => (
              <div key={pt.year} className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-12">{pt.year}</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-crimson rounded-full"
                    style={{
                      width: `${Math.round(
                        (parseInt(pt.price.replace(/[^\d]/g, "")) / 15000) * 100
                      )}%`,
                    }}
                  />
                </div>
                <span className="text-sm font-semibold text-navy inr-badge">{pt.price}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">*2025 is estimated. Past performance is not a guarantee of future returns.</p>
        </div>

        {/* Lifestyle */}
        <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Coffee className="h-5 w-5 text-crimson" />
            <h2 className="font-bold text-navy text-lg">Lifestyle & Amenities</h2>
          </div>
          <ul className="space-y-2.5">
            {area.lifestyle.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-gold mt-0.5">★</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-navy py-12 text-white text-center">
        <h2 className="text-2xl font-bold mb-3">Looking for Properties in {area.name}?</h2>
        <p className="text-white/70 mb-6">Get expert guidance and schedule a free site visit today.</p>
        <button
          onClick={() => setLeadOpen(true)}
          className="bg-crimson hover:bg-crimson-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Enquire Now
        </button>
      </div>

      <Footer />
    </div>
  );
}
