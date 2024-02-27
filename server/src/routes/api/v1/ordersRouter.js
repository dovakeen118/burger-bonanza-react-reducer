import express from "express";
import { ValidationError } from "objection";

import { Order } from "../../../models/index.js";
import cleanUserInput from "../../../services/cleanUserInput.js";

const ordersRouter = new express.Router();

ordersRouter.post("/", async (req, res) => {
  const name = req.body.order.name;
  const cleanedOrderName = cleanUserInput({ name });
  const burgers = req.body.order.burgers;
  try {
    const createdOrder = await Order.transaction(async (trx) => {
      const order = await Order.query(trx).insertAndFetch(cleanedOrderName);
      for (const burger of burgers) {
        const cleanedBurger = cleanUserInput({
          type: burger.type,
          isGlutenFree: burger.isGlutenFree,
          side: burger.side,
        });
        await order
          .$relatedQuery("burgers", trx)
          .insert({ ...cleanedBurger, toppings: burger.toppings.join(", ") });
      }
      return order;
    });
    createdOrder.burgers = await createdOrder.$relatedQuery("burgers");
    return res.status(201).json({ order: createdOrder });
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(422).json({ errors: err.data });
    }
    return res.status(500).json({ errors: err });
  }
});

export default ordersRouter;
