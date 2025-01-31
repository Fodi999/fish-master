"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import ConsultationSection from "@/components/about/ConsultationSection";

const PortfolioPage = () => {
  const { isDarkMode } = useTheme();
  const [showConsultation, setShowConsultation] = useState(false);
  const consultationRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = () => {
    setShowConsultation(!showConsultation);
  };

  useEffect(() => {
    if (showConsultation && consultationRef.current) {
      consultationRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showConsultation]);

  return (
    <div
      className={`min-h-screen pt-24 p-4 sm:p-6 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent">
            Dima Fomin
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 mb-8 transition-all duration-300">
            Master Fish Craftsman & Aquatic Cuisine Artisan
          </p>
          <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden shadow-2xl group">
            <Image
              src="/portfolio6.webp"
              alt="Fish Preparation Art"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-8">
              <p className="text-lg text-white opacity-90 max-w-2xl px-4 transition-opacity duration-300 hover:opacity-100">
                With over 15 years of expertise in marine gastronomy, Chef Fomin transforms 
                fresh catches into edible masterpieces, blending traditional techniques 
                with modern culinary innovation.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center md:text-left border-l-4 pl-4 border-blue-500">
            Signature Creations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                src: "/portfolio2.webp",
                title: "Ocean Symphony Roll",
                desc: "A harmonious blend of toro, uni, and seasonal whitefish adorned with gold leaf"
              },
              {
                src: "/portfolio3.webp",
                title: "Premium Selection",
                desc: "Daily curated selection of the finest sustainable catches from Nordic waters"
              },
              {
                src: "/portfolio1.webp",
                title: "Caviar Sculpture",
                desc: "Handcrafted ice sculptures showcasing rare sturgeon caviar varieties"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="relative h-80 rounded-2xl overflow-hidden group transition-transform duration-300 hover:-translate-y-2"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80 flex items-end p-6">
                  <div className="transform transition-all duration-500 group-hover:translate-y-0 translate-y-8">
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center md:text-left border-l-4 pl-4 border-blue-500">
            Culinary Mastery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Fish Butchery",
                desc: "Mastery of ikejime and traditional Nordic preservation methods",
                icon: "🎣"
              },
              {
                title: "Sushi Artistry",
                desc: "Recipient of 2023 Golden Chopstick Award for innovative nigiri presentations",
                icon: "🍣"
              },
              {
                title: "Quality Control",
                desc: "Certified marine biologist with focus on sustainable aquaculture practices",
                icon: "🔍"
              }
            ].map((skill, index) => (
              <div 
                key={index}
                className={`p-8 rounded-2xl transition-all duration-300 ${
                  isDarkMode 
                    ? "bg-gray-800 hover:bg-gray-700 border-gray-700" 
                    : "bg-white hover:bg-gray-50 border-gray-200"
                } border-b-4 hover:border-blue-400 shadow-lg hover:shadow-xl`}
              >
                <div className="text-4xl mb-4">{skill.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{skill.title}</h3>
                <p className={`text-sm leading-relaxed ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}>
                  {skill.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="text-center py-12 bg-gradient-to-r from-blue-500 to-teal-600 rounded-3xl mb-16">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Craft Your Aquatic Experience
            </h2>
            <p className="text-gray-100 mb-8 text-lg">
              Whether it&apos;s a private chef experience, culinary workshop, or custom catering - 
              let&apos;s create something extraordinary from the ocean&apos;s bounty.
            </p>
            <button 
              onClick={handleButtonClick}
              className={`px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105 ${
                isDarkMode 
                  ? "bg-white text-blue-600 hover:shadow-2xl hover:shadow-white/20" 
                  : "bg-gray-900 text-white hover:shadow-2xl hover:shadow-gray-900/20"
              }`}
            >
              Schedule Consultation
              <span className="ml-3">→</span>
            </button>
          </div>
        </section>

        {showConsultation && (
          <div ref={consultationRef}>
            <ConsultationSection />
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;