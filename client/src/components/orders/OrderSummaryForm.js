import React from "react";

import BurgerTile from "../burgers/BurgerTile";

const OrderSummaryForm = (props) => {
  const summary = props.order.burgers.map((burger, index) => {
    return <BurgerTile key={index} {...burger} />;
  });

  const submitOrder = (event) => {
    event.preventDefault();
    props.submitBurgerOrder(props.order);
  };

  return (
    <div className="cell medium-6 callout">
      <h3 className="text-center">
        {props.order.name ? `Order summary for ${props.order.name}` : "Order summary"}
      </h3>
      {props.order.burgers.length > 0 ? (
        <form onSubmit={submitOrder}>
          <div className="callout order-summary-list">{summary}</div>

          <div className="button-group align-center">
            <input type="submit" value="Submit order" className="button button-submit" />
          </div>
        </form>
      ) : (
        <h5 className="text-center">Build your burger to place an order</h5>
      )}
    </div>
  );
};

export default OrderSummaryForm;
