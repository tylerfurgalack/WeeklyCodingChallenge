/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable("orders", (table) => {
    table.increments("id").primary();
    table.string("burgers").notNullable();
    table.string("type").notNullable();
    table.json("toppings").notNullable();
    table.string("bun").notNullable();
    table.boolean("showSides").notNullable();
    table.string("side");
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("orders");
};
