import { useState } from "react";
import { CheckCircle2, Users, Target, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";

const trustPillars = [
  {
    icon: Target,
    title: "Expert Curation",
    desc: "Every project in our portfolio passes a rigorous due-diligence check — legal title, RERA compliance, builder track record, and construction quality.",
  },
  {
    icon: CheckCircle2,
    title: "Radical Transparency",
    desc: "No hidden charges, no inflated prices, no half-truths. We give you the complete picture so you can make informed decisions.",
  },
  {
    icon: Heart,
    title: "Buyer-First Service",
    desc: "We earn only when you're genuinely satisfied. Our advisors work for your interests — not the builder's commission.",
  },
  {
    icon: Users,
    title: "Community & Support",
    desc: "Our relationship doesn't end at possession. We support you through home loans, interior design, and beyond.",
  },
];

const steps = [
  { step: "01", title: "Discovery Call", desc: "Share your requirements with our expert — budget, location, BHK, timeline." },
  { step: "02", title: "Curated Shortlist", desc: "We match you with 2–3 projects that perfectly fit your criteria and budget." },
  { step: "03", title: "Site Visit", desc: "We organize site visits with transport, builder presentation, and expert guidance." },
  { step: "04", title: "Due Diligence", desc: "Legal verification, RERA check, builder background — we do the homework for you." },
  { step: "05", title: "Close & Support", desc: "Home loan assistance, registration support, and possession handover coordination." },
];

export default function About() {
  const [leadOpen, setLeadOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onEnquire={() => setLeadOpen(true)} />
      <LeadForm isOpen={leadOpen} onClose={() => setLeadOpen(false)} source="about" />

      {/* Hero */}
      <div className="bg-navy pt-24 pb-12">
        <div className="container mx-auto px-4">
          <p className="text-gold text-sm font-semibold uppercase tracking-wider mb-2">Our Story</p>
          <h1 className="text-3xl font-bold text-white">Why Impyreal Homes?</h1>
          <p className="text-white/70 mt-2 max-w-2xl">
            Founded with a singular mission: to make premium real estate accessible, transparent, and truly buyer-centric.
          </p>
        </div>
      </div>

      {/* Brand Story */}
      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-bold text-navy mb-4">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Impyreal Homes was born out of a deeply personal frustration. Our founders, having navigated the Indian real estate market themselves, experienced first-hand the opacity, mis-selling, and lack of buyer support that plague the industry.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We set out to build a different kind of real estate firm — one where trust is non-negotiable, where every recommendation is backed by rigorous due diligence, and where the buyer's long-term interest takes precedence over the short-term commission.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, Impyreal Homes serves buyers across NCR, Mathura, and beyond — helping over 500 families find homes that match their aspirations. Our tagline isn't just marketing: <strong className="text-navy">"Curated Homes for an Impyreal Life"</strong> is our promise.
            </p>
          </div>
          <div className="bg-muted rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-6">
              {[
                ["500+", "Happy Families"],
                ["25+", "Projects"],
                ["3", "Cities"],
                ["5★", "Average Rating"],
              ].map(([num, label]) => (
                <div key={label} className="text-center">
                  <p className="text-3xl font-bold text-crimson">{num}</p>
                  <p className="text-sm text-muted-foreground mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Pillars */}
      <section className="section-gradient py-14 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold">Our Core Principles</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {trustPillars.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white/10 hover:bg-white/15 transition-colors rounded-xl p-5">
                <Icon className="h-8 w-8 text-gold mb-3" />
                <h3 className="font-bold mb-2">{title}</h3>
                <p className="text-sm text-white/70">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buying Process */}
      <section className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="text-center mb-10">
          <p className="text-crimson text-sm font-semibold uppercase tracking-wider mb-2">How It Works</p>
          <h2 className="text-2xl font-bold text-navy">Our 5-Step Buying Process</h2>
        </div>
        <div className="space-y-4">
          {steps.map((step, i) => (
            <div key={step.step} className="flex gap-5 items-start">
              <div className="shrink-0 w-12 h-12 rounded-full bg-crimson text-white flex items-center justify-center font-bold text-sm">
                {step.step}
              </div>
              <div className="flex-1 pb-5 border-b border-border last:border-0">
                <h3 className="font-bold text-navy">{step.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Placeholder */}
      <section className="bg-muted py-14">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-navy mb-2">Our Team</h2>
          <p className="text-muted-foreground mb-8">A dedicated team of real estate experts, legal advisors, and customer champions.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {[
              { name: "Arjun Sharma", role: "Founder & CEO" },
              { name: "Priya Kapoor", role: "Head of Sales" },
              { name: "Rahul Verma", role: "Legal Advisor" },
              { name: "Neha Singh", role: "Customer Relations" },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-20 h-20 rounded-full bg-navy/20 mx-auto mb-3 flex items-center justify-center">
                  <Users className="h-8 w-8 text-navy/40" />
                </div>
                <p className="font-semibold text-navy text-sm">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
