import React, { useEffect, useState } from "react";

import BurgerTile from "../burgers/BurgerTile";

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

  const orderListBackground =
    order.status === "fulfilled" ? "complete-order-list" : "incomplete-order-list";

  const orderBurgers = order.burgers.map((burger) => {
    return <BurgerTile key={burger.id} {...burger} status={order.status} />;
  });

  return (
    <div className="grid-container">
      <h1 className="text-center">
        Order #{order.id} for {order.name}
      </h1>
      <div className="callout">
        {order.status === "fulfilled" ? (
          <h4 className="callout success">Fulfilled</h4>
        ) : (
          <div className="grid-x grid-margin-x">
            <p className="cell small-10">
              <strong>Currently pending ... </strong>
              {timeDiff.days ? `${timeDiff.days} days,` : null}{" "}
              {timeDiff.hours ? `${timeDiff.hours} hours,` : null}{" "}
              {timeDiff.mins ? `${timeDiff.mins} minutes,` : null}{" "}
              {timeDiff.secs ? `${timeDiff.secs} seconds ago` : null}
            </p>
            <button
              type="button"
              className="button button-submit cell small-2"
              id="complete-button"
              onClick={handleCompleteOrder}
            >
              Complete order
            </button>
          </div>
        )}

        <div className={`callout ${orderListBackground}`} id="burger-list">
          {orderBurgers}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
