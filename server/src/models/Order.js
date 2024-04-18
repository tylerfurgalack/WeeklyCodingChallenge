const e = require("express");
const Model = require("./Model");

class Order extends Model {
  static get tableName() {
    return "orders";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["burgers"],
      properties: {
        burgers: { type: "string" },
        type: { type: "string" },
        toppings: { type: "array" },
        bun: { type: "string" },
        side: { type: "string" },
      },
    };
  }
}

module.exports = Order;
