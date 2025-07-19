import { useState } from "react";
// import './App.css'
import "./assets/css/global.css";

/* Components */
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import ProductSection from "./components/ProductSection";
import TeamSection from "./components/TeamSection";

function App() {
  return (
    <div className="text-base sm:text-lg text-white min-h-screen">
      <Navigation></Navigation>
      <main>
        <Hero></Hero>
        <ProductSection></ProductSection>
        <TeamSection></TeamSection>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
