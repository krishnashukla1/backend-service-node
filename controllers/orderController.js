const Order = require("../models/order.model");

exports.createOrder = async (req, res) => {
  const order = await Order.create(req.body);
  res.status(201).json(order);
};

exports.getOrders = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};
