import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import DashboardPage from "@/pages/DashboardPage";
import DashboardExperiencePage from "@/pages/DashboardExperiencePage";
import KumonReview from "@/pages/KumonReview";
import LandingPage from "@/pages/LandingPage";
import PricingPage from "@/pages/PricingPage";
import QrImplementationPage from "@/pages/QrImplementationPage";
import WhatsAppNotificationsPage from "@/pages/WhatsAppNotificationsPage";
import ContactPage from "@/pages/ContactPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/kumon-review" element={<KumonReview />} />
        <Route path="/features/qr-implementation" element={<QrImplementationPage />} />
        <Route path="/features/whatsapp-notifications" element={<WhatsAppNotificationsPage />} />
        <Route path="/features/dashboard" element={<DashboardExperiencePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}
