"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const ContactPage = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <div
      className={`min-h-screen pt-24 p-4 sm:p-6 transition-colors duration-300 ${
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

        <Card className={`shadow-2xl transition-all duration-300 ${
          isDarkMode 
            ? "bg-gray-800 border-gray-700" 
            : "bg-white border-gray-200"
        }`}>
          <CardHeader>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent">
              Contact the Master
            </CardTitle>
            <CardDescription className={`text-lg ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}>
              Whether you&apos;re looking for a custom culinary experience or want to discuss 
              a unique project - we&apos;ll craft perfection from the oceans bounty.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-100"
                  }`}>
                    📧
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Direct Communication</h3>
                    <a 
                      href="mailto:dima@example.com" 
                      className={`text-blue-400 hover:text-blue-300 transition-colors`}
                    >
                      chef.dima@fishmaster.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-100"
                  }`}>
                    📍
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Studio Location</h3>
                    <p className={`${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}>
                      Nordic Seafood Atelier
                      <br />
                      Bergen, Norway
                    </p>
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-2xl ${
                isDarkMode 
                  ? "bg-gray-700 border border-gray-600" 
                  : "bg-gray-50 border border-gray-200"
              }`}>
                <h3 className="text-xl font-semibold mb-4">Working Hours</h3>
                <div className="space-y-2">
                  <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    Mon-Fri: 9:00 - 18:00 CET
                  </p>
                  <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    Saturday: 10:00 - 16:00 CET
                  </p>
                  <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`focus:ring-2 focus:ring-blue-400 ${
                      isDarkMode ? "bg-gray-700 border-gray-600" : ""
                    }`}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`focus:ring-2 focus:ring-blue-400 ${
                      isDarkMode ? "bg-gray-700 border-gray-600" : ""
                    }`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Your Vision
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={`flex h-32 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 transition-all ${
                    isDarkMode ? "bg-gray-700 border-gray-600" : ""
                  }`}
                />
              </div>

              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  className={`px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105 ${
                    isDarkMode 
                      ? "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-2xl hover:shadow-blue-500/20" 
                      : "bg-blue-500 hover:bg-blue-600 text-white hover:shadow-2xl hover:shadow-blue-500/20"
                  }`}
                >
                  Send Message
                  <span className="ml-3">→</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;