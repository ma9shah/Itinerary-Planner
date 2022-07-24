require("dotenv").config({ path: "./config.env" });
const express = require("express");
const cors = require("cors");
const placesearchRoutes = require("./routes/placesearchRoutes");
const morgan = require('morgan')
const mongoose = require('mongoose')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Routes = require('./models/savedRoutes')
// const ics = require('ics/dist');
const generateCalendarController = require('./controllers/generateCalendar')

// const { events } = require("./models/user");

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
app.use(morgan('dev'))

//DB Connection
const mongoAtlasUri = "mongodb+srv://ma9shah:{process.env.MONGOPASSWORD}@cluster0.nb97p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
try {
  mongoose.connect(
    mongoAtlasUri,
    // { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("---Mongoose is connected---"),
  );
} catch (e) {
  console.log("Mongoose is failing");
}

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));




//Routes
app.use("/", placesearchRoutes);
app.post('/retrieveTrips', async (req, res) => {
  // const email = req.body.email
  const email = req.body.email
  console.log(email, "successfully retrieved")
  let user_trips = await Routes.findOne({ email: email })
  if (user_trips) {
    res.send(user_trips)
  }
  else {
    res.send({ message: "No trips", user_trips: {} })
  }
})
app.post('/saveTrip', async (req, res) => {
  try {
    let { email, startDate, endDate, routes, placeName } = req.body
    let user_trips = await Routes.findOne({ email: email })
    if (user_trips) {
      user_trips.trips.push({ placeName, startDate, endDate, routes })
      user_trips.save()
      // and send this change/update to mongo?
      res.send(user_trips)
    }
    else {
      user_trips = await Routes.create({
        email: email,
        trips: [{ placeName, startDate, endDate, routes }]
      })
      res.send(user_trips)
    }
  } catch (err) {
    console.log("Error from /saveTrip", err)
  }
})

app.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      token = jwt.sign({ email: user.email }, 'jwtsecretkeytemperory')
      isValidUser = await bcrypt.compare(req.body.password, user.password)
      if (isValidUser) {
        res.send({ validated: true, userFound: true, token: token })
      }
      else {
        res.send({ validated: false, userFound: true, token: token })
      }
    } else {
      res.send({ validated: false, userFound: false })
    }

    // res.json({ user, status: 'ok', existError:false })
  }
  catch (err) {
    console.log("Error in logging in", err)
    res.json({ status: 'not ok' })
  }
})

app.post('/register', async (req, res, next) => {
  try {
    const userExists = await User.findOne({ email: req.body.email })
    if (userExists) {
      res.json({ existError: true })
      return
    }
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10)
    })
    token = jwt.sign({ email: user.email }, 'jwtsecretkeytemperory')
    res.json({ user, status: 'ok', existError: false, token: token })
  }
  catch (err) {
    console.log("Error in registeration", err)
    res.json({ status: 'not ok' })
  }

})

// an "icsFiles" folder might be needed in the backend folder (ignored for git)
app.post('/generateCalendar', generateCalendarController)


// Preferences!
app.get('/retrievePrefs/:emailid', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.emailid })
    if (user) {
      if (user.prev!==false){
        res.send({prev: user.prev})
      }
      else{
        res.send({prev: false})
      }
    }
    else{
      res.send({user:0})
    }
}
catch (err){
  console.log(err)
}
})

  app.post('/updatePrefs', async (req, res) => {
    let { email, newPrefs } = req.body
    console.log(newPrefs, email)
    let user = await User.findOne({ email: email })
    if (user) {
      user.prev = newPrefs
      user.save()
      res.send({prev: newPrefs})
    }
    else{
      console.log("USER NOT FOUND!")
    }
  })

//start express server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
}); 
