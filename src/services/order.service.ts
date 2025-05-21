import { type RequestHandler } from 'express';
import { Order } from '../models/order';
import { FindOptions } from 'sequelize';

export const getAllOrders: RequestHandler = async (req, res) => {
  const filter: FindOptions = {
    where: {
      deleted_at: null,
    },
  };
  const status = req.query['status']?.toString();
  const sortBy = req.query['sortBy']?.toString();
  const limit = req.query['limit']?.toString();
  if (status) {
    console.log(typeof status, status);
    switch (status) {
      case 'undelivered': {
        console.log(status);
        filter.where = {
          ...filter.where,
          status: 'pending',
        };
        break;
      }
    }
  }
  if (sortBy) {
    switch (sortBy) {
      case 'recent': {
        filter.order = [['order_date', 'desc']];
        break;
      }
    }
  }
  if (limit) {
    filter.limit = parseInt(limit);
  }
  const orders = await Order.findAll(filter);
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
