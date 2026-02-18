import { useState } from "react";
import { useForm } from "react-hook-form";
import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { saveLead } from "@/lib/storage";
import { qualifyLeadWithAI } from "@/lib/aiStub";
import { toast } from "@/hooks/use-toast";

interface LeadFormProps {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
  projectId?: string;
  projectName?: string;
}

interface FormValues {
  name: string;
  phone: string;
  email: string;
  location_pref: string;
  budget: string;
  bhk: string;
  purpose: string;
  message: string;
}

const budgetOptions = [
  "Under ₹25 Lakh",
  "₹25L – ₹50L",
  "₹50L – ₹75L",
  "₹75L – ₹1 Cr",
  "₹1 Cr – ₹2 Cr",
  "Above ₹2 Cr",
];

const bhkOptions = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "Villa/Plot"];
const purposeOptions = [
  { value: "end-use", label: "End Use (Self-Living)" },
  { value: "investment", label: "Investment" },
  { value: "just-browsing", label: "Just Browsing" },
];

export default function LeadForm({ isOpen, onClose, source = "website", projectId, projectName }: LeadFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();

  if (!isOpen) return null;

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    try {
      const lead = saveLead({
        ...data,
        source,
        project_id: projectId,
        project_name: projectName,
        status: "new",
      });
      // AI qualification (async, non-blocking)
      qualifyLeadWithAI(lead).catch(console.error);
      toast({
        title: "Thank you for your enquiry!",
        description: "Our team will reach out to you within 24 hours.",
      });
      reset();
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in">
        {/* Header */}
        <div className="bg-navy text-white p-6 rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <h2 className="text-xl font-bold">Enquire Now</h2>
          {projectName && (
            <p className="text-white/70 text-sm mt-1">For: {projectName}</p>
          )}
          <p className="text-white/60 text-xs mt-0.5">
            Get expert guidance & schedule a free site visit
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 sm:col-span-1">
              <Input
                placeholder="Full Name *"
                {...register("name", { required: true })}
                className={errors.name ? "border-crimson" : ""}
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Input
                placeholder="Phone Number *"
                type="tel"
                {...register("phone", { required: true, pattern: /^[6-9]\d{9}$/ })}
                className={errors.phone ? "border-crimson" : ""}
              />
              {errors.phone && (
                <p className="text-xs text-crimson mt-1">Enter valid 10-digit mobile number</p>
              )}
            </div>
          </div>

          <Input
            placeholder="Email Address"
            type="email"
            {...register("email")}
          />

          <select
            {...register("location_pref")}
            className="w-full h-10 border border-input rounded-md px-3 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Preferred Location</option>
            {["Mathura", "Noida", "Greater Noida", "Agra", "Any"].map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>

          <div className="grid grid-cols-2 gap-3">
            <select
              {...register("budget")}
              className="h-10 border border-input rounded-md px-3 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Budget Range</option>
              {budgetOptions.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>

            <select
              {...register("bhk")}
              className="h-10 border border-input rounded-md px-3 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">BHK Type</option>
              {bhkOptions.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>

          <select
            {...register("purpose")}
            className="w-full h-10 border border-input rounded-md px-3 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Purpose of Purchase</option>
            {purposeOptions.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>

          <textarea
            placeholder="Message (optional)"
            rows={3}
            {...register("message")}
            className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />

          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-crimson hover:bg-crimson-dark text-white h-11 text-base font-semibold"
          >
            {submitting ? (
              "Submitting..."
            ) : (
              <>
                <Send className="h-4 w-4" />
                Submit Enquiry
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            🔒 Your information is 100% secure and will not be shared.
          </p>
        </form>
      </div>
    </div>
  );
}
