const express = require("express");
const app = express();

const userContext = require("./../middlwares/userContext.middlware");
// const authMiddlware = require("./../middlwares/auth.middlware");
const carService = require('../services/car.service');

app.get("/carData", userContext, function (req, res) {
  try {
    const filter = {
      carType: req.query.carType,
      color: req.query.color,
      year: req.query.year,
     
    };

    let cars = carService.getFilteredCars(filter); //2
    return res.status(200).json({ cars: cars });
  } catch (error) {
    return res.status(500).json({ msg: "internal server error" });
  }
});

module.exports = app;
