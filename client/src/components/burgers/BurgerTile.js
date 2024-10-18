import React from "react";

const BurgerTile = (props) => {
  const toppings = typeof props.toppings === "string" ? props.toppings.split(", ") : props.toppings;
  const chosenToppings = toppings.map((topping) => {
    return <li key={topping}>{topping}</li>;
  });

  const orderBackground =
    props.status === "fulfilled" || !props.status ? "complete-order" : "incomplete-order";
  return (
    <div className={`grid-x grid-margin-x callout ${orderBackground}`}>
      <div className="cell small-6">
        <p>
          <span className="order-summary-header">Type:</span> {props.type}
        </p>
        <p>
          <span className="order-summary-header">Roll:</span>{" "}
          {props.isGlutenFree === "true" ? "gluten-free" : "Hawaiian"}
        </p>
        <p>
          <span className="order-summary-header">Side:</span> {props.side}
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
