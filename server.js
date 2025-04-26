const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Signup Route

app.get('/', (req,res)=>{
  res.send("This is my working page");
})

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

  
// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

