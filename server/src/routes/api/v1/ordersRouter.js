import express from "express";
import { Order } from "../../../models/index.js";

const ordersRouter = new express.Router();

ordersRouter.get("/", async (req, res) => {
  try {
    const orders = await Order.query();
    return res.status(200).json({ orders });
  } catch (error) {
    console.error(`Error in GET /api/v1/orders: ${error.message}`);
    return res.status(500).json({ errors: error });
  }
});

ordersRouter.post("/", async (req, res) => {
  const order = req.body;

  try {
    // Create a new order
    const newOrder = await Order.query().insertAndFetch(order);
    console.log(newOrder);
    // Save the order to the database

    // Return a 201 status code
    return res.status(201).json({ order: newOrder });
  } catch (error) {
    console.error(`Error in POST /api/v1/orders: ${error.message}`);
    return res.status(500).json({ errors: error });
  }
});

export default ordersRouter;
