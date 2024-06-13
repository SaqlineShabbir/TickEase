import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

const Event = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from your API when component mounts
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/event");
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const eventData = await response.json();
      setEvents(eventData.data); // Assuming eventData.data is an array of events
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {events.map((event) => (
          <div
            key={event._id}
            className="border rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={event.photo}
              alt={event.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{event.name}</h2>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <p className="text-gray-800 font-semibold">
                ${event.price.toFixed(2)}
              </p>
              <Link
                to={`/events/${event._id}`}
                className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
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
