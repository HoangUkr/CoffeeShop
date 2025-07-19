import React from "react";
import PersonCard from "./cards/PersonCard";
const people = [
  {
    id: 1,
    name: "Cuc Pham",
    role: "Founder & CEO",
    image: "/team/photo.jpg",
  },
  {
    id: 2,
    name: "Hoang Pham",
    role: "Full Stack Developer",
    image: "/team/photo.jpg",
  },
  {
    id: 3,
    name: "Cat Tuong",
    role: "Photographer",
    image: "/team/photo.jpg",
  },
];

const TeamSection = () => {
  return (
    <section className="px-4 py-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-[#4B2E2E] mb-6 text-center">
        Meet Our Team
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {people.map((person) => (
          <PersonCard key={person.id} person={person} />
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
