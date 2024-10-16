import React, { useReducer } from "react";
import { Link } from "react-router-dom";

import postBurgerOrder from "../../apiClient/postBurgerOrder";
import confirmationReducer from "../../reducers/confirmationReducer";
import orderReducer from "../../reducers/orderReducer";

import BurgerForm from "./BurgerForm";
import BurgerOrderSummaryForm from "../orders/OrderSummaryForm";

const BurgerOrder = () => {
  const initialOrder = {
    name: "",
    burgers: [],
  };
  const [order, orderDispatch] = useReducer(orderReducer, initialOrder);
  const [orderConfirmation, confirmationDispatch] = useReducer(confirmationReducer, null);

  const addNameToOrder = (orderName) => {
    orderDispatch({
      type: "addName",
      name: orderName,
    });
  };

  const addBurgerToOrder = (newBurger) => {
    orderDispatch({
      type: "addBurger",
      newBurger: newBurger,
    });
  };

  const submitBurgerOrder = async (burgerOrder) => {
    const returnedBurger = await postBurgerOrder(burgerOrder);
    if (returnedBurger.order) {
      confirmationDispatch({ type: "orderConfirmed", confirmationNumber: returnedBurger.order.id });
      orderDispatch({
        type: "resetOrder",
        initialOrder,
      });
    }
  };

  return (
    <div className="grid-container">
      <h1 className="text-center">Place your order</h1>
      {orderConfirmation ? (
        <h5 className="callout success">
          Your order has been placed!{" "}
          <Link to={`/orders/${orderConfirmation.confirmationNumber}`}>View here</Link>
        </h5>
      ) : null}
      <div className="grid-x grid-margin-x">
        <BurgerForm
          addBurgerToOrder={addBurgerToOrder}
          addNameToOrder={addNameToOrder}
          orderName={order.name}
        />
        <BurgerOrderSummaryForm order={order} submitBurgerOrder={submitBurgerOrder} />
      </div>
    </div>
  );
};

export default BurgerOrder;
