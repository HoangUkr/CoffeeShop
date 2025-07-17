import React from "react";
// import '../assets/css/global.css';
import Slider from "react-slick";

const images = [];

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <section className="pt-20 bg-[#4B2E2E] text-white">
      <Slider {...settings}>
        {images.map((src, index) => {
          <div
            key={index}
            className="relative h-[500px] bg-cover bg-center"
            style={{ backgroundImage: `url(${src})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center px-4">
              <h2 className="text-4xl font-bold mb-4">
                Welcome to Coffee Point
              </h2>
              <p className="text-lg mb-6">
                Enjoy artisan coffee and delicious cakes in a cozy atmosphere.
              </p>
              <div className="space-x-4">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-[#4B2E2E] font-semibold px-6 py-2 rounded-full">
                  Reserve Table
                </button>
                <button className="bg-white hover:bg-gray-200 text-[#4B2E2E] font-semibold px-6 py-2 rounded-full">
                  Order Products
                </button>
              </div>
            </div>
          </div>;
        })}
      </Slider>
    </section>
  );
};

export default Hero;
