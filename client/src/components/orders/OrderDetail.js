import React, { useEffect, useState } from "react";

import getOrder from "../../apiClient/getOrder";
import patchOrder from "../../apiClient/patchOrder";

import calculateDateTimeBetween from "../../services/calculateDateTimeBetween";

const OrderDetail = (props) => {
  const orderId = props.match.params.id;
  const [order, setOrder] = useState({ burgers: [] });
  const [timeDiff, setTimeDiff] = useState({});

  const findOrder = async () => {
    const orderData = await getOrder(orderId);
    setOrder(orderData);
  };

  useEffect(() => {
    findOrder();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeDiff(calculateDateTimeBetween(order.createdAt));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [order.createdAt]);

  const handleCompleteOrder = async () => {
    const updatedOrder = await patchOrder({ orderId, data: { status: "fulfilled" } });
    setOrder(updatedOrder);
  };

  const completeButton = (
    <button type="button" className="button" id="complete-button" onClick={handleCompleteOrder}>
      Complete Order
    </button>
  );

  const orderListBackground =
    order.status === "fulfilled" ? "complete-order-list" : "incomplete-order-list";
  const orderBackground = order.status === "fulfilled" ? "complete-order" : "incomplete-order";

  const orderBurgers = order.burgers.map((burger) => {
    return (
      <div className={`callout ${orderBackground}`} key={burger.id}>
        <p>
          <strong>Type:</strong> {burger.type}
        </p>
        <p>
          <strong>Roll:</strong> {burger.isGlutenFree ? "gluten-free" : "Hawaiian"}
        </p>
        <p>
          <strong>Toppings:</strong> {burger.toppings}
        </p>
        <p>
          <strong>Side:</strong> {burger.side}
        </p>
      </div>
    );
  });

  return (
    <div className="grid-container">
      <h1 className="text-center">
        Order #{order.id} for {order.name}
      </h1>
      <div className="grid-x grid-x-margin">
        {order.status === "fulfilled" ? (
          <h4 className="callout success">Fulfilled</h4>
        ) : (
          <>
            <p className="cell">
              <strong>Currently pending...</strong>
              {timeDiff.days ? `${timeDiff.days} days,` : null}{" "}
              {timeDiff.hours ? `${timeDiff.hours} hours,` : null}{" "}
              {timeDiff.mins ? `${timeDiff.mins} minutes,` : null}{" "}
              {timeDiff.secs ? `${timeDiff.secs} seconds ago` : null}
            </p>
            {completeButton}
          </>
        )}
      </div>

      <div className={`callout ${orderListBackground}`} id="burger-list">
        {orderBurgers}
      </div>
    </div>
  );
};

export default OrderDetail;
