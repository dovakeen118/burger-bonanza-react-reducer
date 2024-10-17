import React, { useEffect, useState } from "react";

import getOrders from "../../apiClient/getOrders";

import OrderListCompleteTile from "./OrderListCompleteTile";
import OrderListIncompleteTile from "./OrderListIncompleteTile";

const OrderList = () => {
  const [orders, setOrders] = useState({ complete: [], incomplete: [] });

  const getAllOrders = async () => {
    const orderData = await getOrders();
    setOrders({
      complete: orderData.completeOrders,
      incomplete: orderData.incompleteOrders,
    });
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const completeOrderList = orders.complete.map((order) => {
    return <OrderListCompleteTile key={order.id} {...order} />;
  });

  const incompleteOrderList = orders.incomplete.map((order) => {
    return <OrderListIncompleteTile key={order.id} {...order} />;
  });

  return (
    <div className="grid-container">
      <h1 className="text-center">
        <span className="menu-title">burgerBONANZA</span> orders
      </h1>

      <div className="grid-x grid-margin-x">
        <div className="cell medium-6 callout">
          <h3 className="text-center">Incomplete ({orders.incomplete.length})</h3>
          <div className="callout incomplete-order-list" id="incomplete-order-list">
            {incompleteOrderList}
          </div>
        </div>

        <div className="cell medium-6 callout">
          <h3 className="text-center">Complete ({orders.complete.length})</h3>
          <div className="callout complete-order-list" id="complete-order-list">
            {completeOrderList}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
