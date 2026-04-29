import { ArrowRight, Check, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF5] text-[#1E293B] font-['Plus_Jakarta_Sans'] overflow-x-hidden">
      {/* Navbar */}
      <nav className="border-b-2 border-[#1E293B] bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#8B5CF6] border-2 border-[#1E293B] shadow-[2px_2px_0px_#1E293B]" />
            <span className="font-['Outfit'] font-extrabold text-2xl tracking-tight">
              Kumi
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/pricing">
              <Button className="hidden sm:flex bg-white hover:bg-[#FBBF24] text-[#1E293B] border-2 border-[#1E293B] shadow-none hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_#1E293B] transition-all rounded-full font-bold">
                Pricing
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1E293B] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_#1E293B] transition-all rounded-full font-bold">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
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
            <div className="inline-block bg-[#F472B6] text-white px-4 py-1.5 rounded-full border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B] font-bold text-sm transform -rotate-2">
              ✨ Automated Attendance System
            </div>
            
            <h1 className="font-['Outfit'] text-5xl sm:text-7xl font-extrabold leading-[1.1] text-[#1E293B]">
              Attendance that <span className="text-[#8B5CF6] underline decoration-wavy decoration-[#FBBF24]">smiles</span> back at you.
            </h1>
            
            <p className="text-xl text-[#64748B] leading-relaxed max-w-lg">
              Eliminate manual tracking with QR codes, WhatsApp notifications, and AI-powered reporting. It’s not just data; it’s peace of mind.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/dashboard">
                <Button className="h-14 px-8 text-lg bg-[#34D399] hover:bg-[#10B981] text-[#1E293B] border-2 border-[#1E293B] shadow-[4px_4px_0px_#1E293B] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1E293B] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_#1E293B] transition-all rounded-full font-bold w-full sm:w-auto">
                  Try It Now
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" className="h-14 px-8 text-lg bg-white hover:bg-[#F1F5F9] text-[#1E293B] border-2 border-[#1E293B] shadow-[4px_4px_0px_#CBD5E1] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#CBD5E1] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_#CBD5E1] transition-all rounded-full font-bold w-full sm:w-auto">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            {/* Image Container with "Blob" Mask and Decoration */}
            <div className="relative z-10 border-2 border-[#1E293B] rounded-tl-[100px] rounded-tr-[40px] rounded-br-[100px] rounded-bl-[40px] overflow-hidden shadow-[12px_12px_0px_#1E293B] bg-white transition-transform hover:rotate-1 duration-500">
               <img 
                src="https://picsum.photos/600/500?grayscale" 
                alt="Student scanning QR code" 
                className="w-full h-full object-cover mix-blend-multiply opacity-90 hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            {/* Floating Decorative Elements */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-[#FBBF24] border-2 border-[#1E293B] rounded-full flex items-center justify-center shadow-[4px_4px_0px_#1E293B] animate-bounce delay-700 z-20">
              <Star className="w-10 h-10 text-[#1E293B]" fill="white" />
            </div>
             <div className="absolute -bottom-6 -left-6 z-0 w-full h-full border-2 border-[#1E293B] rounded-tl-[100px] rounded-tr-[40px] rounded-br-[100px] rounded-bl-[40px] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjRjFGNUY5Ii8+CjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIxIiBmaWxsPSIjQ0JENVExIi8+Cjwvc3ZnPg==')] opacity-50" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white border-y-2 border-[#1E293B] relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="font-['Outfit'] text-4xl font-bold text-[#1E293B]">
              Why Kumi?
            </h2>
            <p className="text-lg text-[#64748B]">
              We replaced boring spreadsheets with a system that actually works for humans (and robots).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative bg-[#FFFDF5] p-8 border-2 border-[#1E293B] rounded-2xl shadow-[8px_8px_0px_#8B5CF6] hover:shadow-[12px_12px_0px_#8B5CF6] hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 bg-[#8B5CF6] text-white border-2 border-[#1E293B] rounded-lg flex items-center justify-center mb-6 shadow-[4px_4px_0px_#1E293B]">
                <span className="font-['Outfit'] font-bold text-xl">1</span>
              </div>
              <h3 className="font-['Outfit'] text-xl font-bold mb-3">QR Automation</h3>
              <p className="text-[#64748B]">
                Students scan in/out in seconds. No more "I forgot to sign the sheet" excuses.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-[#FFFDF5] p-8 border-2 border-[#1E293B] rounded-2xl shadow-[8px_8px_0px_#F472B6] hover:shadow-[12px_12px_0px_#F472B6] hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 bg-[#F472B6] text-white border-2 border-[#1E293B] rounded-lg flex items-center justify-center mb-6 shadow-[4px_4px_0px_#1E293B]">
                <span className="font-['Outfit'] font-bold text-xl">2</span>
              </div>
              <h3 className="font-['Outfit'] text-xl font-bold mb-3">WhatsApp API</h3>
              <p className="text-[#64748B]">
                Parents get instant notifications. "Your child has arrived" – peace of mind delivered.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-[#FFFDF5] p-8 border-2 border-[#1E293B] rounded-2xl shadow-[8px_8px_0px_#FBBF24] hover:shadow-[12px_12px_0px_#FBBF24] hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 bg-[#FBBF24] text-[#1E293B] border-2 border-[#1E293B] rounded-lg flex items-center justify-center mb-6 shadow-[4px_4px_0px_#1E293B]">
                <span className="font-['Outfit'] font-bold text-xl">3</span>
              </div>
              <h3 className="font-['Outfit'] text-xl font-bold mb-3">AI Reporting</h3>
              <p className="text-[#64748B]">
                "Who was late this month?" Ask in plain English and get instant answers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto bg-[#8B5CF6] rounded-3xl border-2 border-[#1E293B] shadow-[16px_16px_0px_#1E293B] p-12 text-center relative overflow-hidden">
          {/* Background decoration */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full translate-x-1/3 -translate-y-1/3" />
           <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#FBBF24] opacity-20 rounded-full -translate-x-1/3 translate-y-1/3" />

          <h2 className="font-['Outfit'] text-4xl sm:text-5xl font-bold text-white mb-6 relative z-10">
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
      <footer className="bg-white border-t-2 border-[#1E293B] py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#1E293B]" />
            <span className="font-['Outfit'] font-bold text-lg">Kumi System</span>
          </div>
          <p className="text-[#64748B] text-sm">
            © {new Date().getFullYear()} Kumi. All rights reserved. Built with fun.
          </p>
        </div>
      </footer>
    </div>
  );
}
