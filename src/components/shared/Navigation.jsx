import React, { useEffect, useRef, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import img from "../../assets/react.svg";
import useAuth from "../../hooks/useAuth";
export default function Navigation() {
  const [dropdown, setDropdown] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const { user, logOut } = useAuth();

  //dropdown
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <nav className="w-full  py-5 border-b-[1px] fixed top-0 left-0 right-0 z-20">
      <div className="justify-between px-4 md:items-center md:flex md:px-20">
        <div>
          <div className="flex items-center justify-between md:block">
            <Link to="/">
              <div className="flex cursor-pointer">
                <img className="w-[50px]" src={img} alt="Logo" />
              </div>
            </Link>
            <div className="md:hidden">
              <button
                className="p-2 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 dark:text-white">
              <li className="hover:text-black-600 focus:border-gray-100 cursor-pointer">
                <Link to="/">
                  <p>Home</p>
                </Link>
              </li>
              <li className="hover:text-black-600 cursor-pointer">
                <Link to="/shop">
                  <p>Shop</p>
                </Link>
              </li>
              {user && (
                <li
                  className="group relative cursor-pointer"
                  onClick={() => setDropdown(!dropdown)}
                  ref={dropdownRef}
                >
                  <div className="flex items-center">
                    <p className="hover:text-black-600">Dashboard</p>
                    <RiArrowDropDownLine size={35} />
                  </div>

                  {dropdown && (
                    <div className="lg:absolute bg-white dark:bg-[#e5ca1b] dark:text-white text-black right-0 w-[200px] border border-gray-200 py-5 transition-all duration-300 opacity-100 transform scale-y-100">
                      <ul>
                        <Link to="dashboard/profile">
                          <li className="px-4 py-2 transition-all duration-300 opacity-100 transform scale-100 hover:bg-gray-100 hover:text-black">
                            Profile
                          </li>
                        </Link>
                        <Link to="dashboard/add-event">
                          <li className="px-4 py-2 transition-all duration-300 opacity-100 transform scale-100 hover:bg-gray-100 hover:text-black">
                            Add Product
                          </li>
                        </Link>
                        <Link to="dashboard/manage-products">
                          <li className="px-4 py-2 transition-all duration-300 opacity-100 transform scale-100 hover:bg-gray-100 hover:text-black">
                            Manage Products
                          </li>
                        </Link>
                      </ul>
                    </div>
                  )}
                </li>
              )}
              <li className="hover:text-black-600 cursor-pointer">
                <Link to="/jobs">
                  <p>Jobs</p>
                </Link>
              </li>
              {!user && (
                <li className="hover:text-black-600 cursor-pointer">
                  <Link to="/signup">
                    <p>Signup</p>
                  </Link>
                </li>
              )}
              {!user && (
                <li className="hover:text-black-600 cursor-pointer">
                  <Link to="/login">
                    <p>Login</p>
                  </Link>
                </li>
              )}
              {user && (
                <li
                  onClick={() => logOut()}
                  className="hover:text-black-600 cursor-pointer"
                >
                  <Link to="/login">
                    <IoIosLogOut size={20} />
                  </Link>
                </li>
              )}
              {user && (
                <div>
                  <p className="font-bold text-xl py-2 border-white border-2 rounded-full px-4">
                    {user?.name?.slice(0, 1)}
                  </p>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
