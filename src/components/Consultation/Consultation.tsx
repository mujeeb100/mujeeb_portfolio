"use client";

import React, { useState } from "react";

const Consultation = [
  {
    name: "Finance",
    description:
      "Custom dashboards, financial analytics, portfolio tracking, and secure payment portals.",
  },
  {
    name: "Payroll",
    description:
      "End-to-end payroll systems, payslip generation, leave and attendance integration.",
  },
  {
    name: "E-Commerce",
    description:
      "Fully functional online store, cart system, payment gateway, and admin panels.",
  },
  {
    name: "Healthcare",
    description:
      "Appointment booking, patient management systems, health tracking dashboards.",
  },
  {
    name: "Education",
    description:
      "Learning management systems, course management, student portals, and grading systems.",
  },
  {
    name: "Real Estate",
    description:
      "Property listing platforms, booking systems, and client management tools.",
  },
  {
    name: "Travel & Hospitality",
    description:
      "Booking systems, itinerary management, and customer feedback portals.",
  },
  {
    name: "Social Media",
    description:
      "User profiles, content management, and social interaction features.",
  },
  {
    name: "Content Management",
    description:
      "Custom CMS solutions for blogs, news sites, and corporate websites.",
  },
  {
    name: "Custom Solutions",
    description:
      "Tailored web applications to meet specific business needs and workflows.",
  },
];

const ConsultationPage = () => {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  const handleDomainClick = (domain: string) => {
    setSelectedDomain(domain);
  };

  const handleBackClick = () => {
    setSelectedDomain(null);
  };

  const selectedDetails = Consultation.find(
    (d) => d.name === selectedDomain
  );

  return (
    <div className="min-h-screen px-6 py-12 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      {!selectedDomain ? (
        <>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Choose a Domain</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Select a domain to see more about my services and book a consultation call.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {Consultation.map((domain) => (
              <div
                key={domain.name}
                onClick={() => handleDomainClick(domain.name)}
                className="cursor-pointer border rounded-xl p-6 shadow-md hover:shadow-xl transition bg-white dark:bg-gray-800"
              >
                <h2 className="text-2xl font-semibold">{domain.name}</h2>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            {selectedDomain} Services
          </h2>
          <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
            {selectedDetails?.description}
          </p>

          <div className="w-full h-[700px] mb-8">
            <iframe
              src="https://calendly.com/mujeeb977315/30min"
              title="Schedule Meeting"
              className="w-full h-full border-none rounded-xl shadow-xl"
              loading="lazy"
            ></iframe>
          </div>

          <button
            onClick={handleBackClick}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            ← Back to Domains
          </button>
        </div>
      )}
    </div>
  );
};

export default ConsultationPage;
