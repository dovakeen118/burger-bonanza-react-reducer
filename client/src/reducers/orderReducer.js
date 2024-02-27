const orderReducer = (order, action) => {
  switch (action.type) {
    case "addBurger": {
      return {
        ...order,
        burgers: [...order.burgers, action.newBurger]
      }
    }
    case "addName": {
      return {
        ...order,
        name: action.name
      }
    }
    case "resetOrder": {
      return {
        ...action.initialOrder
      }
    }
    default: {
      throw Error("Unknown action: " + action.type)
    }
  }
}

export default orderReducer