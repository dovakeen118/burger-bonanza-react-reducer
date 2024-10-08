import React, { useEffect, useState } from "react";

import getOrder from "../../apiClient/getOrder";

const OrderDetail = (props) => {
  const [order, setOrder] = useState({ burgers: [] });

  const findOrder = async () => {
    const id = props.match.params.id;
    const orderData = await getOrder(id);
    setOrder(orderData);
  };

  useEffect(() => {
    findOrder();
  }, []);

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
      <div className="callout primary" id="burger-list">
        {orderBurgers}
      </div>
    </div>
  );
};

export default OrderDetail;
