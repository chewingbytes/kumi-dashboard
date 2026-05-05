import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";
import { Link } from "react-router-dom";
import kumiLogo from "@/assets/image.png";

const PRICING_TIERS = [
  { label: "100 – 150", min: 100, max: 150, monthly: 120 },
  { label: "150 – 200", min: 150, max: 200, monthly: 160 },
  { label: "250 – 300", min: 250, max: 300, monthly: 220 },
  { label: "350 – 400", min: 350, max: 400, monthly: 280 },
  { label: "400 – 450", min: 400, max: 450, monthly: 320 },
  { label: "450 – 500", min: 450, max: 500, monthly: 360 },
];

export default function PricingPage() {
  const [tierIndex, setTierIndex] = useState(0);
  const selectedTier = PRICING_TIERS[tierIndex];

  return (
    <div className="min-h-screen bg-[#FDFBF5] text-[#111827] font-['DynaPuff'] overflow-x-hidden relative">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-20 -left-10 w-72 h-72 bg-[#8B5CF6]/15 rounded-full blur-3xl" />
        <div className="absolute top-40 right-10 w-80 h-80 bg-[#FBBF24]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/3 w-64 h-64 bg-[#10B981]/15 rounded-full blur-3xl" />
      </div>

      <header className="px-6 md:px-10 py-6 flex items-center justify-between gap-3 border-b-2 border-[#111827] bg-white/80 backdrop-blur-md">
        <div className="flex justify-center items-center gap-2 sm:gap-3">
          <a href="/">
            <img
              src={kumiLogo}
              alt="Kumi Logo"
              className="w-9 h-9 sm:w-12 sm:h-12 shadow-[4px_4px_0px_#1E293B] rounded-full border-2 border-[#1E293B]"
            />
          </a>
          <div className="flex flex-col sm:flex-row sm:items-end sm:gap-1">
            <h1 className="sm:text-2xl font-medium text-lg tracking-tight">
              Kumi
            </h1>
            <p className="capitalize text-[#64748B] mb-1 font-thin tracking-tight text-xs">
              pricing
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 md:px-10 py-12 space-y-10">
        <section className="border-2 border-[#111827] bg-white rounded-3xl shadow-[10px_10px_0px_#111827] p-6 md:p-8 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-20 bg-[#8B5CF6]" />
          <div className="absolute -left-16 bottom-0 w-52 h-52 rotate-6 opacity-10 bg-gradient-to-tr from-[#8B5CF6] to-[#FDFBF5]" />

          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-sm font-semibold text-[#6B7280]">
                Monthly Subscription
              </p>
              <h2 className="text-3xl font-extrabold text-[#111827]">
                Pick your student range
              </h2>
              <p className="text-sm text-[#475569]">
                Slide to preview the exact monthly subscription for your center.
              </p>
            </div>
            <div className="hidden md:flex w-14 h-14 rounded-2xl border-2 border-[#111827] bg-[#8B5CF6]">
              <Zap className="m-auto h-6 w-6 text-white" />
            </div>
          </div>

          <div className="space-y-1">
            <input
              type="range"
              min={0}
              max={PRICING_TIERS.length - 1}
              step={1}
              value={tierIndex}
              onChange={(e) => setTierIndex(Number(e.target.value))}
              className="w-full accent-[#111827]"
            />

            <div className="flex flex-wrap gap-2 justify-between text-xs font-semibold text-[#111827]">
              {PRICING_TIERS.map((tier) => (
                <div key={tier.label}>{tier.label}</div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-6 mt-6">
            <div className="border-2 border-[#111827] rounded-2xl p-5 bg-white/80 shadow-[6px_6px_0px_#111827] space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-extrabold text-[#111827]">
                  Monthly subscription
                </h3>
                <span className="text-sm font-semibold text-[#475569]">
                  Range: {selectedTier.min} – {selectedTier.max} students
                </span>
              </div>

              <div className="text-4xl font-black text-[#111827]">
                ${selectedTier.monthly}
                <span className="text-sm font-semibold text-[#6B7280]">
                  {" "}
                  / month
                </span>
              </div>

              <p className="text-sm text-[#475569]">
                Fixed monthly subscription based on your total active student
                count.
              </p>

              <div className="grid grid-cols-2 gap-3 text-sm text-[#111827]">
                <Stat
                  label="Student count"
                  value={`${selectedTier.min} – ${selectedTier.max}`}
                />
                <Stat label="Monthly fee" value={`$${selectedTier.monthly}`} />
                <Stat label="Billing cycle" value="Monthly" />
                <Stat label="Support" value="Included" />
              </div>
            </div>

            <div className="border-2 border-[#111827] rounded-2xl p-5 bg-white/90 shadow-[6px_6px_0px_#111827] space-y-3">
              <h3 className="text-lg font-extrabold text-[#111827]">
                Pricing table
              </h3>
              <div className="overflow-hidden rounded-xl border-2 border-[#111827]">
                <div className="grid grid-cols-2 bg-[#111827] text-white text-sm font-bold">
                  <div className="px-3 py-2">Student Count</div>
                  <div className="px-3 py-2">Monthly Subscription</div>
                </div>

                {PRICING_TIERS.map((tier, idx) => (
                  <div
                    key={`${tier.label}-${tier.monthly}`}
                    className={cn(
                      "grid grid-cols-2 text-sm border-t border-[#111827]",
                      idx === tierIndex ? "bg-[#FBBF24]/30" : "bg-white",
                    )}
                  >
                    <div className="px-3 py-2 font-semibold">{tier.label}</div>
                    <div className="px-3 py-2 font-black">${tier.monthly}</div>
                  </div>
                ))}
              </div>

              <Link to="/contact">
                <Button className="mt-8 w-full bg-[#8B5CF6] text-white border-2 border-[#111827] shadow-[4px_4px_0px_#111827] hover:translate-y-[-1px]">
                  Contact Us!
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 p-3 rounded-xl border border-slate-200 bg-white/70">
      <span className="text-xs font-semibold text-[#6B7280]">{label}</span>
      <span className="text-base font-bold text-[#111827]">{value}</span>
    </div>
  );
}
