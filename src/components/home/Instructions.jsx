import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import img from "../../assets/people-buy-ticket-vector.jpg";
const Instructions = () => {
  return (
    <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow  my-20">
      <div className="flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
          <img src={img} alt="Ticket Purchase" className="rounded-lg w-full" />
        </div>
        <div className="w-full lg:w-2/3 lg:pl-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Instructions to Purchase Tickets
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-6 h-6 mr-3 flex items-center justify-center">
                <FaCheckCircle className="text-green-600" size={24} />
              </div>
              <p className="text-gray-700">
                Tickets can be bought online ten days in advance.
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 mr-3 flex items-center justify-center">
                <FaCheckCircle className="text-green-600" size={24} />
              </div>
              <p className="text-gray-700">
                You can pay for the tickets using mobile financial services:
                Bkash, Nagad, Rocket, Upay or debit/credit cards: Mastercard,
                Visa, DBBL Nexus. Other payment options will be available soon.
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 mr-3 flex items-center justify-center">
                <FaCheckCircle className="text-green-600" size={24} />
              </div>
              <p className="text-gray-700">
                In case of payment or transaction failure, the deducted amount
                would be refunded by your bank or MFS provider within 8 business
                days.
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 mr-3 flex items-center justify-center">
                <FaCheckCircle className="text-green-600" size={24} />
              </div>
              <p className="text-gray-700">
                In case money has been deducted from your card / mobile wallet
                but you have not received a ticket confirmation, the deducted
                amount would be refunded by your bank or MFS provider within 8
                business days.
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 mr-3 flex items-center justify-center">
                <FaCheckCircle className="text-green-600" size={24} />
              </div>
              <p className="text-gray-700">
                If you have not received your ticket copy in email, kindly check
                your Spam / Junk folder. You can also download your ticket copy
                from the purchase history of your account after you login.
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 mr-3 flex items-center justify-center">
                <FaCheckCircle className="text-green-600" size={24} />
              </div>
              <p className="text-gray-700">
                Download the official Rail Sheba app published by Bangladesh
                Railway from Google Play.
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 mr-3 flex items-center justify-center">
                <FaCheckCircle className="text-green-600" size={24} />
              </div>
              <p className="text-gray-700">
                In case of passengers downloading fake apps or any other app
                from Google Play which claim to sell train tickets of Bangladesh
                Railway, the authorities will not take any liability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
