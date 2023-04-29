// set up a basic Express.js server. 
// add cors middleware
// import mongoose library
// set up connection to MongoDB database
// create POST endpoint to handle user session creation
// create GET endpoint to handle user session retrieval

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserSession = require("./userSession");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb+srv://dmytrochupryna:uQLnkY84mCsVwwd5@kp.u17s6dm.mongodb.net/work-timer", 
    { useNewUrlParser: true, 
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Connected to MongoDB successfully");
    })

    


app.post("/api/userSessions", async (req, res) => {
    const userSessionData = req.body;
    console.log("Incoming user session data:", userSessionData);

    const newUserSession = new UserSession(userSessionData);
    await newUserSession.save();
    res.status(201).json(newUserSession);
  });

app.get("/api/userSessions", async (req, res) => {
  const userSessions = await UserSession.find();
  res.status(200).json(userSessions);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});