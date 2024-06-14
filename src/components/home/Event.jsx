import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Event = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        "https://inventory-backend-ooh5.onrender.com/api/v1/event"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const eventData = await response.json();
      setEvents(eventData.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <div className="container mx-auto px-5 lg:px-[140px] py-20">
      <h1 className="text-4xl font-bold mb-8 text-center">Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white border rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={event.photo}
              alt={event.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-2">{event.name}</h2>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <p className="text-gray-800 font-semibold mb-4">
                ${event.price.toFixed(2)}
              </p>
              <Link
                to={`/events/${event._id}`}
                className="mt-4 inline-block bg-green-300 text-white px-4 py-2 rounded hover:bg-green-400 transition duration-300"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Event;
