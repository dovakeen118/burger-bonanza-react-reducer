import React from "react";
import { Link } from "react-router-dom";

const OrderListTile = ({ id, name, createdAt }) => {
  return (
    <div className="callout">
      <Link to={`/orders/${id}`}>
        <h4>{name}</h4>
        <p>{new Date(createdAt).toDateString()}</p>
        <p>{new Date(createdAt).toLocaleTimeString()}</p>
      </Link>
    </div>
  );
};

export default OrderListTile;
