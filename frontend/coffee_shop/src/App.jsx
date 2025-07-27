import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/css/global.css";

/* Components */
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

/* Pages */
import Home from "./pages/Home";  
import ReserveTable from "./pages/ReserveTable";
import CartPage from "./pages/CartPage";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <div className="text-base sm:text-lg text-white min-h-screen">
      <Navigation></Navigation>
      <main>
        <Routes>
          <Route path="/" element= {<Home></Home>} />
          <Route path="/reserve-table" element= {<ReserveTable></ReserveTable>} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
      <Footer></Footer>
    </div>
    </Router>
  );
}

export default App;
