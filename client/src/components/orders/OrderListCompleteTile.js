import React from "react";
import { Link } from "react-router-dom";

import calculateDateTimeBetween from "../../services/calculateDateTimeBetween";

const OrderListCompleteTile = ({ id, name, createdAt, fulfilledAt }) => {
  const timeDiff = createdAt && fulfilledAt ? calculateDateTimeBetween(createdAt, fulfilledAt) : {};

  return (
    <div className="callout">
      <Link to={`/orders/${id}`}>
        <h4>
          Order #{id} for {name}
        </h4>
        <div className="grid-x grid-margin-x">
          <div className="cell small-6">
            <p>
              Order placed <em>{new Date(createdAt).toDateString()}</em>
            </p>
          </div>
          <div className="cell small-6">
            <p>Fulfillment time:</p>
            <p>
              {timeDiff.days ? `${timeDiff.days} days,` : null}{" "}
              {timeDiff.hours ? `${timeDiff.hours} hours,` : null}{" "}
              {timeDiff.mins ? `${timeDiff.mins} minutes,` : null} {timeDiff.secs} seconds
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default OrderListCompleteTile;
