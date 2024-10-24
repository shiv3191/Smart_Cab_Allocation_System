import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { dataContext } from "../context/dataContext";
import matrixData from '../helpers/matrix.json';
import "./booking.css";
const cityMapping = require("../helpers/cityMapping.json");

const Component = () => {
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();

    if (month < 10) {
      month = `0${month}`;
    }

    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  const cities = Object.keys(cityMapping);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [availableBuses, setAvailableBuses] = useState([]);
  const [error, setError] = useState("");
  const { user, setUser, date, setDate, loginStatus } = useContext(dataContext);
  const navigate = useNavigate();

  const handleSearch = async () => {
    
    if (!from) {
      setError("Please provide a valid source location.");
      return;
    }

    try {
      // Step 1: Fetch all available cabs from the database
      const response = await axios.get("http://localhost:8000/cab/allCabs"); // Fetch all cabs
      let cabs = response.data; // Assume response gives us a list of all cabs with their 'startLocation'
      // Step 2: Calculate distances between user's start location and each cab's start location
      cabs.forEach(cab => {
        const cabCityPair = `${from}-${cab.route.destination}`; // Construct the key for matrix.json
        const distance = matrixData[cabCityPair]; // Get the distance from matrix.json
        console.log(distance)
        cab.distanceFromUser = distance || Number.MAX_SAFE_INTEGER; // If distance is undefined, set it to a high number
      });
      
      cabs.sort((a, b) => {
        const distanceA = Number(a.distanceFromUser); // Ensure it's a number
        const distanceB = Number(b.distanceFromUser); // Ensure it's a number
        return distanceA - distanceB;
      });

      // Step 4: Update the state with sorted cabs
      setAvailableBuses(cabs);
    } catch (error) {
      console.error("Error fetching available cabs:", error);
    }
  };

  const handleFromChange = (e) => {
    setFrom(e.target.value);
    setTo("");
  };

  const handleBook = (busId, totalSeats, occupiedSeats) => {
    navigate(
      `/bookingdetails/${busId}?totalSeats=${totalSeats}&occupiedSeats=${occupiedSeats}`
    );
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    < >
    <div className="toyota">
      <div className="neeche">

    <nav className="`navbar ${sticky ? 'dark-nav' : ' '}`">
            <div className="xyz">
                <p>CabHub</p>
                <div className="mx-5">

                </div>
            </div>
                <ul>
                <li ><a href="/profile">Profile</a></li>
                </ul>
                
            </nav>
      </div>

    <div className="h-screen flex justify-center items-center grid grid-cols-2">
      <div className="w-[100%] flex justify-center items-center ">
        <div className="flex flex-col w-[90%] bg-[#212936] text-white rounded-lg">
          

          <main className="flex-1 p-4 md:p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter">
                  Book Your Cab Here
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Enter your travel details and we'll find you the best cab.
                </p>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="from">From</label>
                  <select
                    id="from"
                    value={from}
                    onChange={handleFromChange}
                    className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400 text-black"
                  >
                    <option value="">Select Source</option>
                    {cities && cities.length > 0 ? (
                      cities.map((city, index) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))
                    ) : (
                      <option disabled>No cities available</option>
                    )}
                  </select>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="to">To</label>
                  <select
                    id="to"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400 text-black"
                  >
                    <option value="">Select Destination</option>
                    {cities
                      .filter((city) => city !== from) // Filter out the selected source
                      .map((city, index) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="grid gap-2 text-white">
                  <label htmlFor="date">Date</label>
                  <input
                    id="date"
                    type="date"
                    min={getCurrentDate()} // Set the minimum date to the current date
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400 text-black"
                  />
                </div>

                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                  onClick={handleSearch}
                >
                  Search
                </button>

                {error && <p className="text-red-500">{error}</p>}
              </div>
            </div>
          </main>
        </div>
      </div>

      <div className="h-screen p-8 rounded-2xl">
      {availableBuses && availableBuses.length > 0 ? (
  <div className="h-[100%] overflow-scroll flex flex-col  mt-[50px] ">
    <div className="flex align-center justify-center ">

    <h2 className="text-[30px] text-white font-semibold mt-4">Available Cabs:</h2>
    </div>
    <div className="flex justify-center items-center ">
      <ul className="mt-2 overflow-scroll w-[60%]">
        {availableBuses.map((bus) => (
         
            
              <li key={bus._id} className="border-b py-2 h-[100%] bg-white w-[100%] mb-8 rounded  mr-4">
                <div className="flex flex-col bg-white ">
                  <span className="text-lg  bg-white text-black flex align-center justify-center">
                    Cab Nmae: {bus.busName}
                  </span>
                  <span className="text-lg  bg-white text-black flex align-center justify-center">Seater: {bus.totalSeats}</span>
                  <span className="text-lg  bg-white text-black flex align-center justify-center">price per km in $ : {bus.currentOccupancy}</span>
                  <span className="text-lg  bg-white text-black flex align-center justify-center">From: {bus.route.origin}</span>
                  <span className="text-lg  bg-white text-black flex align-center justify-center">To: {bus.route.destination}</span>
                </div>
                <div className="flex justify-center align-center">

                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 mt-2 "
                  onClick={() =>
                    handleBook(bus._id, bus.totalSeats, bus.currentOccupancy, date)
                  }
                >
                  Book
                </button>
                </div>
              </li>
            
          
        ))}
      </ul>
    </div>
  </div>
) : (
  <div className="text-white text-2xl  honda">No available cabs!!</div>
)}


</div>

    </div>
    </div>
    </>
  );
};

function BusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 6v6" />
      <path d="M15 6v6" />
      <path d="M2 12h19.8" />
      <path d="M4 12l1 10h14" />
      <path d="M5 22h14" />
    </svg>
  );
}

export default Component;
