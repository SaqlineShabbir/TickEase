import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const [error, setError] = useState(null);
  const { user, getUserInfo } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const response = await fetch(
        "https://inventory-backend-ooh5.onrender.com/api/v1/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      console.log(data?.token, data);
      if (data?.status === "success") {
        getUserInfo(data?.user?.email);
        toast.success("Login successful!");
        // Store token in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data?.user?.email);
        navigate(from, { replace: true });
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user?.email) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center min-h-screen "
    >
      <div className="max-w-md w-full bg-white rounded-lg p-8">
        <h1 className="text-3xl font-semibold mb-4 text-center">Login Now</h1>
        <div className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered border border-gray-300 w-full py-2 px-3 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              name="email"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered border border-gray-300 w-full py-2 px-3 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              name="password"
              required
            />
          </div>
          <div className="form-control">
            <button
              className="btn btn-primary w-full py-2 rounded-md bg-orange-400 focus:outline-none focus:bg-indigo-600"
              type="submit"
            >
              Login
            </button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <p className="mt-4 text-center">
            New here?{" "}
            <Link to="/signup" className="text-blue-500">
              Register
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Login;
