import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#4B2E2E] text-white py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Sweet Coffee. Sweetness and Love.</p>
        <p className="mt-2">Our ☕ and 🍰 are made with passion and love - just the way you like.</p>
      </div>
    </footer>
  );
};

export default Footer;