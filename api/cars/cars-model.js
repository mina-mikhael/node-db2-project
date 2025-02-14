const db = require("../../data/db-config");

const getAll = () => {
  return db("cars");
};

const getById = (id) => {
  return db("cars").where("id", id).first();
};

const create = async (car) => {
  const newCarId = await db("cars").insert(car);
  return getById(newCarId);
};

module.exports = {
  getAll,
  getById,
  create,
};
