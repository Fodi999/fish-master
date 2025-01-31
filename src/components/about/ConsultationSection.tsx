"use client";

import React, { useState } from "react";
import Image from "next/image";
import Details from "./Details";

const ConsultationSection = () => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const items = [
    {
      src: "/000002.webp",
      title: "Custom Culinary Experiences",
      desc: "Tailored dining experiences that bring the ocean's bounty to your table.",
      details: "Detailed information about Custom Culinary Experiences:\n- Fresh ingredients\n- Expert preparation\n- Unique presentation",
      imageSrc: "/000002.webp"
    },
    {
      src: "/000003.webp",
      title: "Sustainable Fishing Practices",
      desc: "Commitment to sustainable fishing methods to preserve marine life.",
      details: "Detailed information about Sustainable Fishing Practices:\n- Eco-friendly techniques\n- Marine conservation\n- Community support",
      imageSrc: "/000003.webp"
    },
    {
      src: "/000004.webp",
      title: "Culinary Workshops",
      desc: "Hands-on workshops to teach the art of fish preparation and cooking.",
      details: "Detailed information about Culinary Workshops:\n- Interactive sessions\n- Professional guidance\n- Skill development",
      imageSrc: "/000004.webp"
    }
  ];

  return (
    <section className="text-center py-12 bg-gray-100 dark:bg-gray-800 rounded-3xl  border-b-4 mb-16">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          Consultation Details
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg">
          Please fill out the form below to schedule your consultation with Chef Dima Fomin.
        </p>
        {/* Add your consultation form or details here */}
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          What Fish Master Does
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div 
              key={index}
              className="relative h-80 rounded-2xl overflow-hidden group transition-transform  border-b-4 duration-300 hover:-translate-y-2 cursor-pointer"
              onClick={() => setSelectedItem(selectedItem === index ? null : index)}
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

        {selectedItem !== null && (
          <Details 
            title={items[selectedItem].title} 
            details={items[selectedItem].details} 
            imageSrc={items[selectedItem].imageSrc}
          />
        )}
      </div>
    </section>
  );
};

export default ConsultationSection;