const express = require("express");
const router = express.Router();
const { Rental } = require("../models/rentalModel");

router.post("/", async (req, res) => {
  if (!req.body.customerId)
    return res.status(400).send("CustomerId is required");
  if (!req.body.movieId) return res.status(400).send("movieId is required");

  const rental = await Rental.findOne({
    "customer._id": req.body.customerId,
    "movie._id": req.body.movieId
  });

  if (!rental) return res.status(404).send("Rental not found");

  res.status(401).send("unauthorized");
});

module.exports = router;
