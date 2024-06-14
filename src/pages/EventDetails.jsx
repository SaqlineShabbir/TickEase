import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import PayModal from "../components/modals/PayModal";
import useAuth from "../hooks/useAuth";

const EventDetails = () => {
  const [active, setActive] = useState("description");
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false); // State to control modal
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `https://inventory-backend-ooh5.onrender.com/api/v1/event/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch event");
        }
        const data = await response.json();
        setEvent(data.data);
        setIsError(false);
      } catch (error) {
        console.error("Error fetching event details:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    } else {
      setIsLoading(false);
      setIsError(true);
    }
  }, [id]);

  const total = quantity * (event ? event.price : 0);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const booking = {
    user: user?._id,
    event: id,
    tickets: quantity,
    total: total,
  };

  const handleBooking = async () => {
    if (event?.isFree) {
      await bookEvent(); // Directly book if event is free
    } else {
      console.log("Opening payment modal...");
      setIsPaymentModalOpen(true); // Open payment modal if event is not free
    }
  };

  const bookEvent = async () => {
    const bookingData = {
      user: user?._id,
      event: id,
      tickets: quantity,
      total: total,
    };

    try {
      const response = await fetch(
        "https://inventory-backend-ooh5.onrender.com/api/v1/event-booking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bookingData),
        }
      );

      console.log("eeeee", response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to book event");
      }

      toast.success("Event booked successfully!");
    } catch (error) {
      console.error("Error booking event:", error);
      toast.error(error.message || "Failed to book event. Please try again.");
    }
  };

  let content = null;
  if (isLoading) {
    content = (
      <div className="px-[200px] py-20 space-y-5">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isLoading && isError) {
    content = <p>There was an error loading the event details.</p>;
  }

  if (!isLoading && !isError && !event) {
    content = <p>No event found.</p>;
  }

  if (!isLoading && !isError && event) {
    content = (
      <div className="lg:px-[200px] px-10 py-20 min-h-screen">
        <div className="lg:flex lg:space-x-10 w-full space-y-5">
          <div className="lg:w-1/2">
            <img src={event.photo} alt={event.name} />
          </div>
          <div className="lg:w-1/2">
            <p>Total: ${total}</p>
            <p className="text-2xl">{event.name}</p>
            <span>{event.description}</span>

            <div className="flex space-x-2 py-5">
              <span className="pt-2">Tickets:</span>
              <div className="flex space-x-2 dark:text-black">
                <button
                  onClick={handleDecrement}
                  className="px-5 py-1 text-3xl bg-green-100"
                >
                  -
                </button>
                <button className="px-5 py-1 text-xl bg-green-100">
                  {quantity}
                </button>
                <button
                  onClick={handleIncrement}
                  className="px-5 py-1 text-xl bg-green-100"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleBooking}
                className="px-5 py-1 text-xl bg-green-400 text-white cursor-pointer"
              >
                Order Tickets
              </button>
              <p>{error}</p>
            </div>
            <hr />
          </div>
        </div>
        <div className="space-x-10 py-5">
          <button
            className={`text-xl font-bold ${
              active === "description" && "border-b-2 border-b-green-400"
            }`}
            onClick={() => setActive("description")}
          >
            Description
          </button>
          <button
            className={`text-xl font-bold ${
              active === "reviews" && "border-b-2 border-b-green-400"
            }`}
            onClick={() => setActive("reviews")}
          >
            Reviews
          </button>
        </div>

        <div>
          {active === "description" && (
            <div>
              <h2 className="text-2xl font-bold">Description</h2>
              <p>{event.description}</p>
            </div>
          )}
          {active === "reviews" && (
            <div>
              <h2 className="text-2xl font-bold">Reviews</h2>
              {/* Render reviews component here */}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Toaster />
      {content}
      {/* Render PaymentModal conditionally */}
      {isPaymentModalOpen && (
        <PayModal
          total={total}
          booking={booking}
          token={token}
          setIsPaymentModalOpen={setIsPaymentModalOpen}
          onPaymentSuccess={async () => {
            setIsPaymentModalOpen(false);
            await bookEvent();
          }}
        />
      )}
    </div>
  );
};

export default EventDetails;
