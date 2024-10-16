/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table("orders", (table) => {
    table.datetime("fulfilledAt");
  });
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.table("orders", (table) => {
    table.dropColumn("fulfilledAt");
  });
};
