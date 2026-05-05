import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const API_URL = import.meta.env.VITE_API_BASE || "http://localhost:3000";

export default function ContactPage() {
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
      const response = await fetch(`${API_URL}/api/website`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        setSubmitMessage(
          "Error submitting form. Please try again or contact support.",
        );
      } else {
        setSubmitMessage(
          "Thank you for reaching out! We will get back to you soon.",
        );
        setFormData({ name: "", email: "", message: "" });
      }
    } catch {
      setSubmitMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-[#1E293B] font-['DynaPuff'] overflow-x-hidden">
      <header className="px-6 md:px-10 py-6 flex items-center justify-between gap-3 border-b-2 border-[#111827] bg-white/80 backdrop-blur-md">
        <div className="flex justify-center items-center gap-2 sm:gap-3">
          <a href="/">
            <img
              src="/src/assets/image.png"
              alt="Kumi Logo"
              className="w-9 h-9 sm:w-12 sm:h-12 shadow-[4px_4px_0px_#1E293B] rounded-full border-2 border-[#1E293B]"
            />
          </a>
          <div className="flex flex-col sm:flex-row sm:items-end sm:gap-1">
            <h1 className="sm:text-2xl font-medium text-lg tracking-tight">
              Kumi
            </h1>
            <p className="capitalize text-[#64748B] mb-1 font-thin tracking-tight text-xs">
              Contact
            </p>
          </div>
        </div>
      </header>

      <section className="relative px-6 py-16 sm:py-20">
        <div className="absolute top-16 right-[8%] w-56 h-56 bg-[#8B5CF6] rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-8 left-[5%] w-44 h-44 bg-[#FBBF24] rounded-full opacity-25 blur-3xl" />

        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8 relative z-10">
          <div className="lg:col-span-2 space-y-5">
            <span className="inline-flex items-center rounded-full border-2 border-[#1E293B] bg-[#F472B6] text-white px-4 py-1 font-semibold text-sm shadow-[4px_4px_0px_#1E293B] -rotate-1">
              Contact Us
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight">
              Let’s bring{" "}
              <span className="text-[#8B5CF6] underline decoration-wavy decoration-[#FBBF24]">
                Kumi
              </span>{" "}
              to your center.
            </h1>
            <p className="text-[#64748B] text-lg leading-relaxed">
              Have questions about Kumi or interested in implementing our
              system? Fill out the form below and we'll reach out to help you
              get started.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 rounded-2xl border-2 border-[#1E293B] bg-white p-3 shadow-[4px_4px_0px_#1E293B]">
                <Mail className="h-5 w-5 text-[#8B5CF6]" />
                <a
                  className="hover:text-[#8B5CF6] transition duration-200"
                  href="mailto:bryanchewzy24@gmail.com"
                >
                  bryanchewzy24@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border-2 border-[#1E293B] bg-white p-3 shadow-[4px_4px_0px_#1E293B]">
                <Phone className="h-5 w-5 text-[#8B5CF6]" />
                <a
                  href="tel:+6598190072"
                  className="hover:text-[#8B5CF6] transition duration-200"
                >
                  +65 9819 0072
                </a>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border-2 border-[#1E293B] bg-white p-3 shadow-[4px_4px_0px_#1E293B]">
                <MapPin className="h-5 w-5 text-[#8B5CF6]" />
                <span className="font-semibold">Singapore</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 bg-[#8B5CF6] rounded-3xl border-2 border-[#1E293B] shadow-[16px_16px_0px_#1E293B] p-6 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-56 h-56 bg-white opacity-10 rounded-full translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-28 h-28 bg-[#FBBF24] opacity-20 rounded-full -translate-x-1/3 translate-y-1/3" />

            <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white uppercase">
                  Send us a message
                </h2>
              </div>
              <span className="inline-block bg-white text-black border-2 border-black px-3 py-1 font-black text-[10px] uppercase tracking-widest -rotate-1 rounded-full">
                We'll respond within 24 hours
              </span>
            </div>

            <form
              onSubmit={handleFormSubmit}
              className="space-y-4 relative z-10"
            >
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
                  placeholder="Your name"
                  className="w-full border-4 border-black px-3 py-2 font-bold bg-white placeholder:text-black/40 focus:outline-none focus:bg-[#FBBF24]"
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
                  className="w-full border-4 border-black px-3 py-2 font-bold bg-white placeholder:text-black/40 focus:outline-none focus:bg-[#FBBF24]"
                />
              </div>

              <div>
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
                  rows={7}
                  placeholder="Type your message here..."
                  className="w-full border-4 border-black px-3 py-2 font-bold bg-white placeholder:text-black/40 focus:outline-none focus:bg-[#FBBF24] resize-none"
                />
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 bg-white hover:bg-[#FBBF24] text-[#1E293B] border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1E293B] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_#1E293B] transition-all rounded-full px-6 py-3 font-bold uppercase text-sm tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>

            {submitMessage && (
              <div
                className={`mt-4 border-4 border-black px-4 py-3 flex items-center gap-3 shadow-[4px_4px_0px_#1E293B] ${
                  submitMessage.includes("Thank you")
                    ? "bg-green-200 text-green-900"
                    : "bg-red-200 text-red-900"
                }`}
              >
                <p className="font-bold text-sm sm:text-base">
                  {submitMessage}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
