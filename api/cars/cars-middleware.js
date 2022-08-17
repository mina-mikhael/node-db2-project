// imports ==========
//import model
const { getAll, getById } = require("./cars-model");
//import vin validator
const vinValidator = require("vin-validator");

//middlewares ========
const checkCarId = (req, res, next) => {
  getById(req.params.id)
    .then((car) => {
      if (!car) {
        res.status(404).json({
          message: "car not found",
        });
      } else {
        req.car = car;
        next();
      }
    })
    .catch((err) => {
      res.status(err.status || 500).json({
        error: `problem finding car with id: ${req.params.id}`,
        message: err.message,
      });
    });
};

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body;
  if (!vin)
    return next({
      status: 400,
      message: "vin is missing",
    });
  if (!make)
    return next({
      status: 400,
      message: "make is missing",
    });
  if (!model)
    return next({
      status: 400,
      message: "model is missing",
    });
  if (!mileage)
    return next({
      status: 400,
      message: "mileage is missing",
    });
  next();
};

const checkVinNumberValid = async (req, res, next) => {
  const { vin } = await req.body;
  const isValidVin = await vinValidator.validate(vin);
  if (!isValidVin) {
    res.status(400).json({ message: `vin ${vin} is invalid` });
    return;
  }
  next();
};

const checkVinNumberUnique = (req, res, next) => {
  const { vin } = req.body;
  getAll().then((cars) => {
    if (cars.find((car) => car.vin === vin)) {
      res.status(400).json({
        message: `vin ${vin} already exists`,
      });
      return;
    }
    next();
  });
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
