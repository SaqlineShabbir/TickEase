import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import EditEvent from "./EditEvent";

const Manageevents = () => {
  const [events, setEvents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [eventDa, setEventDa] = useState({});
  const { token } = useAuth();

  async function load() {
    try {
      const eventRes = await fetch(
        "https://inventory-backend-ooh5.onrender.com/api/v1/event",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );
      const eventData = await eventRes.json();
      setEvents(eventData?.data || []);
    } catch (error) {
      toast.error("Failed to load events.");
    }
  }
  useEffect(() => {
    load();
  }, [token]); // Ensure useEffect runs when the token changes

  const handleSendId = (sdata) => {
    setEventDa(sdata);
  };

  const handleDeleteEvent = (id) => {
    toast((t) => (
      <div>
        <p>Are you sure you want to delete this event?</p>
        <div className="flex justify-end mt-4">
          <button
            className="btn btn-danger mr-2"
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                const response = await fetch(
                  `https://inventory-backend-ooh5.onrender.com/api/v1/event/${id}`,
                  {
                    method: "DELETE",
                    headers: {
                      Authorization: `Bearer ${token}`, // Include the token in the request headers
                    },
                  }
                );
                if (response.ok) {
                  setEvents(events.filter((event) => event._id !== id));
                  toast.success("event deleted successfully!");
                } else {
                  toast.error("Failed to delete event.");
                }
              } catch (error) {
                toast.error("An error occurred. Please try again.");
              }
            }}
          >
            Delete
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="min-h-[90vh] lg:px-20 pt-20 px-5  text-white">
      <Toaster />
      <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
        {events.map((event) => (
          <div key={event?._id} className="border">
            <div className="group rounded-md overflow-hidden hover:shadow-lg border">
              <div className="w-full h-32">
                <img
                  src={event?.photo}
                  alt="service image"
                  className="w-full h-full object-cover transition-opacity"
                />
              </div>
            </div>
            <div className="p-4 bg-green-300 flex justify-between">
              <h3 className="text-xl font-semibold mb-2">{event?.name}</h3>
              <div className="flex space-x-5">
                <span
                  onClick={() => setOpenModal(true)}
                  className="text-green-500 text-2xl cursor-pointer"
                >
                  <MdEditSquare onClick={() => handleSendId(event)} />
                </span>
                <span className="text-2xl text-green-500 cursor-pointer">
                  <AiFillDelete onClick={() => handleDeleteEvent(event?._id)} />
                </span>
              </div>
            </div>
            {openModal && (
              <EditEvent
                setOpenModal={setOpenModal}
                events={events}
                eventDa={eventDa}
                token={token}
                load={load}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Manageevents;
