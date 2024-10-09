import React, { useEffect, useState } from "react";

import getOrder from "../../apiClient/getOrder";
import patchOrder from "../../apiClient/patchOrder";

const OrderDetail = (props) => {
  const orderId = props.match.params.id;
  const [order, setOrder] = useState({ burgers: [] });

  const findOrder = async () => {
    const orderData = await getOrder(orderId);
    setOrder(orderData);
  };

  useEffect(() => {
    findOrder();
  }, []);

  const handleCompleteOrder = async () => {
    const updatedOrder = await patchOrder({ orderId, data: { isFulfilled: true } });
    setOrder(updatedOrder);
  };

  const completeButton = (
    <button type="button" className="button" id="complete-button" onClick={handleCompleteOrder}>
      Complete Order
    </button>
  );

  const calloutBackground = order.isFulfilled ? "primary" : "alert";

  const orderBurgers = order.burgers.map((burger) => {
    return (
      <div className="callout" key={burger.id}>
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
      <h1 className="text-center">Order for {order.name}</h1>
      {order.isFulfilled ? <h4>Complete</h4> : completeButton}

      <div className={`callout ${calloutBackground}`} id="burger-list">
        {orderBurgers}
      </div>
    </div>
  );
};

export default OrderDetail;
