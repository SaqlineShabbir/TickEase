import React from "react";
import image from "../../assets/people-buy-ticket-vector.jpg";

const Banner = () => {
  return (
    <div className="relative h-screen">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-green-400 opacity-50 "></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center  z-10">
        <h1 className="lg:text-7xl sm:text-6xl text-3xl font-bold mb-4">
          Event ticketing made simple
        </h1>
        <p className="text-xl sm:text-xl mb-8">
          Start selling tickets in 2 minutes
        </p>
        <button className="bg-green-300 text-white px-12 py-4  shadow-lg font-semibold hover:bg-green-500 hover:text-white transition duration-300 ease-in-out">
          Create Event
        </button>
      </div>
    </div>
  );
};

export default Banner;
