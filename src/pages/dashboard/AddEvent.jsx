import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const AddEvent = () => {
  const [loading, setLoading] = useState(false);
  const [isFree, setIsFree] = useState(false); // State to track if the event is free or not

  const handleCreateEvent = async (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.title.value;
    const price = isFree ? 0 : parseFloat(form.price.value); // Set price to 0 if the event is free
    const description = form.description.value;
    const photo = form.photo.value;

    // Validate form fields
    if (!name || (!price && price !== 0) || !description || !photo) {
      toast.error("Please fill in all fields.");
      return;
    }

    const eventData = {
      name,
      price,
      description,
      photo,
      isFree,
    };

    // Show confirmation toast
    toast((t) => (
      <div>
        <p>Are you sure you want to add this event?</p>
        <div className="flex justify-end mt-4">
          <button
            className="btn btn-primary mr-2"
            onClick={async () => {
              toast.dismiss(t.id);
              setLoading(true);
              try {
                const response = await fetch(
                  "http://localhost:5000/api/v1/event",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(eventData),
                  }
                );

                if (!response.ok) {
                  throw new Error("Failed to add event");
                }

                toast.success("Event added successfully!");
                form.reset();
                setIsFree(false); // Reset isFree state after successful addition
              } catch (error) {
                toast.error(
                  error.message || "Failed to add event. Please try again."
                );
              } finally {
                setLoading(false);
              }
            }}
          >
            Add
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
    <div className="w-full px-16 lg:px-[300px] py-20">
      <Toaster />
      <h1 className="text-4xl mb-4 text-center">Add Event</h1>
      <form onSubmit={handleCreateEvent} className="w-full">
        <div className="mb-4">
          <label htmlFor="title">Title </label>
          <input
            type="text"
            name="title"
            className="w-full py-3 px-5 border"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="photo">Image </label>
          <input
            type="text"
            name="photo"
            className="w-full py-3 px-5 border"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price">Price </label>
          <input
            type="number"
            name="price"
            step="0.01"
            className="w-full py-3 px-5 border"
            value={isFree ? 0 : undefined} // Set value to 0 if isFree is checked
            disabled={isFree} // Disable the input if isFree is checked
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description">Description </label>
          <textarea
            name="description"
            className="w-full py-3 px-5 border"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="isFree" className="inline-flex items-center">
            <input
              type="checkbox"
              name="isFree"
              checked={isFree}
              onChange={(e) => setIsFree(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-500"
            />
            <span className="ml-2">Is Free?</span>
          </label>
        </div>

        <div className="mb-4">
          <input
            type="submit"
            value={loading ? "Adding..." : "Add Event"}
            className="w-full btn py-3 px-5 border btn-neutral cursor-pointer"
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
