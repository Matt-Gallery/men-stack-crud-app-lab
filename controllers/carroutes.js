import { Router } from "express";
import Car from "../models/car.js";

const carsRouter = Router();

carsRouter.get("/", (req, res) => {
  res.render("index");
});

// Get the create form
carsRouter.get("/cars/new", (req, res) => {
  res.render("cars/new");
});

carsRouter.post("/cars", async (req, res) => {
  try {
    let { make, model, year, color } = req.body;

    const newCar = new Car({
      make,
      model,
      year,
      color,
    });

    await newCar.save();

    res.redirect("/cars");
  } catch (error) {
    console.error("Error creating new car:", error);
    res.status(500).send("Internal Server Error");
  }
});

carsRouter.get("/cars", async (req, res) => {
  try {
    const cars = await Car.find();
    res.render("cars/cars", { cars });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

carsRouter.get("/cars/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).send("Car not found");
    }

    res.render("cars/show", { car });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

carsRouter.delete("/cars/:carId", async (req, res) => {
  await Car.findByIdAndDelete(req.params.carId);
  res.redirect("/cars");
});

carsRouter.get("/cars/:carId/edit", async (req, res) => {
  const foundCar = await Car.findById(req.params.carId);
  res.render("cars/edit", {
    car: foundCar,
  });
});

carsRouter.put("/cars/:carID", async (req, res) => {
  await Car.findByIdAndUpdate(req.params.carID, req.body);
  res.redirect(`/cars/${req.params.carID}`);
});

export default carsRouter;
