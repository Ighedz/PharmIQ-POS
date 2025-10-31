import React from "react";
import { ClipboardCheck, Activity, Store, Users } from "lucide-react";

const Features = () => {
  const features = [
    {
      id: 1,
      title: "Smart Medication Adherence",
      desc: "Automatically remind patients to take their medications through pharmacy-branded messages — building trust and loyalty.",
      icon: <ClipboardCheck className="w-8 h-8 text-green-600" />,
    },
    {
      id: 2,
      title: "AI-Powered Drug Interaction Check",
      desc: "Ensure every prescription is clinically safe by detecting potential drug interactions before checkout.",
      icon: <Activity className="w-8 h-8 text-green-600" />,
    },
    {
      id: 3,
      title: "Offline-Ready POS",
      desc: "Process sales seamlessly, even without internet — ensuring your pharmacy never misses a transaction.",
      icon: <Store className="w-8 h-8 text-green-600" />,
    },
    {
      id: 4,
      title: "Actionable Insights",
      desc: "Track medication trends, adherence rates, and repeat customers — transforming your pharmacy into a proactive care partner.",
      icon: <Users className="w-8 h-8 text-green-600" />,
    },
  ];

  return (
    <section id="features" className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          Empowering Pharmacies with Intelligent Tools
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-green-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-700 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
