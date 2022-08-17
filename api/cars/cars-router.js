// Imports==========
const express = require("express");

const router = express.Router();
//importing model
const { getAll, create } = require("./cars-model");
//importing middlewares
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require("./cars-middleware");

// router methods=======

router.get("/", async (req, res, next) => {
  try {
    const allCars = await getAll();
    res.json(allCars);
  } catch (err) {
    next(err);
  }
});
router.get("/:id", checkCarId, (req, res) => {
  res.json(req.car);
});

router.post(
  "/",
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  (req, res, next) => {
    create(req.body)
      .then((car) => {
        res.status(201).json(car);
      })
      .catch(next);
  }
);

// router.delete("/", (req, res, next) => {});

// eslint-disable-next-line
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: "server error",
    message: err.message,
  });
});

module.exports = router;
