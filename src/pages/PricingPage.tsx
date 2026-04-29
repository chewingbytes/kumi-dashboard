import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sparkles, Zap, ArrowLeft } from "lucide-react";

const TIERS = [
  { label: "50-100 students", min: 50, max: 100 },
  { label: "100-150 students", min: 100, max: 150 },
  { label: "150-200 students", min: 150, max: 200 },
  { label: "200-250 students", min: 200, max: 250 },
  { label: "250-300 students", min: 250, max: 300 },
];

const PRICING = {
  email: {
    name: "Email Notifications",
    accent: "#8B5CF6",
    base: 15,
    perStudent: 0.05,
    overage: 0.07,
    perks: [
      "Unlimited templates & branding",
      "Delivery analytics included",
      "Smart retries for bounced emails",
    ],
  },
  whatsapp: {
    name: "WhatsApp Notifications",
    accent: "#10B981",
    base: 25,
    perStudent: 0.08,
    overage: 0.1,
    perks: [
      "Official API throughput",
      "Read receipts + timestamps",
      "Auto parent follow-ups",
    ],
  },
};

type Channel = keyof typeof PRICING;

export default function PricingPage() {
  const [channel, setChannel] = useState<Channel>("email");
  const [tierIndex, setTierIndex] = useState(0);

  const currentTier = TIERS[tierIndex];
  const plan = PRICING[channel];

  const estimate = useMemo(() => {
    const mid = (currentTier.min + currentTier.max) / 2;
    const monthly = plan.base + mid * plan.perStudent;
    const overage = plan.overage;
    return { mid, monthly, overage };
  }, [currentTier, plan]);

  return (
    <div className="min-h-screen bg-[#FDFBF5] text-[#111827] font-['Plus_Jakarta_Sans'] overflow-x-hidden relative">
      {/* playful background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-20 -left-10 w-72 h-72 bg-[#8B5CF6]/15 rounded-full blur-3xl" />
        <div className="absolute top-40 right-10 w-80 h-80 bg-[#FBBF24]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/3 w-64 h-64 bg-[#10B981]/15 rounded-full blur-3xl" />
      </div>

      <header className="px-6 md:px-10 py-6 flex items-center justify-between gap-3 border-b-2 border-[#111827] bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white border-2 border-[#111827] shadow-[4px_4px_0px_#111827] flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-[#8B5CF6]" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#6B7280] tracking-wide">Kumi Pricing</p>
            <h1 className="text-2xl font-extrabold tracking-tight">Notifications that scale playfully</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/">
            <Button variant="outline" className="border-2 border-[#111827] shadow-[3px_3px_0px_#111827] text-sm rounded-full">
              <ArrowLeft className="h-4 w-4 mr-2" /> Home
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white border-2 border-[#111827] shadow-[4px_4px_0px_#111827] rounded-full">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 md:px-10 py-12 space-y-10">
        <Tabs value={channel} onValueChange={(v) => setChannel(v as Channel)} className="space-y-8">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto rounded-full border-2 border-[#111827] bg-white shadow-[6px_6px_0px_#111827]">
            <TabsTrigger value="email" className="data-[state=active]:bg-[#8B5CF6] data-[state=active]:text-white font-bold rounded-full">
              Email
            </TabsTrigger>
            <TabsTrigger value="whatsapp" className="data-[state=active]:bg-[#10B981] data-[state=active]:text-white font-bold rounded-full">
              WhatsApp
            </TabsTrigger>
          </TabsList>

          <TabsContent value="email">
            <PricingPanel channel="email" tierIndex={tierIndex} setTierIndex={setTierIndex} />
          </TabsContent>
          <TabsContent value="whatsapp">
            <PricingPanel channel="whatsapp" tierIndex={tierIndex} setTierIndex={setTierIndex} />
          </TabsContent>
        </Tabs>

        <div className="grid md:grid-cols-3 gap-4">
          {["Predictable", "Transparent", "Usage-aware"].map((pill, idx) => (
            <div
              key={pill}
              className="flex items-center gap-3 border-2 border-[#111827] bg-white p-4 rounded-2xl shadow-[6px_6px_0px_#111827]"
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-xl border-2 border-[#111827] flex items-center justify-center text-white font-black",
                  idx === 0 && "bg-[#8B5CF6]",
                  idx === 1 && "bg-[#FBBF24] text-[#111827]",
                  idx === 2 && "bg-[#10B981]"
                )}
              >
                {idx + 1}
              </div>
              <div className="text-sm font-semibold text-[#1F2937]">{pill}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

interface PanelProps {
  channel: Channel;
  tierIndex: number;
  setTierIndex: (v: number) => void;
}

function PricingPanel({ channel, tierIndex, setTierIndex }: PanelProps) {
  const plan = PRICING[channel];
  const tier = TIERS[tierIndex];
  const mid = (tier.min + tier.max) / 2;
  const estMonthly = plan.base + mid * plan.perStudent;

  return (
    <div className="space-y-6">
      <div className="border-2 border-[#111827] bg-white rounded-3xl shadow-[10px_10px_0px_#111827] p-6 md:p-8 relative overflow-hidden">
        <div
          className="absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-20"
          style={{ background: plan.accent }}
        />
        <div className="absolute -left-16 bottom-0 w-52 h-52 rotate-6 opacity-10"
          style={{ background: `linear-gradient(135deg, ${plan.accent}, #FDFBF5)` }}
        />

        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-sm font-semibold text-[#6B7280]">{plan.name}</p>
            <h2 className="text-3xl font-extrabold text-[#111827]">Pick your student range</h2>
            <p className="text-sm text-[#475569]">Drag the slider to see estimated monthly cost.</p>
          </div>
          <div className="hidden md:flex w-14 h-14 rounded-2xl border-2 border-[#111827]" style={{ background: plan.accent }}>
            <Zap className="m-auto h-6 w-6 text-white" />
          </div>
        </div>

        <div className="space-y-4">
          <input
            type="range"
            min={0}
            max={TIERS.length - 1}
            step={1}
            value={tierIndex}
            onChange={(e) => setTierIndex(Number(e.target.value))}
            className="w-full accent-[#111827]"
          />
          <div className="flex flex-wrap gap-2 justify-between text-xs font-semibold text-[#111827]">
            {TIERS.map((t, idx) => (
              <div
                key={t.label}
                className={cn(
                  "px-3 py-2 border-2 border-[#111827] rounded-full",
                  idx === tierIndex ? "bg-[#111827] text-white" : "bg-white"
                )}
              >
                {t.label}
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-6 mt-6">
          <div className="border-2 border-[#111827] rounded-2xl p-5 bg-white/80 shadow-[6px_6px_0px_#111827] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-[#111827]">Estimate</h3>
              <span className="text-sm font-semibold text-[#475569]">Range: {tier.min}-{tier.max}</span>
            </div>
            <div className="text-4xl font-black text-[#111827]">
              ${estMonthly.toFixed(2)}
              <span className="text-sm font-semibold text-[#6B7280]"> / month</span>
            </div>
            <p className="text-sm text-[#475569]">Includes base ${plan.base.toFixed(0)} + ~{mid.toFixed(0)} students @ ${plan.perStudent.toFixed(2)} each.</p>
            <div className="grid grid-cols-2 gap-3 text-sm text-[#111827]">
              <Stat label="Base" value={`$${plan.base.toFixed(2)}`} />
              <Stat label="Per student" value={`$${plan.perStudent.toFixed(2)}`} />
              <Stat label="Avg students" value={`${mid.toFixed(0)}`} />
              <Stat label="Overage" value={`$${plan.overage.toFixed(2)}/student`} />
            </div>
          </div>

          <div className="border-2 border-[#111827] rounded-2xl p-5 bg-white/90 shadow-[6px_6px_0px_#111827] space-y-3">
            <h3 className="text-lg font-extrabold text-[#111827]">What you get</h3>
            <ul className="space-y-2 text-sm text-[#1F2937] list-disc list-inside">
              {plan.perks.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
              <li>Usage synced to billing every month</li>
              <li>Support for multi-center rollups</li>
            </ul>
            <Button
              className="mt-2 w-full bg-[#111827] text-white border-2 border-[#111827] shadow-[4px_4px_0px_#111827] hover:translate-y-[-1px]"
              style={{ background: plan.accent, borderColor: "#111827" }}
            >
              Talk to sales
            </Button>
          </div>
        </div>
      </div>
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
