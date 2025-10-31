
import React from "react";
import { ArrowRightCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";;

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-green-50 pt-28 pb-20 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-6 leading-tight">
          PharmIQ transforms pharmacies into proactive care partners.
        </h1>

        <p className="text-[#1E293B] text-lg md:text-xl mb-8 leading-relaxed">
          More than a POS — PharmIQ helps small and mid-sized pharmacies improve adherence,
          increase repeat business, and gain public-health insights through smart digital tools.
        </p>

        <div className="flex justify-center space-x-4">
          <Link
          to="/register"
          className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition"
        >
          Register Pharmacy
        </Link>

        <Link
          to="/login"
          className="border border-green-700 text-green-700 px-6 py-3 rounded-lg hover:bg-green-100 transition"
        >
          Log In
        </Link>
        </div>

        <p className="mt-12 text-gray-600 italic text-sm">
          PharmIQ = bringing intelligence, adherence, and analytics
          to the heart of pharmacy operations.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
