const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Tasks = require("./routes/Tasks");


const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:false}));

app.use("/api/Task", Tasks);

app.get("/", (req, res) => {
  res.send("Welcome Hashone Digital...");
});


const uri = process.env.DB_URI;
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}...`);
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));
