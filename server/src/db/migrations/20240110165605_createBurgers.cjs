/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("burgers", (table) => {
    table.bigIncrements("id");
    table.string("type").notNullable();
    table.string("toppings");
    table.boolean("isGlutenFree").notNullable().defaultTo(false);
    table.string("side").notNullable();
    table
      .bigInteger("orderId")
      .notNullable()
      .unsigned()
      .index()
      .references("orders.id")
      .onDelete("CASCADE");
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("burgers");
};
