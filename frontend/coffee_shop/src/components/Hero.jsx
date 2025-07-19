import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import '../assets/css/global.css';
import Slider from "react-slick";

const images = [
  // "https://source.unsplash.com/1600x900/?coffee",
  "/carousel/carousel-1.jpg",
  "/carousel/carousel-2.jpg",
  "/carousel/carousel-3.jpg",
];

const Hero = () => {
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // State to manage active button
  const [activeButton, setActiveButton] = useState(null);

  // Navigation hook
  const navigate = useNavigate();

  return (
    <section className="pt-20 sm:pt-24 bg-[#4B2E2E] w-full text-white">
      <Slider {...settings}>
        {images.map((src, index) => (
          <div
            key={index}
            className="relative h-[500px] bg-cover bg-center sm:h-[600px] lg:h-[700px] w-full"
            // style={{ backgroundImage: `url(${src})` }}
          >
            <img
              src={src}
              loading="lazy"
              alt={`Slide ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover z-0"
            ></img>
            <div className="absolute inset-0 w-full z-10 bg-opacity-40 flex flex-col items-center justify-center text-center px-4">
              <h2 className="text-4xl font-bold mb-4">
                Welcome to Sweet Coffee
              </h2>
              <p className="text-lg mb-6">
                Enjoy artisan coffee and delicious cakes in a cozy atmosphere.
              </p>
              <div className="space-x-4">
                <button
                  aria-label="Reserve Table"
                  className={`bg-yellow-500 hover:bg-yellow-600 text-[#4B2E2E] font-semibold px-6 py-2 rounded-full ${
                    activeButton === "reserve"
                      ? "border-2 border-white"
                      : "border-2 border-yellow-500"
                  }`}
                  onClick={() => {
                    setActiveButton("reserve");
                    navigate("/reserve-table");
                  }}
                >
                  Reserve Table
                </button>
                <button
                  aria-label="Order Products"
                  className={`bg-white hover:bg-gray-200 text-[#4B2E2E] font-semibold px-6 py-2 rounded-full ${
                    activeButton === "order"
                      ? "border-2 border-yellow-500"
                      : "border-2 border-white"
                  }`}
                  onClick={() => setActiveButton("order")}
                >
                  Order Products
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Hero;
