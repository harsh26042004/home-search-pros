// INR Indian number formatting
export function formatINR(amount: number): string {
  if (amount >= 10000000) {
    const crores = amount / 10000000;
    return `₹${crores % 1 === 0 ? crores.toFixed(0) : crores.toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    const lakhs = amount / 100000;
    return `₹${lakhs % 1 === 0 ? lakhs.toFixed(0) : lakhs.toFixed(2)} L`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function formatINRFull(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function formatPriceRange(min: number, max: number): string {
  return `${formatINR(min)} – ${formatINR(max)}`;
}

// EMI Calculator
export function calculateEMI(
  principal: number,
  annualRate: number,
  tenureYears: number
): number {
  const monthlyRate = annualRate / 12 / 100;
  const n = tenureYears * 12;
  if (monthlyRate === 0) return principal / n;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) /
    (Math.pow(1 + monthlyRate, n) - 1);
  return Math.round(emi);
}
