"use client";

import React from "react";

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ icon, title }) => {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
  );
};

export default SectionHeader;
