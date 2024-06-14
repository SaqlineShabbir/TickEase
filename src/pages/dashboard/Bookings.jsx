import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const Bookings = () => {
  const { user, token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?._id || !token) {
        setError("User ID or token is missing");
        return;
      }

      try {
        const response = await fetch(
          `https://inventory-backend-ooh5.onrender.com/api/v1/event-booking/${user._id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Failed to fetch bookings: ${errorMessage}`);
        }

        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError(error.message);
      }
    };

    fetchBookings();
  }, [user, token]);

  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await fetch(
        `https://inventory-backend-ooh5.onrender.com/api/v1/event-booking/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to cancel booking: ${errorMessage}`);
      }

      // Filter out the canceled booking from state
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingId)
      );
    } catch (error) {
      console.error("Error canceling booking:", error);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-20 lg:px-40 px-5">
      <h2 className="text-3xl font-bold mb-4">Your Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-xl text-gray-600">No bookings available</p>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-6 text-left">Event Name</th>
                <th className="py-3 px-6 text-left">Type</th>

                <th className="py-3 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-b border-gray-200">
                  <td className="py-4 px-6">{booking.event.name}</td>
                  <td className="py-4 px-6">
                    {booking.total === 0 ? "Free" : "Paid"}
                  </td>

                  <td className="py-4 px-6">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                      onClick={() => handleCancelBooking(booking._id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Bookings;
