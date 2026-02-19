import { useState } from "react";
import { useForm } from "react-hook-form";
import { Phone, Mail, MapPin, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { saveLead } from "@/lib/storage";
import { toast } from "@/hooks/use-toast";
import { getWhatsAppUrl } from "@/lib/whatsapp";

interface ContactFormValues {
  name: string;
  phone: string;
  email: string;
  location_pref: string;
  budget: string;
  bhk: string;
  message: string;
}

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>();

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitting(true);
    try {
      saveLead({ ...data, source: "contact-page", purpose: "general-enquiry", status: "new" });
      toast({ title: "Message received!", description: "We'll get back to you within 24 hours." });
      reset();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="bg-navy pt-24 pb-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white">Contact Us</h1>
          <p className="text-white/70 mt-1">We're here to help. Reach out anytime.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl">
        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-bold text-navy mb-6">Get In Touch</h2>
          <div className="space-y-5">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-crimson/10 flex items-center justify-center shrink-0">
                <MapPin className="h-4 w-4 text-crimson" />
              </div>
              <div>
                <p className="font-semibold text-navy text-sm">Office Address</p>
                <p className="text-sm text-muted-foreground mt-0.5">402, Tower B, Iconic Cowork, Sector 62, Noida, UP 201309</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-crimson/10 flex items-center justify-center shrink-0">
                <Phone className="h-4 w-4 text-crimson" />
              </div>
              <div>
                <p className="font-semibold text-navy text-sm">Phone</p>
                <a href="tel:+919876543210" className="text-sm text-muted-foreground hover:text-crimson transition-colors">
                  +91 98765 43210
                </a>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-crimson/10 flex items-center justify-center shrink-0">
                <Mail className="h-4 w-4 text-crimson" />
              </div>
              <div>
                <p className="font-semibold text-navy text-sm">Email</p>
                <a href="mailto:info@impyrealhomes.com" className="text-sm text-muted-foreground hover:text-crimson transition-colors">
                  info@impyrealhomes.com
                </a>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <MessageSquare className="h-4 w-4 text-green-700" />
              </div>
              <div>
                <p className="font-semibold text-navy text-sm">WhatsApp</p>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-green-700 hover:underline"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="mt-8 rounded-2xl overflow-hidden border border-border h-52">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.6!2d77.3665!3d28.6208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce55b58e50001%3A0x6b3c4a4f7b5c30e!2sSector%2062%2C%20Noida!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
            />
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-navy mb-5">Send Us a Message</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Full Name *" {...register("name", { required: true })} className={errors.name ? "border-crimson" : ""} />
              <Input
                placeholder="Phone *"
                type="tel"
                {...register("phone", { required: true })}
                className={errors.phone ? "border-crimson" : ""}
              />
            </div>
            <Input placeholder="Email" type="email" {...register("email")} />
            <div className="grid grid-cols-2 gap-3">
              <select {...register("location_pref")} className="h-10 border border-input rounded-md px-3 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="">Preferred Location</option>
                {["Mathura", "Noida", "Greater Noida", "Any"].map((l) => <option key={l}>{l}</option>)}
              </select>
              <select {...register("bhk")} className="h-10 border border-input rounded-md px-3 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="">BHK Type</option>
                {["2 BHK", "3 BHK", "4 BHK"].map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>
            <select {...register("budget")} className="w-full h-10 border border-input rounded-md px-3 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="">Budget Range</option>
              {["Under ₹50L", "₹50L–₹1Cr", "₹1Cr–₹2Cr", "Above ₹2Cr"].map((b) => <option key={b}>{b}</option>)}
            </select>
            <textarea
              placeholder="Your Message"
              rows={4}
              {...register("message")}
              className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
            <Button type="submit" disabled={submitting} className="w-full bg-crimson hover:bg-crimson-dark text-white h-11">
              {submitting ? "Sending..." : <><Send className="h-4 w-4" /> Send Message</>}
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
