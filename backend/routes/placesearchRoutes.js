const express = require("express");
const placeSearchController = require("../controllers/placeSearchController");
const router = express.Router();

router.get("/places", placeSearchController.getTouristPlaces);

module.exports = router;
