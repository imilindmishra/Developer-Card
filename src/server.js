// server.js

import express, { json } from "express";
import { connect, Schema, model } from "mongoose";
import cors from "cors";

const app = express();
const PORT = 5000;
app.use(cors());

// Connect to MongoDB (replace 'YOUR_MONGODB_URI' with your actual MongoDB URI)
connect(
  "mongodb+srv://user123:qCLWtaO41eNHnlwK@cluster0.yn6gak9.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define a Mongoose schema for cards
const cardSchema = new Schema({
  name: String,
  role: String,
  interests: String,
  githubUsername: String,
  profilePic: String,
  socialMedia: [{ name: String, link: String }],
});

// Create a Mongoose model for cards
const Card = model("Card", cardSchema);

// Middleware to parse JSON body
app.use(json());

// Route handler to add a new card
app.post("/api/card", async (req, res) => {
  try {
    const card = req.body; // Correctly get the full card data from the body
    const newCard = await Card.create(card);
    res.status(201).json(newCard);
  } catch (err) {
    console.error("Failed to create card:", err);
    res.status(500).json({ message: "Failed to create card" });
  }
});


// Route handler to fetch all cards
app.get("/api/cards", async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
