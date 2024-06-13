import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import toast from "react-hot-toast";
import { IoIosCloseCircle } from "react-icons/io";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const PaymentForm = ({ total, onClose, onPaymentSuccess, booking, token }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    try {
      //   const response = await fetch("http://localhost:5000/api/v1/payment", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ paymentMethodId: paymentMethod.id, total }),
      //   });

      //   if (!response.ok) {
      //     const errorData = await response.json();
      //     throw new Error(errorData.message || "Payment failed");
      //   }

      //   toast.success("Payment successful!");

      // Perform booking action
      const bookingResponse = await fetch(
        "http://localhost:5000/api/v1/event-booking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(booking),
        }
      );

      if (!bookingResponse.ok) {
        const errorData = await bookingResponse.json();
        throw new Error(errorData.message || "Booking failed");
      }

      toast.success("Booking successful!");
      onPaymentSuccess();
    } catch (error) {
      toast.error(error.message || "Payment/Booking failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="bg-blue-300 px-5 mt-10"
        type="submit"
        disabled={!stripe}
      >
        Pay ${total}
      </button>
    </form>
  );
};

const PayModal = ({
  setIsPaymentModalOpen,
  total,
  booking,
  token,
  onClose,
  onPaymentSuccess,
}) => {
  return (
    <div
      id="close"
      onClick={(e) => {
        if (e.target.id === "close") {
          setIsPaymentModalOpen(false);
        }
      }}
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50 w-full h-full"
      style={{ marginLeft: 0 }}
    >
      <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <IoIosCloseCircle
          className="cursor-pointer"
          size={25}
          onClick={() => setIsPaymentModalOpen(false)}
        />
        <h1 className="text-center text-3xl text-gray-700 mb-5">Payment</h1>
        <Elements stripe={stripePromise}>
          <PaymentForm
            total={total}
            booking={booking}
            token={token}
            onClose={onClose}
            onPaymentSuccess={onPaymentSuccess}
          />
        </Elements>
      </div>
    </div>
  );
};

export default PayModal;
