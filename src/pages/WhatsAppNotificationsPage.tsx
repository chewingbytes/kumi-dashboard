import {
  ArrowLeft,
  ArrowRight,
  CheckCheck,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  TimerReset,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import whatsappHeroImage from "@/assets/whatsappmessageimage2.png";
import sentVideo from "@/assets/charith.mp4";

const flowCards = [
  {
    title: "Arrival confirmation",
    description:
      "As soon as a student checks in, the system can queue a parent-friendly update.",
    icon: MessageCircle,
    accent: "#22C55E",
  },
  {
    title: "Departure prompt",
    description:
      "At dismissal, Kumi triggers the notification to the respective parent, so parents can pick up their child quickly with less waiting, and less congestion at the waiting area.",
    icon: PhoneCall,
    accent: "#4ADE80",
  },
  {
    title: "Delivery status",
    description:
      "Center staff get visibility into what was sent, when it was sent, and whether the parent has read the message.",
    icon: CheckCheck,
    accent: "#86EFAC",
  },
];

const messagePreviews = [
  {
    label: "Arrival",
    text: "Hi Mrs Tan, Ethan has checked in at Kumon at 3:58 PM. We’ll notify you again once he is ready for pickup.",
  },
  {
    label: "Departure",
    text: "Hi Mrs Tan, Ethan is finished with class!. Please make your way to the center entrance.",
  },
];

export default function WhatsAppNotificationsPage() {
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
            <Button className="bg-[#22C55E] hover:bg-[#16A34A] text-white border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B] rounded-full font-bold">
              Request Demo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="px-6 py-16 space-y-24">
        <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-[#1E293B] bg-[#DCFCE7] px-4 py-2 shadow-[4px_4px_0px_#1E293B] text-sm">
              <MessageCircle className="w-4 h-4" /> WhatsApp Notifications
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold leading-tight text-[#1E293B]">
              Designed to feel timely, calm, and operationally clear.
            </h1>
            <p className="text-lg leading-relaxed text-[#64748B] max-w-xl">
              Send timely messages as soon as students finish class, and track
              whether parents have viewed them directly in the app. You can also
              customize the message style to match your center’s style.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="rounded-2xl border-2 border-[#1E293B] bg-white px-5 py-4 shadow-[6px_6px_0px_#22C55E]">
                <p className="text-3xl font-bold">Real-time</p>
                <p className="text-sm text-[#64748B] mt-1">
                  Messages align to attendance events.
                </p>
              </div>
              <div className="rounded-2xl border-2 border-[#1E293B] bg-white px-5 py-4 shadow-[6px_6px_0px_#86EFAC]">
                <p className="text-3xl font-bold">Template-ready</p>
                <p className="text-sm text-[#64748B] mt-1">
                  Messaging can be branded and standardized.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="relative">
              <div className="relative z-10 overflow-hidden rounded-tl-[100px] rounded-tr-[40px] rounded-br-[100px] rounded-bl-[40px] border-2 border-[#1E293B] bg-white shadow-[12px_12px_0px_#1E293B]">
                <img
                  src={whatsappHeroImage}
                  alt="WhatsApp notification mockup"
                  className="h-full w-full object-cover mix-blend-multiply"
                />
              </div>
              <div className="absolute -top-7 -right-7 z-20 flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#1E293B] bg-[#22C55E] shadow-[4px_4px_0px_#1E293B]">
                <ShieldCheck className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -bottom-6 -left-6 z-0 h-full w-full rounded-tl-[100px] rounded-tr-[40px] rounded-br-[100px] rounded-bl-[40px] border-2 border-[#1E293B] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjRjFGNUY5Ii8+CjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIxIiBmaWxsPSIjQ0JENVExIi8+Cjwvc3ZnPg==')] opacity-50" />
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto space-y-8">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-4xl font-bold">
              What the communication layer shows
            </h2>
            <p className="text-lg text-[#64748B] leading-relaxed"></p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {flowCards.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className="rounded-2xl border-2 border-[#1E293B] bg-white p-6 shadow-[8px_8px_0px_#1E293B]"
                >
                  <div
                    className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border-2 border-[#1E293B]"
                    style={{ backgroundColor: card.accent }}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
                  <p className="text-[#64748B] leading-relaxed">
                    {card.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
          <aside className="rounded-3xl border-2 border-[#1E293B] bg-[#F0FDF4] p-8 shadow-[10px_10px_0px_#86EFAC] space-y-5">
            <div className="flex items-center gap-3 text-[#1E293B]">
              <TimerReset className="h-6 w-6" />
              <h3 className="text-2xl font-bold capitalize">
                operating principles
              </h3>
            </div>
            {[
              "Only necessary parent contact data is used for notifications, like emails or numbers.",
              "Each message ties back to a concrete attendance event.",
              "Staff can review message status without manual spreadsheets.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 text-[#475569]">
                <CheckCheck className="h-5 w-5 mt-1 text-[#22C55E]" />
                <span>{item}</span>
              </div>
            ))}
          </aside>

          <div className="rounded-3xl border-2 border-[#1E293B] bg-white p-8 shadow-[10px_10px_0px_#1E293B]">
            <h2 className="text-4xl font-bold mb-2">
              Sample parent-facing message previews
            </h2>
            <p className="text-[#64748B] leading-relaxed mb-4">
              Below are examples, you can customize your message templates.
            </p>
            <div className="space-y-5">
              {messagePreviews.map((message, index) => (
                <div
                  key={message.label}
                  className="rounded-2xl border-2 border-[#1E293B] bg-[#F9FAFB] p-5 shadow-[6px_6px_0px_#E5E7EB]"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm text-[#64748B]">
                      Template 0{index + 1}
                    </p>
                    <span className="rounded-full border border-[#1E293B] px-3 py-1 text-xs bg-white">
                      {message.label}
                    </span>
                  </div>
                  <p className="text-lg leading-relaxed text-[#475569]">
                    {message.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto gap-6">
          <article className="overflow-hidden rounded-3xl border-2 border-[#1E293B] bg-white shadow-[8px_8px_0px_#1E293B]">
            <video
              src={sentVideo}
              autoPlay
              loop
              muted
              className="h-auto w-full object-cover"
            />
            {/* <div className="p-6 space-y-3">
              <h3 className="text-2xl font-bold">Demo of notifying parents</h3>
              <p className="text-[#64748B] leading-relaxed"></p>
            </div> */}
          </article>
        </section>

        <section className="max-w-6xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <Link
            to="/features/qr-implementation"
            className="underline underline-offset-4 text-red-400 hover:text-red-500"
          >
            Previous: QR implementation
          </Link>
          <Link
            to="/features/dashboard"
            className="underline underline-offset-4 text-blue-600 hover:text-blue-700"
          >
            Next: Dashboard experience
          </Link>
        </section>
      </main>
    </div>
  );
}
