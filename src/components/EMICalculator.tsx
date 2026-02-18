import { useState } from "react";
import { Calculator } from "lucide-react";
import { calculateEMI, formatINRFull } from "@/lib/formatters";

export default function EMICalculator() {
  const [principal, setPrincipal] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const emi = calculateEMI(principal, rate, tenure);
  const totalPayment = emi * tenure * 12;
  const totalInterest = totalPayment - principal;

  return (
    <div className="bg-muted rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-5">
        <Calculator className="h-5 w-5 text-crimson" />
        <h3 className="font-bold text-navy text-lg">EMI Calculator</h3>
      </div>

      <div className="space-y-5">
        {/* Principal */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-sm font-medium text-navy">Loan Amount</label>
            <span className="text-sm font-bold text-crimson inr-badge">{formatINRFull(principal)}</span>
          </div>
          <input
            type="range"
            min={1000000}
            max={20000000}
            step={100000}
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full accent-crimson h-1.5"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>₹10L</span>
            <span>₹2 Cr</span>
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-sm font-medium text-navy">Interest Rate</label>
            <span className="text-sm font-bold text-crimson">{rate}% p.a.</span>
          </div>
          <input
            type="range"
            min={6}
            max={15}
            step={0.1}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full accent-crimson h-1.5"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>6%</span>
            <span>15%</span>
          </div>
        </div>

        {/* Tenure */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-sm font-medium text-navy">Loan Tenure</label>
            <span className="text-sm font-bold text-crimson">{tenure} Years</span>
          </div>
          <input
            type="range"
            min={5}
            max={30}
            step={1}
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full accent-crimson h-1.5"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>5 Yr</span>
            <span>30 Yr</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mt-6 bg-navy text-white rounded-xl p-4 grid grid-cols-3 gap-3 text-center">
        <div>
          <p className="text-xs text-white/60 mb-1">Monthly EMI</p>
          <p className="font-bold text-base inr-badge">{formatINRFull(emi)}</p>
        </div>
        <div>
          <p className="text-xs text-white/60 mb-1">Total Interest</p>
          <p className="font-bold text-base text-crimson-light inr-badge">{formatINRFull(Math.round(totalInterest))}</p>
        </div>
        <div>
          <p className="text-xs text-white/60 mb-1">Total Amount</p>
          <p className="font-bold text-base inr-badge">{formatINRFull(Math.round(totalPayment))}</p>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-3 text-center">
        *Indicative EMI. Actual figures may vary based on bank terms.
      </p>
    </div>
  );
}
