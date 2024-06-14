import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Register = () => {
  const [passMatch, setPassMatch] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(false);
  const from = location?.state?.from?.pathname || "/";

  const handleSUbmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const name = form.name.value;
    const password = form.password.value;
    const confirm_password = form.confirm_password.value;

    if (password !== confirm_password) {
      setPassMatch(false);
    }

    if (password === confirm_password) {
      const userInfo = {
        email: email,
        name: name,
        password: password,
      };
      fetch("https://inventory-backend-ooh5.onrender.com/api/v1/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          navigate("/login");
        });

      if (user) {
        navigate(from);
      }
    }
  };

  return (
    <form
      onSubmit={handleSUbmit}
      className="flex items-center justify-center min-h-screen "
    >
      <div className="max-w-md w-full bg-white rounded-lg  p-8">
        <h1 className="text-3xl font-semibold mb-4 text-center">
          Register Now
        </h1>
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="name"
              placeholder="Enter your name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm pl-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              name="name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm pl-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              name="email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm pl-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              name="password"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm pl-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              name="confirm_password"
              required
            />
          </div>
          {!passMatch && (
            <p className="text-red-500">Passwords do not match!</p>
          )}
          <button className="bg-green-400 focus:outline-none focus:bg-green-600 text-white w-full py-2 rounded-md ">
            Register
          </button>

          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Register;
