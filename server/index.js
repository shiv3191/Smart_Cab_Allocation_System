
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const signupRoute = require("./routes/signUpRoutes");
const UserModel = require("./models/UsersModel");
const BusModel = require("./models/busModel");
const loginRoute = require("./routes/logInRoutes");
const addBus = require("./routes/busRoutes");
const availablebuses = require("./routes/availableBus");
const checkseatavailability = require("./routes/seatAvailability");
const reserveseat = require("./routes/seatBooking");
const cancelseatbooking = require("./routes/cancelSeatBooking");
const userRoutes = require("./routes/userRoutes");
const jwt = require('jsonwebtoken');
let session = require('express-session');
let sessionOptions = {
  secret: 'secret for signing session id',
  cookie: {
    maxAge:269999999999
  },
  saveUninitialized: true,
  resave:true
};

const app = express();
app.use(cors());
const port = 8000;

const mongoose = require("mongoose");
const dbUrl = "mongodb+srv://root:root@cluster0.nkrnb.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connected successfully");
})
.catch(err => {
  console.error("MongoDB connection error:", err);
});


app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get('/cab/allCabs', async (req, res) => {
  try {
    const cabs = await BusModel.find(); // Assuming you're using a MongoDB database with a Cab model
    res.json(cabs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cabs" });
  }
});




//app.use(bodyParser.json());
app.use(session(sessionOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Use authentication routes
app.use("/users", loginRoute);

// Routes
app.use("/users", signupRoute);

// for adding the bus information
app.use("/bus",addBus);

// get available buses
app.use("/bus",availablebuses);

// check seat availability
app.use("/bus",checkseatavailability);

// reserve seat
app.use("/bus",reserveseat);

app.use("/bus",cancelseatbooking);

app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


