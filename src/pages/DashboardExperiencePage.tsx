import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Clock3,
  LayoutDashboard,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import sentVideo from "@/assets/askkumi.mp4";

const dashboardMoments = [
  {
    title: "Live attendance overview",
    description:
      "Instructors can see who is currently in class, who has left, or past daily records of classes.",
    icon: LayoutDashboard,
    accent: "#3B82F6",
  },
  {
    title: "Time-based insights",
    description:
      "Session duration, busy dismissal windows, and arrival timing patterns become visible without exporting spreadsheets.",
    icon: Clock3,
    accent: "#60A5FA",
  },
  {
    title: "Plain-language prompts",
    description:
      "'Who spent more than 30 minutes today?' Ask Kumi in the Dashboard in plain English and get instant answers.",
    icon: BrainCircuit,
    accent: "#93C5FD",
  },
];

// const insightCards = [
//   {
//     title: "Peak pickup monitoring",
//     body: "Visuals here can show how many students are waiting for pickup, what the average wait time looks like, and which windows create the most congestion.",
//     image: "https://picsum.photos/seed/kumi-dashboard-peak/900/680",
//   },
//   {
//     title: "Center performance snapshots",
//     body: "This section can explain how staff use summary panels to review attendance consistency, late arrivals, and departures over time.",
//     image: "https://picsum.photos/seed/kumi-dashboard-performance/900/680",
//   },
//   {
//     title: "Actionable drill-downs",
//     body: "Detailed drill-down views help center owners move from a high-level chart into the specific students or sessions behind the number.",
//     image: "https://picsum.photos/seed/kumi-dashboard-drilldown/900/680",
//   },
// ];

export default function DashboardExperiencePage() {
  return (
    <div className="min-h-screen bg-[#FFFDF5] text-[#1E293B] font-['DynaPuff'] overflow-x-hidden">
      <header className="border-b-2 border-[#1E293B] bg-white/85 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-[#475569] hover:text-[#1E293B]"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <Link to="/dashboard">
            <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B] rounded-full font-bold">
              Explore Demo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="px-6 py-16 space-y-24">
        <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <div className="space-y-6 col-span-2">
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-[#1E293B] bg-[#DBEAFE] px-4 py-2 shadow-[4px_4px_0px_#1E293B] text-sm">
              <BarChart3 className="w-4 h-4" /> Dashboard Experience
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold leading-tight text-[#1E293B]">
              Make faster and calmer decisions.
            </h1>
            <p className="text-lg leading-relaxed text-[#64748B] max-w-xl">
              View each student&apos;s lesson duration, track how many parent
              messages were sent and seen, and review class-period details such
              as check-in and check-out times. You can also download daily or past classes Excel
              reports directly to your phone or computer.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border-2 border-[#1E293B] bg-white p-5 shadow-[6px_6px_0px_#3B82F6]">
                <Users className="w-6 h-6 mb-3" />
                <p className="text-sm text-[#64748B]">
                  Track active students in one glance.
                </p>
              </div>
              <div className="rounded-2xl border-2 border-[#1E293B] bg-white p-5 shadow-[6px_6px_0px_#93C5FD]">
                <Clock3 className="w-6 h-6 mb-3" />
                <p className="text-sm text-[#64748B]">
                  Spot time-based bottlenecks fast.
                </p>
              </div>
              <div className="rounded-2xl border-2 border-[#1E293B] bg-white p-5 shadow-[6px_6px_0px_#60A5FA]">
                <ShieldCheck className="w-6 h-6 mb-3" />
                <p className="text-sm text-[#64748B]">
                  Keep operational visibility controlled and clear.
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-3">
            <div className="relative">
              <div className="relative z-10 overflow-hidden rounded-tl-[100px] rounded-tr-[40px] rounded-br-[100px] rounded-bl-[40px] border-2 border-[#1E293B] bg-white shadow-[12px_12px_0px_#1E293B]">
                <video
                  src={sentVideo}
                  autoPlay
                  loop
                  muted
                  className="h-auto w-full object-cover"
                />
              </div>
              <div className="absolute -top-7 -right-7 z-20 flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#1E293B] bg-[#3B82F6] shadow-[4px_4px_0px_#1E293B]">
                <LayoutDashboard className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -bottom-6 -left-6 z-0 h-full w-full rounded-tl-[100px] rounded-tr-[40px] rounded-br-[100px] rounded-bl-[40px] border-2 border-[#1E293B] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjRjFGNUY5Ii8+CjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIxIiBmaWxsPSIjQ0JENVExIi8+Cjwvc3ZnPg==')] opacity-50" />
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto space-y-8">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-4xl font-bold">
              The story the dashboard tells
            </h2>
            <p className="text-lg text-[#64748B] leading-relaxed"></p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dashboardMoments.map((moment) => {
              const Icon = moment.icon;
              return (
                <article
                  key={moment.title}
                  className="rounded-2xl border-2 border-[#1E293B] bg-white p-6 shadow-[8px_8px_0px_#1E293B]"
                >
                  <div
                    className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border-2 border-[#1E293B]"
                    style={{ backgroundColor: moment.accent }}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{moment.title}</h3>
                  <p className="text-[#64748B] leading-relaxed">
                    {moment.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="max-w-6xl mx-auto items-start">
          <aside className="rounded-3xl border-2 border-[#1E293B] bg-[#EFF6FF] p-8 shadow-[10px_10px_0px_#BFDBFE] space-y-4">
            <h3 className="text-2xl font-bold">
              Examples of questions Kumi can answer
            </h3>
            {[
              "Who is still in class right now?",
              "Which students had the longest session today?",
              "When do pickup queues usually start building up?",
              "Which days have the highest late-arrival count?",
              "What changed compared to last week?",
            ].map((question) => (
              <div
                key={question}
                className="rounded-2xl border-2 border-[#1E293B] bg-white px-4 py-3 text-[#475569] shadow-[4px_4px_0px_#BFDBFE]"
              >
                {question}
              </div>
            ))}
          </aside>
        </section>

        <section className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h2 className="text-4xl font-bold">{" "}</h2>
            <Link
              to="/features/whatsapp-notifications"
              className="text-green-600 hover:text-green-700 underline underline-offset-4"
            >
              Previous: WhatsApp notifications
            </Link>
          </div>
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insightCards.map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-3xl border-2 border-[#1E293B] bg-white shadow-[8px_8px_0px_#1E293B]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-56 w-full object-cover mix-blend-multiply"
                />
                <div className="p-6 space-y-3">
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="text-[#64748B] leading-relaxed">{item.body}</p>
                </div>
              </article>
            ))}
          </div> */}
        </section>
      </main>
    </div>
  );
}
