import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white text-[#111827]">
      <main className="max-w-4xl mx-auto px-6 py-10 md:py-14 font-sans">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-[#4B5563] hover:text-[#111827] mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back Home
        </Link>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
            <p className="mt-2 text-sm text-[#6B7280]">Last updated: May 5, 2026</p>
          </div>

          <p className="leading-7 text-[#374151]">
            This Privacy Policy explains what information Kumi collects, how it
            is used, and how we protect student and parent data while providing
            attendance automation and notification services for Kumon centers.
          </p>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">1. Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2 text-[#374151] leading-7">
              <li>Student names</li>
              <li>Parent or guardian contact numbers</li>
              <li>Attendance timestamps for check-in and check-out</li>
              <li>Center-specific operational settings needed to run the service</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">2. How We Use Information</h2>
            <ul className="list-disc pl-6 space-y-2 text-[#374151] leading-7">
              <li>To record attendance accurately</li>
              <li>To support check-in and check-out workflows</li>
              <li>To send timely notifications to parents or guardians</li>
              <li>To maintain and improve the reliability of the platform</li>
            </ul>
            <p className="text-[#374151] leading-7">
              Kumi does not sell, rent, or reuse student data for advertising or marketing purposes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">3. Security Controls</h2>
            <ul className="list-disc pl-6 space-y-2 text-[#374151] leading-7">
              <li>Data is encrypted in transit and at rest</li>
              <li>Access to records is controlled and limited</li>
              <li>Storage and infrastructure practices are designed to align with Singapore PDPA expectations</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">4. Retention and Deletion</h2>
            <ul className="list-disc pl-6 space-y-2 text-[#374151] leading-7">
              <li>Records are retained only as long as needed for attendance operations and reporting</li>
              <li>Centers may request deletion or export of records based on operational or compliance needs</li>
              <li>Retention practices may vary according to each center’s internal policy</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">5. PDPA-Aligned Approach</h2>
            <p className="text-[#374151] leading-7">
              Kumi is designed with Singapore education operators in mind. We aim to limit collection to operationally necessary data and provide the technical safeguards needed to support PDPA-conscious workflows.
            </p>
            <p className="text-[#374151] leading-7">
              Each center remains responsible for its own parent consent process and internal compliance procedures.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">6. Contact</h2>
            <p className="text-[#374151] leading-7">
              If your center has questions about data handling, retention, or deletion requests, please contact us through the support form on the contact page.
            </p>
            <Link to="/contact" className="text-[#2563EB] underline underline-offset-2">
              Go to Contact Page
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}
