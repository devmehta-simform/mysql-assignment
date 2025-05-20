import { type RequestHandler } from 'express';
import { Order } from '../models/order';

export const getAllOrders: RequestHandler = async (req, res) => {
  const orders = await Order.findAll({ where: { deleted_at: null } });
  res.status(200).json({ orders });
};

export const createOrder: RequestHandler = async (req, res) => {
  const order = req.body;
  const createdOrder = await Order.create(order);
  res.status(201).json(createdOrder);
};

export const getOrderById: RequestHandler = async (req, res) => {
  const orderId = req.params['id'];
  const order = await Order.findOne({
    where: {
      id: orderId,
      deleted_at: null,
    },
  });
  res.status(200).json(order);
};

export const updateOrderById: RequestHandler = async (req, res) => {
  const orderId = req.params['id'];
  await Order.update(
    { ...req.body },
    {
      where: {
        id: orderId,
        deleted_at: null,
      },
    }
  );
  res.status(204).json();
};

export const deleteOrderById: RequestHandler = async (req, res) => {
  const orderId = req.params['id'];
  await Order.update({ deleted_at: new Date() }, { where: { id: orderId } });
  res.status(204).json();
};
