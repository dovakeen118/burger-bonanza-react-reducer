import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import calculateDateTimeBetween from "../../services/calculateDateTimeBetween";

const OrderListIncompleteTile = ({ id, name, createdAt }) => {
  const [timeDiff, setTimeDiff] = useState(calculateDateTimeBetween(createdAt));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeDiff(calculateDateTimeBetween(createdAt));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [createdAt]);

  return (
    <div className="callout">
      <Link to={`/orders/${id}`}>
        <h4>
          Order #{id} for {name}
        </h4>
        <div className="grid-x grid-margin-x">
          <p className="cell small-6">
            Order placed <em>{new Date(createdAt).toDateString()}</em>
          </p>
          <p className="cell small-6">
            <strong>Currently pending...</strong>
          </p>
          <p className="cell">
            {timeDiff.days ? `${timeDiff.days} days,` : null}{" "}
            {timeDiff.hours ? `${timeDiff.hours} hours,` : null}{" "}
            {timeDiff.mins ? `${timeDiff.mins} minutes,` : null} {timeDiff.secs} seconds ago
          </p>
        </div>
      </Link>
    </div>
  );
};

export default OrderListIncompleteTile;
