import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import wave from "./wave.jpg";
import "./cabs.css";
import { dataContext } from "../context/dataContext";

const locations = require("../helpers/cityMapping.json");

export default function Cabs() {
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);
  const { user, setUser, setLoginStatus } = useContext(dataContext);
  const { buses, setBuses, loginStatus } = useContext(dataContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [newBus, setNewBus] = useState({
    busName: "",
    totalSeats: 0,
    currentOccupancy: 0,
    availableDays: [],
    route: {
      origin: "",
      destination: "",
    },
  });

  // Handle Logout
  const handleLogout = () => {
    setLoginStatus(false);
    localStorage.removeItem("token");
    setUser(null);
    setShowLogoutMessage(true);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  // Ensure user is logged in
  useEffect(() => {
    !loginStatus && navigate("/login");
  }, [loginStatus]);

  // Fetch bus data
  const fetchBuses = async () => {
    try {
      const response = await axios.get("http://localhost:8000/bus/getAllBus");
      const reversedArray = response.data.reverse();
      setBuses(reversedArray);
      console.log(1234)
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  // Open/Close modal
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "origin" || name === "destination") {
      setNewBus((prevBus) => ({
        ...prevBus,
        route: {
          ...prevBus.route,
          [name]: value,
        },
      }));
    } else {
      setNewBus((prevBus) => ({
        ...prevBus,
        [name]: value,
      }));
    }
  };

  // Submit new bus data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedBus = {
        ...newBus,
        route: {
          origin: newBus.route.origin,
          destination: newBus.route.destination,
        },
      };

      const response = await axios.post(
        "http://localhost:8000/bus/addBus",
        formattedBus
      );

      if (response.status === 201) {
        alert("Successfully added a new Cab!");
        fetchBuses();
        setOpen(false);

        // Reset form
        setNewBus({
          busName: "",
          totalSeats: 0,
          currentOccupancy: 0,
          availableDays: [],
          route: {
            origin: "",
            destination: "",
          },
        });
      }
    } catch (error) {
      console.error("Error adding new bus:", error.response || error.message);
      alert(
        `Error: ${error.response?.data?.message || "An error occurred"}`
      );
    }
  };

  return (
    <div className="">
      <div>
        <nav className="navbar">
          <div className="xyz">
            <p className="ml-[40px]">CabHub</p>
          </div>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <button className="xxx" onClick={handleLogout}>
              Logout
            </button>
          </ul>
        </nav>
      </div>

      <div className="photo1">
        <div className="mt-[200px]"></div>

        <div className="text flex align-center justify-center">
          <div className="text1">
            <p className="text-white">Hey</p>
          </div>
          <div className="text2">
            <img src={wave} alt="" />
          </div>
        </div>

        <h1 className="text-xl tracking-tighter sm:text-2xl xl:text-[45px] text-white flex items-center justify-center mb-[30px]">
          {user ? `Welcome, ${user.email}!` : "Welcome!"}
        </h1>

        <div className="text-xl tracking-tighter sm:text-2xl xl:text-[28px] text-white flex items-center justify-center mb-[60px]">
          Register Your Cab Here.
        </div>

        <div className="patel">
          <Button
            onClick={handleOpen}
            variant="contained"
            color="primary"
            style={{ marginBottom: "20px" }}
            className="shiv"
          >
            Register your Cab Here
          </Button>
        </div>

        <div className="cards grid gap-8 sm:grid-cols-2 lg:grid-cols-3 text-black ml-10 mr-10">
          {buses.map((bus) => (
            <Card
              key={bus._id}
              CardTitle={bus.busName}
              CardDescription={`Total Seats: ${bus.totalSeats}, Current Occupancy: ${bus.currentOccupancy}`}
              Button={<Link to={`/viewdetails/${bus._id}`}>View Details</Link>}
              BusId={bus._id}
              busDetails={bus}
            />
          ))}
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <h2 id="modal-title">Register Cab Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap mb-4">
                <div className="w-full px-4">
                  <label htmlFor="busName">Cab Name:</label>
                  <input
                    type="text"
                    id="busName"
                    name="busName"
                    value={newBus.busName}
                    onChange={handleInputChange}
                    className="border-0 px-3 py-3 text-blueGray-600 bg-white rounded text-sm shadow w-full"
                  />
                </div>
              </div>
              <div className="flex flex-wrap mb-4">
                <div className="w-full px-4">
                  <label htmlFor="totalSeats">Seater:</label>
                  <input
                    type="number"
                    id="totalSeats"
                    name="totalSeats"
                    value={newBus.totalSeats}
                    onChange={handleInputChange}
                    className="border-0 px-3 py-3 text-blueGray-600 bg-white rounded text-sm shadow w-full"
                  />
                </div>
              </div>
              <div className="flex flex-wrap mb-4">
                <div className="w-full px-4">
                  <label htmlFor="currentOccupancy">Price /km in $</label>
                  <input
                    type="number"
                    id="currentOccupancy"
                    name="currentOccupancy"
                    value={newBus.currentOccupancy}
                    onChange={handleInputChange}
                    className="border-0 px-3 py-3 text-blueGray-600 bg-white rounded text-sm shadow w-full"
                  />
                </div>
              </div>
              <div className="flex flex-wrap mb-4">
                <div className="w-full px-4">
                  <label htmlFor="origin">City:</label>
                  <select
                    id="origin"
                    name="origin"
                    value={newBus.route.origin}
                    onChange={handleInputChange}
                    className="border-0 px-3 py-3 text-blueGray-600 bg-white rounded text-sm shadow w-full"
                  >
                    <option value="" disabled>
                      Select a city
                    </option>
                    <option value="Indore">Indore</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-wrap mb-4">
                <div className="w-full px-4">
                  <label htmlFor="destination">Current location:</label>
                  <select
                    id="destination"
                    name="destination"
                    value={newBus.route.destination}
                    onChange={handleInputChange}
                    className="border-0 px-3 py-3 text-blueGray-600 bg-white rounded text-sm shadow w-full"
                  >
                    <option value="" disabled>
                      Select your location
                    </option>
                    {Object.keys(locations).map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
