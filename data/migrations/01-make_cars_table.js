/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("dealer", (tbl) => {
    tbl.increments();
    tbl.text("vin", 17).notNullable().unique();
    tbl.text("make", 100).notNullable();
    tbl.text("model", 100).notNullable();
    tbl.integer("mileage", 100).notNullable();
    tbl.text("title", 100);
    tbl.text("transmission", 100);
  });
};

exports.down = function (knex) {
  knex.schema.dropTableIfExists("dealer");
};
