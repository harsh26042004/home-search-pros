const WA_PHONE = "919876543210";

export function getWhatsAppUrl(context?: {
  projectName?: string;
  page?: string;
  bhk?: string;
  location?: string;
}): string {
  let message = "Hi, I am interested in properties at Impyreal Homes.";

  if (context?.projectName) {
    message = `Hi, I'm interested in *${context.projectName}*. Please share more details about pricing, availability, and site visit options.`;
    if (context.bhk) {
      message = `Hi, I'm interested in a *${context.bhk}* unit at *${context.projectName}*. Please share pricing and availability.`;
    }
  } else if (context?.location) {
    message = `Hi, I'm looking for properties in *${context.location}*. Can you help me find the right home?`;
  } else if (context?.page === "contact") {
    message = "Hi, I'd like to connect with the Impyreal Homes team regarding a property enquiry.";
  }

  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(message)}`;
}
