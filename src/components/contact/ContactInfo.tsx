"use client";

import { useTheme } from "@/context/ThemeContext";
import { Facebook, Instagram } from "lucide-react";

const ContactInfo = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="grid md:grid-cols-2 gap-12 mb-12">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-2xl ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}>
            📧
          </div>
          <div>
            <h3 className="text-lg font-semibold">Direct Communication</h3>
            <a href="mailto:dima@example.com" className="text-blue-400 hover:text-blue-300 transition-colors underline">
              chef.dima@fishmaster.com
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-2xl ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}>
            📍
          </div>
          <div>
            <h3 className="text-lg font-semibold">Studio Location</h3>
            <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Nordic Seafood Atelier
              <br />
              Bergen, Norway
            </p>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-4 group">
            <div className={`p-4 rounded-2xl transition-all ${isDarkMode ? "bg-gray-700 group-hover:bg-blue-600" : "bg-gray-100 group-hover:bg-blue-500"}`}>
              <Facebook className={`w-6 h-6 transition-colors ${isDarkMode ? "text-gray-300 group-hover:text-white" : "text-gray-600 group-hover:text-white"}`} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Facebook</h3>
              <a href="https://facebook.com/fishmaster" target="_blank" rel="noopener noreferrer" className={`hover:text-blue-400 transition-colors underline ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
                @fishmaster
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 group">
            <div className={`p-4 rounded-2xl transition-all ${isDarkMode ? "bg-gray-700 group-hover:bg-pink-600" : "bg-gray-100 group-hover:bg-pink-500"}`}>
              <Instagram className={`w-6 h-6 transition-colors ${isDarkMode ? "text-gray-300 group-hover:text-white" : "text-gray-600 group-hover:text-white"}`} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Instagram</h3>
              <a href="https://instagram.com/fishmaster" target="_blank" rel="noopener noreferrer" className={`hover:text-blue-400 transition-colors underline ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
                @fishmaster
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={`p-6 rounded-2xl ${isDarkMode ? "bg-gray-700 border border-gray-600" : "bg-gray-50 border border-gray-200"}`}>
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
  );
};

export default ContactInfo;