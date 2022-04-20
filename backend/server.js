require("dotenv").config({ path: "./config.env" });
const express = require("express");
const cors = require("cors");
const placesearchRoutes = require("./routes/placesearchRoutes");

// express app
const app = express();
const port = process.env.PORT;

// middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/", placesearchRoutes);

//start express server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
