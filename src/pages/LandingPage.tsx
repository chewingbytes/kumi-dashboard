import { useEffect, useState } from "react";
import { ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "http://46.62.162.240:8000",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzcyMDM1MjAwLCJleHAiOjE5Mjk4MDE2MDB9.xwNchAkC_TD1MRZfTNLnP1oJG4EpXq_zYuRJgxQkRH4",
);

export default function LandingPage() {
  const linkColorClass = {
    red: "text-red-400 hover:text-red-500",
    blue: "text-blue-400 hover:text-blue-500",
    green: "text-green-600 hover:text-green-700",
  };

  const howItWorksTabs = [
    {
      label: "1)",
      title: "QR Codes Integration",
      description:
        "We will provide QR Codes which will be slid into the back of the folder behind the name tag. Every student scans the QR code on arrival to check in and check out.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Student checking in with a QR scan",
      accent: "bg-red-500",
      linkColor: "red",
      link: "Explore QR implementation",
      href: "/features/qr-implementation",
    },
    {
      label: "2)",
      title: "Parents will automatically be notified.",
      description:
        "When the student checks out, Kumi sends an automatic WhatsApp message or email so pickups are smooth and timely. Say goodbye to congested waiting areas.",
      image:
        "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Parent receiving student departure notification",
      accent: "bg-green-500",
      linkColor: "green",
      link: "Explore WhatsApp notifications",
      href: "/features/whatsapp-notifications",
    },
    {
      label: "3)",
      title: "Manage your students on the Dashboard.",
      description:
        "Track and manage your students easily with our interactive dashboard, or simply ask Kumi.",
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Kumon-style classroom session in progress",
      accent: "bg-blue-500",
      linkColor: "blue",
      link: "Explore the dashboard",
      href: "/features/dashboard",
    },
  ];

  const [activeHowTab, setActiveHowTab] = useState(0);
  const activeHowTabData = howItWorksTabs[activeHowTab];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const { error } = await supabase.from("form").insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
      ]);

      if (error) {
        setSubmitMessage(
          "Error submitting form. Please try again or contact support.",
        );
        console.error("Supabase error:", error);
      } else {
        setSubmitMessage(
          "Thank you for reaching out! We will get back to you soon.",
        );
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (err) {
      setSubmitMessage("An unexpected error occurred. Please try again.");
      console.error("Form submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveHowTab((prevTab) => (prevTab + 1) % howItWorksTabs.length);
    }, 10000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [howItWorksTabs.length]);

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-[#1E293B] font-['DynaPuff'] overflow-x-hidden">
      {/* Navbar */}
      <nav className="border-b-2 border-[#1E293B] bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="/">
              <img
                src="/src/assets/k-min.png"
                alt="Kumi Logo"
                className="w-9 h-9 sm:w-12 sm:h-12 shadow-[4px_4px_0px_#1E293B] rounded-full border-2 border-[#1E293B]"
              />
            </a>
            <span className="font-['DynaPuff'] font-medium text-lg sm:text-2xl tracking-tight">
              Kumi
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/pricing">
              <Button className="hidden sm:flex bg-white hover:bg-[#FBBF24] text-[#1E293B] border-2 border-[#1E293B] shadow-none hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_#1E293B] transition-all rounded-full font-bold">
                Pricing
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1E293B] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_#1E293B] transition-all rounded-full font-bold">
                Contact Us
              </Button>
            </Link>
            {/* <Link to="/dashboard">
              <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1E293B] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_#1E293B] transition-all rounded-full font-bold">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link> */}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-20 right-[10%] w-64 h-64 bg-[#FBBF24] rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-20 left-[5%] w-48 h-48 bg-[#F472B6] rounded-full opacity-20 blur-3xl" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-block bg-[#F472B6] text-white px-4 py-1.5 rounded-full border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B] font-semibold text-sm transform -rotate-2">
              ✨ Worry-free Attendance
            </div>

            <h1 className="font-['DynaPuff'] text-5xl sm:text-7xl xl:text-8xl font-medium leading-[1.1] text-[#1E293B]">
              Automated,{" "}
              <span className="text-[#8B5CF6] underline decoration-wavy decoration-[#FBBF24]">
                Seamless
              </span>{" "}
            </h1>

            <p className="text-xl text-[#64748B] leading-relaxed max-w-lg">
              Manage students easier, notify parents faster.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/dashboard">
                <Button className="h-14 px-8 text-lg bg-[#34D399] hover:bg-[#10B981] text-[#1E293B] border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1E293B] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_#1E293B] transition-all rounded-full font-bold w-full sm:w-auto">
                  Try It Now
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button
                  variant="outline"
                  className="h-14 px-8 text-lg bg-white hover:bg-[#F1F5F9] text-[#1E293B] border-2 border-[#1E293B] shadow-[4px_4px_0px_#CBD5E1] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#CBD5E1] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_#CBD5E1] transition-all rounded-full font-bold w-full sm:w-auto"
                >
                  View Demo
                </Button>
              </Link>
            </div>
          </div>

          <div>
            <div className="relative">
              <div className="relative z-10 border-2 border-[#1E293B] rounded-tl-[100px] rounded-tr-[40px] rounded-br-[100px] rounded-bl-[40px] overflow-hidden shadow-[12px_12px_0px_#1E293B] bg-white transition-transform hover:rotate-3 duration-500 hover:scale-105">
                <img
                  src="/src/assets/hero.jpg"
                  alt="Student scanning QR code"
                  className="w-full h-full object-cover mix-blend-multiply"
                />
              </div>

              <div className="absolute -top-8 -right-8 w-24 h-24 border-2 border-[#1E293B] rounded-full shadow-[4px_4px_0px_#1E293B] animate-wiggle delay-700 z-20">
                <img src="/src/assets/image.png" alt="Kumi Logo" className="" />
              </div>
              <div className="absolute -bottom-6 -left-6 z-0 w-full h-full border-2 border-[#1E293B] rounded-tl-[100px] rounded-tr-[40px] rounded-br-[100px] rounded-bl-[40px] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjRjFGNUY5Ii8+CjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIxIiBmaWxsPSIjQ0JENVExIi8+Cjwvc3ZnPg==')] opacity-50" />
            </div>

            <p className="mt-10 text-center text-sm text-[#64748B] tracking-wide">
              Implementation in a Kumon Center. Read their thoughts{" "}
              <Link
                className="underline underline-offset-2 hover:text-[#8B5CF6] hover:cursor-pointer"
                to="/kumon-review"
              >
                here
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* How Kumi Works */}
      <section
        id="how-kumi-works"
        className="py-24 px-6 relative border-y-2 bg-pink-50 border-[#1E293B]"
      >
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="font-['DynaPuff'] text-4xl font-bold text-[#1E293B]">
              How Kumi Works
            </h2>
            <p className="text-lg text-[#64748B]">
              Contact us and we'll schedule a walkthrough to see how Kumi can
              fit into your center.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {howItWorksTabs.map((tab, index) => {
                  const isActive = activeHowTab === index;

                  return (
                    <button
                      key={tab.label}
                      type="button"
                      onClick={() => setActiveHowTab(index)}
                      className={`border-[#1E293B] rounded-xl border-2 px-4 py-3 flex justify-start text-left transition-all ${
                        isActive
                          ? "bg-white shadow-[4px_4px_0px_#1E293B]"
                          : "bg-[#F8FAFC] hover:border-[#1E293B]"
                      }`}
                    >
                      {/* <p className="text-xs text-[#64748B]">{tab.label}</p> */}
                      <p className="text-sm text-[#1E293B] font-medium">
                        {tab.title}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="bg-white rounded-2xl border-2 border-[#1E293B] shadow-[8px_8px_0px_#E2E8F0] p-7">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`w-3 h-3 rounded-full border border-[#1E293B] ${activeHowTabData.accent} animate-pulse`}
                  />
                </div>
                <h3 className="font-['DynaPuff'] text-2xl text-[#1E293B] font-bold mb-3">
                  {activeHowTabData.title}
                </h3>
                <p className="text-[#64748B] leading-relaxed">
                  {activeHowTabData.description}
                </p>

                <Link
                  to={activeHowTabData.href}
                  className={`flex mt-auto pt-5 text-sm underline underline-offset-4 ${linkColorClass[activeHowTabData.linkColor as keyof typeof linkColorClass]}`}
                >
                  {activeHowTabData.link}
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </Link>
              </div>
            </div>

            <div>
              <div className="relative">
                <div className="relative z-10 border-2 border-[#1E293B] rounded-tl-[100px] rounded-tr-[40px] rounded-br-[100px] rounded-bl-[40px] overflow-hidden shadow-[12px_12px_0px_#1E293B] bg-white transition-transform duration-500 hover:rotate-2 hover:scale-[1.02]">
                  <img
                    src={activeHowTabData.image}
                    alt={activeHowTabData.imageAlt}
                    className="w-full h-[380px] object-cover mix-blend-multiply"
                  />
                </div>

                <div className="absolute -bottom-6 -left-6 z-0 w-full h-full border-2 border-[#1E293B] rounded-tl-[100px] rounded-tr-[40px] rounded-br-[100px] rounded-bl-[40px] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjRjFGNUY5Ii8+CjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIxIiBmaWxsPSIjQ0JENVExIi8+Cjwvc3ZnPg==')] opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white border-y-1 border-[#1E293B] relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="font-['DynaPuff'] text-4xl font-bold text-[#1E293B]">
              Why Kumi?
            </h2>
            <p className="text-lg text-[#64748B]">
              Stop having congested waiting areas. Kumi automatically notifies
              parents when their child is done, so you can actually focus on
              what you do best, teaching.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative bg-[#FFFDF5] p-8 border-2 border-[#1E293B] rounded-2xl shadow-[8px_8px_0px_#F87171] hover:shadow-[12px_12px_0px_#F87171] hover:-translate-y-1 transition-all flex h-full flex-col">
              <div className="w-12 h-12 bg-red-500 text-white border-2 border-[#1E293B] rounded-lg flex items-center justify-center mb-6 shadow-[4px_4px_0px_#1E293B]">
                <span className="font-['DynaPuff'] font-bold text-xl">1</span>
              </div>
              <h3 className="font-['DynaPuff'] text-xl font-bold mb-3">
                QR Automation
              </h3>
              <p className="text-[#64748B]">
                Students scans in and out in seconds, Kumi notes student class
                details.
              </p>
              <Link
                to="/features/qr-implementation"
                className="flex mt-auto text-sm text-[#F87171] underline underline-offset-4 hover:text-red-500"
              >
                Explore QR implementation
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-[#FFFDF5] p-8 border-2 border-[#1E293B] rounded-2xl hover:-translate-y-1 transition-all shadow-[8px_8px_0px_#06DF73] hover:shadow-[12px_12px_0px_#06DF73] flex h-full flex-col">
              <div className="w-12 h-12 bg-[#00C951] text-white border-2 border-[#1E293B] rounded-lg flex items-center justify-center mb-6 shadow-[4px_4px_0px_#1E293B]">
                <span className="font-['DynaPuff'] font-bold text-xl">2</span>
              </div>
              <h3 className="font-['DynaPuff'] text-xl font-bold mb-3">
                WhatsApp Integration
              </h3>
              <p className="text-[#64748B]">
                Kumi notifies parents instantly. Peace of mind for both you and
                parents.
              </p>
              <Link
                to="/features/whatsapp-notifications"
                className="flex mt-auto pt-5 text-sm  underline underline-offset-4 text-[#00A73D] hover:text-[#008236]"
              >
                Explore WhatsApp notifications
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-[#FFFDF5] p-8 border-2 border-[#1E293B] rounded-2xl shadow-[8px_8px_0px_#64B5F7] hover:shadow-[12px_12px_0px_#64B5F7] hover:-translate-y-1 transition-all flex h-full flex-col">
              <div className="w-12 h-12 bg-blue-500 text-white border-2 border-[#1E293B] rounded-lg flex items-center justify-center mb-6 shadow-[4px_4px_0px_#1E293B]">
                <span className="font-['DynaPuff'] font-bold text-xl">3</span>
              </div>
              <div className="flex items-start space-x-1">
                <h3 className="font-['DynaPuff'] text-xl font-bold mb-3">
                  Simply Ask Kumi{" "}
                </h3>
                <img
                  src="/src/assets/image.png"
                  alt="Kumi Logo"
                  className="w-7 h-7 border border-[#1E293B] rounded-full"
                />
              </div>
              <p className="text-[#64748B]">
                "Who spent more than 30 minutes today?" Ask Kumi in plain
                English and get instant answers.
              </p>
              <Link
                to="/features/dashboard"
                className="flex mt-auto pt-5 text-sm text-[#52A2FF]  underline underline-offset-4 hover:text-blue-500"
              >
                Explore the dashboard
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Prerequisites Section */}
      <section
        id="prerequisites"
        className="py-20 px-6 bg-[#FFFDF5] border-y-2 border-[#1E293B]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <h2 className="font-['DynaPuff'] text-4xl font-bold text-[#1E293B]">
              Prerequisites
            </h2>
            <p className="text-lg text-[#64748B] leading-relaxed">
              To run Kumi attendance smoothly, your center needs a few simple
              setup items and the minimum records required for automated parent
              notifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-white p-6 rounded-2xl border-2 border-[#1E293B] shadow-[6px_6px_0px_#8B5CF6]">
              <h3 className="font-['DynaPuff'] text-xl font-bold text-[#1E293B] mb-2">
                Device + Stand
              </h3>
              <p className="text-[#64748B]">
                A tablet, iPad, or similar device, plus a stable stand for
                student check-ins and check-outs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-[#1E293B] shadow-[6px_6px_0px_#F472B6]">
              <h3 className="font-['DynaPuff'] text-xl font-bold text-[#1E293B] mb-2">
                Internet Connection
              </h3>
              <p className="text-[#64748B]">
                A reliable internet connection so scans, status updates, and
                notifications stay real-time.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-[#1E293B] shadow-[6px_6px_0px_#FBBF24]">
              <h3 className="font-['DynaPuff'] text-xl font-bold text-[#1E293B] mb-2">
                Student + Parent Records
              </h3>
              <p className="text-[#64748B]">
                Student names and parent mobile numbers are required so the
                system can map each student to the correct parent for departure
                pings.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-[#1E293B] shadow-[6px_6px_0px_#34D399]">
              <h3 className="font-['DynaPuff'] text-xl font-bold text-[#1E293B] mb-2">
                QR Code Setup
              </h3>
              <p className="text-[#64748B]">
                We can ship the QR codes to you, or print them out yourself.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link to="/dashboard">
              <Button className="h-14 px-10 text-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-white border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1E293B] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_#1E293B] transition-all rounded-full font-bold">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white border-b-2 border-[#1E293B]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <h2 className="font-['DynaPuff'] text-4xl font-bold text-[#1E293B]">
              Data Privacy &amp; Security
            </h2>
            <p className="text-lg text-[#64748B] leading-relaxed">
              To earn trust with sensitive data (student names + parent phone
              numbers), Kumi uses specific safeguards aligned to Singapore PDPA
              expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-[#FFFDF5] p-6 rounded-2xl border-2 border-[#1E293B] shadow-[6px_6px_0px_#8B5CF6]">
              <h3 className="font-['DynaPuff'] text-xl font-bold text-[#1E293B] mb-2">
                End-to-End Encryption
              </h3>
              <p className="text-[#64748B]">
                Names and contact numbers are encrypted in transit and at rest.
              </p>
            </div>

            <div className="bg-[#FFFDF5] p-6 rounded-2xl border-2 border-[#1E293B] shadow-[6px_6px_0px_#F472B6]">
              <h3 className="font-['DynaPuff'] text-xl font-bold text-[#1E293B] mb-2">
                Zero-Sharing Policy
              </h3>
              <p className="text-[#64748B]">
                Data is used only for attendance and notifications. We never
                sell, share, or reuse data for marketing.
              </p>
            </div>

            <div className="bg-[#FFFDF5] p-6 rounded-2xl border-2 border-[#1E293B] shadow-[6px_6px_0px_#34D399]">
              <h3 className="font-['DynaPuff'] text-xl font-bold text-[#1E293B] mb-2">
                PDPA-Aligned Controls
              </h3>
              <p className="text-[#64748B]">
                Records are stored securely and can be deleted upon center
                request according to your retention policy.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto bg-[#8B5CF6] rounded-3xl border-2 border-[#1E293B] shadow-[16px_16px_0px_#1E293B] p-12 text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#FBBF24] opacity-20 rounded-full -translate-x-1/3 translate-y-1/3" />

          <h2 className="font-['DynaPuff'] text-4xl sm:text-5xl font-bold text-white mb-6 relative z-10">
            Ready to ditch the manual tracking?
          </h2>
          <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto relative z-10">
            Join the automated future of Kumon centers.
          </p>
          <div className="relative z-10">
            <Link to="/dashboard">
              <Button className="h-14 px-10 text-lg bg-white hover:bg-[#FBBF24] text-[#1E293B] border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1E293B] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_#1E293B] transition-all rounded-full font-bold">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-white border-t-2 border-[#1E293B] py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <img
              src="/src/assets/image.png"
              alt="Kumi Logo"
              className="w-12 h-12"
            />
            <span className="font-['DynaPuff'] font-medium text-lg">
              Kumi, built for Kumon Centers.
            </span>
          </div>
          <p className="text-[#64748B] text-sm capitalize">
            Made with Love ❤️ by{" "}
            <a
              className="underline underline-offset-2 hover:text-purple-500 transition duration-200"
              target="_blank"
              href="https://www.itsmebryan.com"
            >
              bryan
            </a>
          </p>
        </div>
      </footer> */}

      <footer className="bg-white border-t-2 border[#1E293B] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="/src/assets/image.png"
                  alt="Hangout!"
                  className="w-14 h-14 shadow-[4px_4px_0px_#1E293B] rounded-full border-2 border-[#1E293B]"
                />
                <h2 className="text-lg font-medium font-['DynaPuff']">
                  Kumi, built for Kumon Centers.
                </h2>
              </div>
              <p className="text-sm font-medium text-[#64748B] max-w-md mb-6">
                Singapore's verified student community platform. Built for
                students, by students.
              </p>
              {/* <div className="flex gap-2 flex-wrap">
                <span className="bg-neo-secondary border-2 border-white/20 text-black px-2 py-1 font-black text-xs uppercase">
                  🇸🇬 Singapore
                </span>
                <span className="bg-neo-primary border-2 border-white/20 text-white px-2 py-1 font-black text-xs uppercase">
                  Students Only
                </span>
                <span className="border-2 border-white/20 px-2 py-1 font-black text-xs uppercase">
                  Beta 2026
                </span>
              </div> */}
            </div>
            <div>
              <h3 className="text-lg font-black uppercase mb-4 text-neo-secondary">
                Platform
              </h3>
              <ul className="space-y-2 text-[#64748B] font-medium">
                <li>
                  <a
                    href="/communities"
                    className="hover:text-neo-primary transition-colors"
                  >
                    Communities
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="hover:text-neo-primary transition-colors"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#safety"
                    className="hover:text-neo-primary transition-colors"
                  >
                    Safety
                  </a>
                </li>
                <li>
                  <button className="open-waitlist hover:text-neo-secondary transition-colors text-left">
                    Join Waitlist
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-black uppercase mb-4 text-neo-secondary">
                Legal
              </h3>
              <ul className="space-y-2 text-[#64748B] font-medium">
                <li>
                  <a
                    href="/privacy-policy"
                    className="hover:text-neo-primary transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-neo-primary transition-colors"
                  >
                    Contact Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="sm:mb-8 bg-[#8B5CF6] rounded-3xl border-2 border-[#1E293B] shadow-[16px_16px_0px_#1E293B] p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#FBBF24] opacity-20 rounded-full -translate-x-1/3 translate-y-1/3" />
            <div className="mb-4 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold uppercase text-white mb-1">
                  Ready to streamline your Kumon center?
                </h3>
                <p className="text-sm md:text-base font-medium text-white max-w-xl">
                  Have questions about Kumi or interested in implementing our
                  system? Fill out the form below and we'll reach out to help
                  you get started.
                </p>
              </div>
              <span className="inline-block bg-neo-secondary text-black bg-white border-2 border-black px-3 py-1 font-black text-[10px] uppercase tracking-widest -rotate-1 rounded-full">
                We'll respond within 24 hours
              </span>
            </div>

            <form
              onSubmit={handleFormSubmit}
              className="grid md:grid-cols-2 gap-4 md:gap-6 z-99"
            >
              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block font-black uppercase text-xs tracking-widest mb-1 text-black/70"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    type="text"
                    required
                    placeholder="Your full name"
                    className="w-full border-4 border-black px-3 py-2 font-bold bg-white placeholder:text-black/40 focus:outline-none focus:bg-neo-secondary focus:shadow-neo"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block font-black uppercase text-xs tracking-widest mb-1 text-black/70"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    type="email"
                    required
                    placeholder="you@email.com"
                    className="w-full border-4 border-black px-3 py-2 font-bold bg-white placeholder:text-black/40 focus:outline-none focus:bg-neo-secondary focus:shadow-neo"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex-1">
                  <label
                    htmlFor="contact-message"
                    className="block font-black uppercase text-xs tracking-widest mb-1 text-black/70"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                    rows={5}
                    placeholder="Type your message here..."
                    className="w-full border-4 border-black px-3 py-2 font-bold bg-white placeholder:text-black/40 focus:outline-none focus:bg-neo-secondary focus:shadow-neo resize-none h-full text-black"
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-white hover:bg-[#FBBF24] text-[#1E293B] border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1E293B] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_#1E293B] transition-all rounded-full px-6 py-3 font-bold uppercase text-sm tracking-wider shadow-neo flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Zap className="w-4 h-4 fill-white" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </div>
            </form>

            {submitMessage && (
              <div
                className={`mt-4 border-4 border-black px-4 py-3 flex items-center gap-3 shadow-neo ${
                  submitMessage.includes("Thank you")
                    ? "bg-green-200 text-green-900"
                    : "bg-red-200 text-red-900"
                }`}
              >
                <p className="font-bold text-sm md:text-base">
                  {submitMessage}
                </p>
              </div>
            )}
          </div>

          {/* <div className="border-t-4 border-black/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-bold text-black text-sm">
              © 2025 Hangout! All rights reserved.
            </p>
            <p className="font-bold text-black text-sm">
              Made with 💛 for Singapore students
            </p>
          </div> */}
        </div>
      </footer>
    </div>
  );
}
