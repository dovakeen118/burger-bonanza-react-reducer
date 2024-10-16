/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.table("orders", (table) => {
    table.enum("status", ["pending", "processing", "fulfilled"]).notNullable().defaultTo("pending");
  });
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.table("orders", (table) => {
    table.dropColumn("status");
  });
};
