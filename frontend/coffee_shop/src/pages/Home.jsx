import React from "react";

/* Components */
import Hero from "../components/Hero";
import ProductSection from "../components/ProductSection";
import TeamSection from "../components/TeamSection";
import ContactSection from "../components/ContactSection";
const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <ProductSection></ProductSection>
      <TeamSection></TeamSection>
      <ContactSection></ContactSection>
    </div>
  );
};

export default Home;
