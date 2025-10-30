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
import ProductListPage from "./pages/ProductListPage";
import OrderPage from "./pages/OrderPage";
import CategoryFormPage from "./pages/CategoryFormPage";
import ProductFormPage from "./pages/ProductFormPage";

import { CartProvider } from "./hooks/useCart";

function App() {
  return (
    <CartProvider>
      <Router>
      <div className="text-base sm:text-lg text-white min-h-screen overflow-x-hidden">
      <Navigation></Navigation>
      <main>
        <Routes>
          <Route path="/" element= {<Home></Home>} />
          <Route path="/reserve-table" element= {<ReserveTable></ReserveTable>} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/customer-data" element={<OrderPage />} />
          <Route path="/category-form" element={<CategoryFormPage />} />
          <Route path="/product-form" element={<ProductFormPage />} />
          {/* Add other routes as needed */}
        </Routes>
      </main>
      <Footer></Footer>
    </div>
    </Router>
    </CartProvider>
  );
}

export default App;
