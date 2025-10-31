import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Features />
      <Footer />
    </div>
  );
};

export default LandingPage;
