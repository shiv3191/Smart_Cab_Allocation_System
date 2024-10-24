import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { dataContext } from "../context/dataContext";
import ProfileBookingCard from "../components/ProfileBookingCard";
import { FaCarSide } from "react-icons/fa";
import Cabs from "./Cabs";
import "./profile.css";
import wave from "./wave.jpg";

function Profile() {
  const location = useLocation();
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);
  const { user, setUser, loginStatus, setLoginStatus } = useContext(dataContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoginStatus(false);
    localStorage.removeItem("token");
    setUser(null);
    setShowLogoutMessage(true);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };
  console.log(user);
  useEffect(() => {
    !loginStatus && navigate("/login");
  }, [loginStatus]);

  return loginStatus && user && user.role==='client' ? (
    <div>
      <nav className="`navbar ${sticky ? 'dark-nav' : ' '}`">
              <div className="xyz">
                  <p className="ml-[40px]">CabHub</p>
                  <div className="mx-5">
  
                  </div>
              </div>
                  <ul>
                  <li ><a href="/">Home</a></li>
                  <button className="xxx" onClick={handleLogout}>
              Logout
            </button>
                  </ul>
                  
              </nav>
      <div className="flex flex-col h-screen bg-gradient-to-r from-green-400 to-blue-500 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        {/* <header className="px-4 lg:px-6 h-16 flex items-center bg-white dark:bg-gray-800 shadow-md py-4">
          <Link className="flex items-center justify-center" to="#">
            <FaCarSide className="h-8 w-8 text-blue-500" />
            <span className="ml-2 text-lg font-semibold text-blue-500">
              CabHub
            </span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link className="text-sm font-medium hover:underline underline-offset-4" to="/">
              Home
            </Link>
            <button className="text-sm font-medium hover:underline underline-offset-4" onClick={handleLogout}>
              Logout
            </button>
          </nav>
        </header> */}
        
        <main className="flex-1 bg-gray-100 dark:bg-gray-800 h-screen">
          {showLogoutMessage && (
            <div className="bg-green-500 text-white py-2 text-center">
              You are successfully Signed Out.
            </div>
          )}
          <section className="w-full grid grid-cols-2 h-[100%] mt-[130px]">

            <div className="container px-4 md:px-6 cols-span-1 flex items-center  flex-col mt-[150px]">
              <div className="text">
                <div  className="text1 "> 
                  <p className="text-black">Hey</p>
                </div>
                <div className="text2">
                  <img src={wave} alt="" / >
                </div>
              </div>
              <h1 className="text-xl tracking-tighter sm:text-2xl xl:text-[45px] text-black flex items-center justify-center mb-[30px]">
                Welcome, {user.email}!
              </h1>
              <div className="text-xl tracking-tighter sm:text-2xl xl:text-[28px] text-black flex items-center justify-center mb-[10px]">
                Book you Cab and Enjoy your ride.
              </div>
              <div className="text-center mt-4">
                <button
                  className="bg-green-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out text-xl"
                  onClick={() => {
                    navigate("/booking");
                  }}
                >
                  Book Cab
                </button>
              </div>
            </div>
            <div>
              {user.bookings && (
                <div className="container px-4 md:px-6 h-[80%]">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center text-blue-500 mb-4">
                    Your Bookings
                  </h2>
                  <div className="mx-auto max-w-5xl overflow-scroll h-[30%]">
                    {user.bookings.map((booking, id) => (
                      <ProfileBookingCard key={id} booking={booking} id={id}></ProfileBookingCard>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </main>
        {/* <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white dark:bg-gray-800 shadow-md sticky bottom-0 z-10">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2024 CabHub. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link className="text-xs hover:underline underline-offset-4" to="#">
              Terms of Service
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" to="#">
              Privacy
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" to="#">
              Contact
            </Link>
          </nav>
        </footer> */}

<div className='foot footer'>
        <p>© 2024 CarHub. All rights reserved.</p>
        <ul>
            <li>Terms of Services</li>
            <li>Privacy Policy</li>
        </ul>
    </div>
      </div>
    </div>
    ) : (
      <Cabs/>
    );
}

export default Profile;
