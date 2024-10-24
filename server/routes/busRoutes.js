const express = require("express");
const router = express.Router();
const Cab = require("../models/busModel");
const { ObjectId } = require("mongodb");

// Get all buses
router.get("/getAllbus", async (req, res) => {
  try {
    const Cabs = await Cab.find();
    res.json(Cabs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new bus

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

router.post("/addBus", async (req, res) => {
  
  const { busName, totalSeats, currentOccupancy, availableDays, route } = req.body;
  // Validate required fields
  if (!busName || !totalSeats || !currentOccupancy || !route || !route.origin || !route.destination) {
   return res.status(400).json({ message: "All fields are required. Ensure CabName, totalSeats, currentOccupancy, and route with origin and destination are provided." });
  }
  
  // Additional validation for totalSeats and currentOccupancy
  if (totalSeats <= 0) {
    return res.status(400).json({ message: "Total seats must be greater than zero." });
  }

  if (currentOccupancy <= 0 ) {
    return res.status(400).json({ message: "Price must be greater than zero." });
  }

  try {
    // Initialize the seat plan
    const seatPlan = Array.from({ length: totalSeats }, (_, index) => ({
      seatNumber: `Seat-${index + 1}`,
      design: index % 2 === 0 ? "Window" : "Aisle",
      isBooked: false,
    }));

    // Randomly allocate occupied seats
    const occupiedSeats = seatPlan.slice(0, currentOccupancy);
    shuffleArray(occupiedSeats);

    // Update isBooked for occupied seats
    occupiedSeats.forEach((seat) => {
      seat.isBooked = true;
    });
   const CabName = busName;
    const newCab = new Cab({
      CabName,
      totalSeats,
      currentOccupancy,
      availableDays,
      route,
      seatPlan,
    });
    
    console.log(newCab)
    // Save the bus to the database
    await newCab.save(); 
    // Send a single response after saving the bus
    res.status(201).json({ message: "Cab added successfully", Cab: newCab });
  } catch (error) {
    console.error('Error saving Cab:', error); // Log the error for debugging
    res.status(500).json({ message: "An error occurred while saving the Cab." });
  }
});





// getBusById
router.get("/getCabById/:id", async (req, res) => {
  const { id } = req.params;
  const _id = new ObjectId(id);
  try {
    const Cab = await Cab.findById(_id);
    if (!Cab) {
      return res.status(404).json({ message: "Cab not found" });
    }
    res.json(Cab);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Update bus details
router.post("/update/:id", async (req, res) => {
  const { id } = req.params;
  const _id = new ObjectId(id);
  try {
    const updatedCab = await Cab.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    //res.json({ message: "Bus deleted successfully" });
    res.json(updatedCab);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a bus
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const _id = new ObjectId(id);
  try {
    await Cab.findByIdAndDelete(_id);
    res.json({ message: "Cab deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
