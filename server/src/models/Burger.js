const Model = require("./Model")

class Burger extends Model {
  static get tableName() {
    return "burgers"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["type", "isGlutenFree", "side"],
      properties: {
        type: { type: "string" },
        toppings: { type: "string" },
        isGlutenFree: { type: ["boolean", "string"] },
        side: { type: "string" }
      }
    }
  }

  static get relationMappings() {
    const { Order } = require("./index")
    return {
      order: {
        relation: Model.BelongsToOneRelation,
        modelClass: Order,
        join: {
          from: "burgers.orderId",
          to: "orders.id"
        }
      }
    }
  }
}

module.exports = Burger