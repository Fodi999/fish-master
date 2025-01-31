"use client";

import Image from "next/image";

interface SelectedItemDetailsProps {
  title: string;
  details: string;
  imageSrc: string;
}

const Details = ({ title, details, imageSrc }: SelectedItemDetailsProps) => {
  const detailPoints = details.split('\n').map((point, index) => (
    <li key={index} className="mb-2 flex items-start">
      <span className="mr-2">🔹</span>
      <span>{point}</span>
    </li>
  ));

  return (
    <div className="mt-8 p-6 bg-white dark:bg-gray-700 rounded-2xl  border-b-4 shadow-lg flex">
      <div className="w-1/3 mr-6">
        <Image
          src={imageSrc}
          alt={title}
          width={300}
          height={300}
          className="rounded-2xl object-cover"
        />
      </div>
      <div className="w-2/3">
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <ul className="text-gray-700 dark:text-gray-300 list-none">
          {detailPoints}
        </ul>
      </div>
    </div>
  );
};

export default Details;