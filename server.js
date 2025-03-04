const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());


// User Schema
const userSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true }, 
  DOB: { type: Number, required: true },
});

const User = mongoose.model("newuser", userSchema);

// Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { Name, Email, Password, DOB } = req.body;

    if (!Email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!Password || Password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      Name,
      Email,
      Password,
      DOB,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
app.get("/users", async (req, res) => {
    try {
      const users = await User.find({}, { Password: 0 });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
  
// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
