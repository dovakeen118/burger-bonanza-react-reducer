const Model = require("./Model")

class Order extends Model {
  static get tableName() {
    return "orders"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string" }
      }
    }
  }

  static get relationMappings() {
    const { Burger } = require("./index")
    return {
      burgers: {
        relation: Model.HasManyRelation,
        modelClass: Burger,
        join: {
          from: "orders.id",
          to: "burgers.orderId"
        }
      }
    }
  }
}

module.exports = Order