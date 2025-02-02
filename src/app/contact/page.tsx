"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

const ContactPage = () => {
  const { isDarkMode } = useTheme();

  const handleFormSubmit = (formData: { name: string; email: string; message: string }) => {
    console.log("Form submitted:", formData);
  };

  return (
    <div
      className={`min-h-screen pt-24 md:pt-24 p-2 sm:p-6 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto pt-8">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 mb-8 transition-all duration-300">
            Let&apos;s Create Something Extraordinary Together
          </p>
        </div>

        <Card className={`shadow-2xl transition-all duration-300 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
          <CardHeader>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent">
              Contact the Master
            </CardTitle>
            <CardDescription className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Whether you&apos;re looking fors a custom culinary experience or want to discuss a unique project - we&apos;ll craft perfection from the oceans bounty.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactInfo />
            <ContactForm onSubmit={handleFormSubmit} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;