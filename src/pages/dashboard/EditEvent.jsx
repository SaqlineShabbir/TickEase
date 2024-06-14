import React from "react";
import toast from "react-hot-toast";
import { IoIosCloseCircle } from "react-icons/io";

const EditEvent = ({ setOpenModal, eventDa, fetchData, token, load }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const price = form.price.value;
    const description = form.description.value;

    const eventData = {
      name,
      price,
      description,
    };

    toast((t) => (
      <div>
        <p>Are you sure you want to update this event?</p>
        <div className="flex justify-end mt-4">
          <button
            className="btn btn-primary mr-2"
            onClick={async () => {
              toast.dismiss(t.id);

              try {
                const response = await fetch(
                  `https://inventory-backend-ooh5.onrender.com/api/v1/event/${eventDa?._id}`,
                  {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`, // Include the token in the request headers
                    },
                    body: JSON.stringify(eventData),
                  }
                );

                if (response.ok) {
                  toast.success("event updated successfully!");
                  await load();
                  setOpenModal(false);
                } else {
                  toast.error("Failed to update event.");
                }
              } catch (error) {
                toast.error("An error occurred. Please try again.");
              }
            }}
          >
            Sure
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
    <div
      id="close"
      onClick={(e) => {
        if (e.target.id === "close") {
          setOpenModal(false);
        }
      }}
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-50 w-full h-full "
      style={{ marginLeft: 0 }}
    >
      <div className="rounded w-[400px] md:w-[900px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <IoIosCloseCircle
          size={20}
          color="red"
          className="cursor-pointer"
          onClick={() => setOpenModal(false)}
        />

        <h1 className="lg:text-3xl text-gray-700 mb-5">Update event</h1>
        <hr />

        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label htmlFor="name">Name</label>
            <input
              defaultValue={eventDa?.name}
              type="text"
              name="name"
              className="w-full py-3 px-5 border text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              defaultValue={eventDa?.price}
              className="w-full py-3 px-5 border text-gray-700"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description">Description</label>
            <textarea
              defaultValue={eventDa?.description}
              name="description"
              className="w-full py-3 px-5 border text-gray-700"
            />
          </div>

          <div className="mb-4">
            <input
              type="submit"
              value="Edit event"
              className="w-full btn py-3 px-5 border btn-neutral text-gray-700"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
