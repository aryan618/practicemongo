const express = require("express");
const mongoose = require("mongoose");
const Element = require("./element1"); // Require the Element model

const hostname = "127.0.0.1";
const port = 3000;
const mongoUrl = "mongodb://localhost:27017/employees"; // Replace with your MongoDB connection string

// Create an Express application
const app = express();

// Set up middleware to parse request bodies as JSON
app.use(express.json());

// Define a route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Create a new element
app.post("/elements", (req, res) => {
  const { name, description } = req.body;

  const newElement = new Element({ name, description });

  newElement
    .save()
    .then((createdElement) => {
      res.status(201).json(createdElement);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error creating element" });
    });
});

// Connect to MongoDB
mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB successfully!");

    // Start the server
    app.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
