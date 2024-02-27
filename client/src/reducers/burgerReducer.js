const burgerReducer = (burger, action) => {
  switch (action.type) {
    case "burgerChange": {
      return {
        ...burger,
        [action.name]: action.value
      }
    }
    case "burgerCheckboxChange": {
      const toppingChoice = action.value
      if (burger.toppings.includes(toppingChoice)) {
        const filteredToppings = burger.toppings.filter((topping) => topping !== toppingChoice)
        return {
          ...burger,
          toppings: filteredToppings
        }
      } else {
        return {
          ...burger,
          toppings: [...burger.toppings, toppingChoice]
        }
      }
    }
    case "resetBurgerForm": {
      return {
        ...action.initialBurger
      }
    }
    default: {
      throw Error("Unknown action: " + action.type)
    }
  }
}

export default burgerReducer