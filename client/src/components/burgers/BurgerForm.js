import React, { useReducer } from "react";

import burgerReducer from "../../reducers/burgerReducer";
import burgerErrorReducer from "../../reducers/burgerErrorReducer";
import validateOrderData from "../../services/validateOrderData";

import OptionCollection from "./OptionCollection";
import FormError from "../layout/FormError";

const BurgerForm = (props) => {
  const initialBurger = {
    type: "",
    toppings: [],
    isGlutenFree: "",
    side: "",
  };
  const [burger, burgerDispatch] = useReducer(burgerReducer, initialBurger);
  const [burgerErrors, burgerErrorDispatch] = useReducer(burgerErrorReducer, {});

  const handleNameChange = (event) => {
    props.addNameToOrder(event.currentTarget.value);
  };

  const handleChange = (event) => {
    burgerDispatch({
      type: "burgerChange",
      name: event.currentTarget.name,
      value: event.currentTarget.value,
    });
  };

  const handleCheckChange = (event) => {
    burgerDispatch({
      type: "burgerCheckboxChange",
      value: event.currentTarget.value,
    });
  };

  const clearForm = () => {
    burgerErrorDispatch({
      type: "resetErrors",
      errors: {},
    });
    burgerDispatch({
      type: "resetBurgerForm",
      initialBurger: initialBurger,
    });
  };

  const addBurger = () => {
    burgerErrorDispatch({
      type: "resetErrors",
      errors: {},
    });

    const validationErrors = validateOrderData(burger, props.orderName);
    if (Object.keys(validationErrors).length > 0) {
      burgerErrorDispatch({
        type: "validationError",
        errors: validationErrors,
      });
    } else {
      props.addBurgerToOrder(burger);
      clearForm();
    }
  };

  const burgerTypes = ["", "medium rare", "medium", "medium well", "well done", "chicken", "vegan"];
  const sides = ["", "fries", "potatoes", "salad", "veggies"];

  const toppings = ["cheese", "pickles", "onions", "lettuce"];
  const toppingOptions = toppings.map((topping) => {
    return (
      <label key={topping} htmlFor={topping}>
        <input
          id={topping}
          type="checkbox"
          value={topping}
          checked={burger.toppings.includes(topping)}
          onChange={handleCheckChange}
        />
        {topping}
      </label>
    );
  });

  return (
    <div className="cell medium-6 callout burger-form-container">
      <h3 className="burger-form-title">Build your burger</h3>
      <form className="callout burger-form">
        <label htmlFor="name">
          Your name
          <FormError error={burgerErrors.name} name="name" />
          <input
            type="text"
            id="name"
            name="name"
            value={props.orderName}
            onChange={handleNameChange}
          />
        </label>

        <label htmlFor="type">
          Type of Burger
          <FormError error={burgerErrors.type} name="type" />
          <select id="type" name="type" value={burger.type} onChange={handleChange}>
            <OptionCollection options={burgerTypes} />
          </select>
        </label>

        <div className="grid-x grid-margin-x">
          <div className="cell small-6">
            <label>
              Toppings
              {toppingOptions}
            </label>
          </div>

          <div className="cell small-6">
            <label>Type of Roll</label>
            <FormError error={burgerErrors.isGlutenFree} name="isGlutenFree" />
            <label htmlFor="hawaiian">
              <input
                type="radio"
                id="hawaiian"
                name="isGlutenFree"
                value="false"
                checked={burger.isGlutenFree === "false"}
                onChange={handleChange}
              />
              Hawaiian Roll
            </label>
            <label htmlFor="gluten-free">
              <input
                type="radio"
                id="gluten-free"
                name="isGlutenFree"
                value="true"
                checked={burger.isGlutenFree === "true"}
                onChange={handleChange}
              />
              Gluten-Free Roll
            </label>
          </div>
        </div>

        <label htmlFor="side">
          Side
          <FormError error={burgerErrors.side} name="side" />
          <select id="side" name="side" value={burger.side} onChange={handleChange}>
            <OptionCollection options={sides} />
          </select>
        </label>

        <div className="button-group-center">
          <button type="button" onClick={addBurger} className="button">
            Add burger
          </button>
          <button type="button" onClick={clearForm} className="button button-secondary">
            Reset burger
          </button>
        </div>
      </form>
    </div>
  );
};

export default BurgerForm;
