import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  MonitorSmartphone,
  QrCode,
  School,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const rolloutSteps = [
  {
    title: "Map the check-in point",
    description:
      "We define where the device stand lives, what the student flow looks like, and how instructors can quickly verify successful scans during arrival and departure windows.",
    icon: School,
    accent: "#EF4444",
  },
  {
    title: "Prepare the device station",
    description:
      "A tablet or iPad is mounted on a stable stand with a bright, simple interface so students can scan in seconds without asking for help.",
    icon: MonitorSmartphone,
    accent: "#F87171",
  },
  {
    title: "Issue QR identity labels",
    description:
      "Our team will print out QR codes for each of your students, and each QR code will be slid into the back of each folder's name card.",
    icon: QrCode,
    accent: "#FCA5A5",
  },
];

const operationalQnA = [
  {
    question: "What if the student forgets to scan out?",
    answer:
      "We provide a service where a representative will be there onsite to help students adapt to the new system.",
  },
  {
    question: "How much work do I have to do to set this up?",
    answer:
      "For a smoother setup, we can provide a local Singapore number, or you may use your own. You'll just need your own device and stand.",
  },
  {
    question: "Is this PDPA compliant? Where is the data stored?",
    answer:
      "All data is stored in a GDPR-compliant data center, which meets Singapore’s PDPA requirements",
  },
];

const gallery = [
  {
    title: "Front-desk scan point",
    body: "A bright, highly visible station near the entrance helps students check in naturally as they arrive.",
    image: "/src/assets/edited/bigverticalview.jpg",
  },
  {
    title: "Student card pack",
    body: "Sample scannable labels can be printed, cut, and distributed during onboarding week.",
    image: "/src/assets/edited/qrcodeimplementation.jpg",
  },
  {
    title: "Quick Demo",
    body: "Here is a quick video on how it will look like.",
    video: "/src/assets/edited/checkin_demo.mp4",
  },
];

export default function QrImplementationPage() {
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
            <Button className="bg-[#EF4444] hover:bg-[#DC2626] text-white border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B] rounded-full font-bold">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="px-6 py-16 space-y-24">
        <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-[#1E293B] bg-[#FEE2E2] px-4 py-2 shadow-[4px_4px_0px_#1E293B] text-sm">
              <QrCode className="w-4 h-4" /> Implementation
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold leading-tight text-[#1E293B]">
              A QR rollout that feels simple for students and operational for
              staff.
            </h1>
            <p className="text-lg leading-relaxed text-[#64748B] max-w-xl">
              We will handle the printing of each QR code for every student.
              Kumi will see each QR Code, and use them to notify parents when respective students are finished with class.
            </p>
            <div className="grid grid-cols-1 gap-6">
              <div className="rounded-2xl border-2 border-[#1E293B] bg-white p-5 shadow-[6px_6px_0px_#FCA5A5] max-w-sm">
                <p className="text-3xl font-bold">1 scan</p>
                <p className="text-sm text-[#64748B] mt-2">
                  Students only need one simple interaction at arrival or
                  departure.
                </p>
              </div>
              <Link to="/dashboard">
                <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1E293B] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_#1E293B] transition-all rounded-full font-bold">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div>
            <div className="relative">
              <div className="relative z-10 overflow-hidden rounded-tl-[100px] rounded-tr-[40px] rounded-br-[100px] rounded-bl-[40px] border-2 border-[#1E293B] bg-white shadow-[12px_12px_0px_#1E293B]">
                <img
                  src="/src/assets/edited/qrcodeimplementation.jpg"
                  alt="QR code rollout mockup"
                  className="h-full w-full object-cover mix-blend-multiply"
                />
              </div>
              <div className="absolute -top-7 -right-7 z-20 flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#1E293B] bg-[#EF4444] shadow-[4px_4px_0px_#1E293B]">
                <ShieldCheck className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -bottom-6 -left-6 z-0 h-full w-full rounded-tl-[100px] rounded-tr-[40px] rounded-br-[100px] rounded-bl-[40px] border-2 border-[#1E293B] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjRjFGNUY5Ii8+CjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIxIiBmaWxsPSIjQ0JENVExIi8+Cjwvc3ZnPg==')] opacity-50" />
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto space-y-8">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-4xl font-bold">
              How implementation is usually staged
            </h2>
            <p className="text-lg text-[#64748B] leading-relaxed">
              The rollout is less about installing software and more about
              designing a predictable physical workflow for the students. That is what gives
              instructors the confidence that the system will hold up during the
              busiest times of the day.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rolloutSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <article
                  key={step.title}
                  className="rounded-2xl border-2 border-[#1E293B] bg-white p-6 shadow-[8px_8px_0px_#1E293B]"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-[#1E293B]"
                      style={{ backgroundColor: step.accent }}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-sm text-[#64748B]">0{index + 1}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-[#64748B] leading-relaxed">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          <div className="rounded-3xl border-2 border-[#1E293B] bg-white p-8 shadow-[10px_10px_0px_#1E293B]">
            <h2 className="text-4xl font-bold mb-4">
              Operational notes instructors actually ask about
            </h2>
            <div className="space-y-4">
              {operationalQnA.map((item) => (
                <article
                  key={item.question}
                  className="rounded-2xl border-2 border-[#1E293B] bg-[#FFF7F7] p-5 shadow-[4px_4px_0px_#FCA5A5]"
                >
                  <h3 className="text-lg font-bold text-[#1E293B] leading-snug">
                    Q: {item.question}
                  </h3>
                  <p className="mt-2 text-[#64748B] leading-relaxed">
                    A: {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl border-2 border-[#1E293B] bg-[#FEF2F2] p-8 shadow-[10px_10px_0px_#FCA5A5] space-y-5">
            <h3 className="text-2xl font-bold">Sample checklist</h3>
            {[
              "Tablet or iPad ready for guided access mode",
              "Stable stand positioned at arrival path",
              "Center roster mapped to student IDs",
              "Printed or shipped QR cards prepared",
              "Staff briefed on missed-scan fallback",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 text-[#475569]">
                <CheckCircle2 className="h-5 w-5 mt-1 text-[#EF4444]" />
                <span>{item}</span>
              </div>
            ))}
          </aside>
        </section>

        <section className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h2 className="text-4xl font-bold">Sample visual references</h2>
            <Link
              to="/features/whatsapp-notifications"
              className="text-green-600 hover:text-green-700 underline underline-offset-4"
            >
              Next: WhatsApp notifications
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gallery.map((item, index) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-3xl border-2 border-[#1E293B] bg-white shadow-[8px_8px_0px_#1E293B]"
              >
                {"video" in item && item.video ? (
                  <video
                    src={item.video}
                    autoPlay
                    loop
                    muted
                    className="h-56 w-full object-cover"
                  />
                ) : (
                  <img
                    src={(item as { image: string }).image}
                    alt={item.title}
                    className="h-56 w-full object-cover mix-blend-multiply"
                  />
                )}
                <div className="p-6 space-y-3">
                  <p className="text-sm text-[#64748B]">0{index + 1}</p>
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="text-[#64748B] leading-relaxed">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
