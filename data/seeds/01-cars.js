// STRETCH
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("cars").truncate(); // reset primary keys
  await knex("cars").insert([
    {
      vin: "VIN23A3X333885651",
      make: "Honda",
      model: "Accord",
      mileage: 77000,
      title: "clean",
      transmission: "automatic",
    },
    {
      vin: "VIN23A3X35565D652",
      make: "Nissan",
      model: "Altima",
      mileage: 14000,
      title: "clean",
      transmission: "automatic",
    },
    {
      vin: "VIN23A3X333885653",
      make: "Hyundai",
      model: "XG350",
      mileage: 16000,
      title: "clean",
      transmission: "automatic",
    },
    {
      vin: "VIN23A3X333885654",
      make: "Hyundai",
      model: "Verna",
      mileage: 22000,
      title: "salvage",
      transmission: "automatic",
    },
  ]);
};
