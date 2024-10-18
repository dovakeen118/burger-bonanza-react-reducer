import React from "react";

const BurgerTile = ({ type, toppings, isGlutenFree, side, status }) => {
  const burgerToppings = typeof toppings === "string" ? toppings.split(", ") : toppings;
  const chosenToppings = burgerToppings.map((topping) => {
    return <li key={topping}>{topping}</li>;
  });

  const orderBackground = status === "fulfilled" || !status ? "complete-order" : "incomplete-order";
  return (
    <div className={`grid-x grid-margin-x callout ${orderBackground}`}>
      <div className="cell small-6">
        <p>
          <span className="order-summary-header">Type:</span> {type}
        </p>
        <p>
          <span className="order-summary-header">Roll:</span>{" "}
          {isGlutenFree === "true" || isGlutenFree === true ? "gluten-free" : "Hawaiian"}
        </p>
        <p>
          <span className="order-summary-header">Side:</span> {side}
        </p>
      </div>
      {chosenToppings.length > 0 ? (
        <div className="cell small-6">
          <p className="order-summary-header">Toppings:</p>
          <ul>{chosenToppings}</ul>
        </div>
      ) : null}
    </div>
  );
};

export default BurgerTile;
