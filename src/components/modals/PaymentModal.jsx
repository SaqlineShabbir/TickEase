import { Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";

const stripePromise = loadStripe("your-publishable-key-here");

const PaymentForm = ({ total, onClose, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  //   const handleSubmit = async (event) => {
  //     event.preventDefault();
  //     if (!stripe || !elements) {
  //       return;
  //     }

  //     const cardElement = elements.getElement(CardElement);

  //     const { error, paymentMethod } = await stripe.createPaymentMethod({
  //       type: "card",
  //       card: cardElement,
  //     });

  //     if (error) {
  //       toast.error(error.message);
  //       return;
  //     }

  //     // Send the payment method ID to your server for payment processing
  //     try {
  //       const response = await fetch("https://inventory-backend-ooh5.onrender.com/api/v1/payment", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ paymentMethodId: paymentMethod.id, total }),
  //       });

  //       if (!response.ok) {
  //         const errorData = await response.json();
  //         throw new Error(errorData.message || "Payment failed");
  //       }

  //       toast.success("Payment successful!");
  //       onPaymentSuccess();
  //     } catch (error) {
  //       toast.error(error.message || "Payment failed. Please try again.");
  //     }
  //   };

  return (
    <form>
      {/* <CardElement
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
      /> */}
      <button type="submit" disabled={!stripe}>
        Pay ${total}
      </button>
    </form>
  );
};

const PaymentModal = ({ total, onClose, onPaymentSuccess }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Payment</h2>
        <Elements stripe={stripePromise}>
          {/* <PaymentForm
            total={total}
            onClose={onClose}
            onPaymentSuccess={onPaymentSuccess}
          /> */}
        </Elements>
      </div>
    </div>
  );
};

export default PaymentModal;
