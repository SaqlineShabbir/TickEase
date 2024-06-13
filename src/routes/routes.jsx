import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Error from "../pages/Error";
import EventDetails from "../pages/EventDetails";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddEvent from "../pages/dashboard/AddEvent";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/events/:id", // Dynamic route for event details
        element: (
          <PrivateRoute>
            <EventDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/signup",
        element: <Register />,
      },
      {
        path: "dashboard/add-event",
        element: <AddEvent />,
      },
    ],
  },
]);
