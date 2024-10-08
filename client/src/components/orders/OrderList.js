import React, { useEffect, useState } from "react";

import getOrders from "../../apiClient/getOrders";

import OrderListTile from "./OrderListTile";

const OrderList = (props) => {
  const [orders, setOrders] = useState([]);

  const getAllOrders = async () => {
    const orderData = await getOrders();
    setOrders(orderData);
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const orderList = orders.map((order) => {
    return <OrderListTile key={order.id} {...order} />;
  });

  return (
    <div className="grid-container">
      <h1 className="text-center">Orders</h1>

      <div className="callout primary" id="order-list">
        {orderList}
      </div>
    </div>
  );
};

export default OrderList;
