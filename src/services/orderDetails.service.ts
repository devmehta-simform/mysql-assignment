import { type RequestHandler } from 'express';
import { OrderDetails } from '../models/orderDetails';

export const getAllOrderDetails: RequestHandler = async (req, res) => {
  const orderDetails = await OrderDetails.findAll({ where: { deleted_at: null } });
  res.status(200).json({ orderDetails });
};

export const createOrderDetails: RequestHandler = async (req, res) => {
  const orderDetails = req.body;
  const createdOrderDetails = await OrderDetails.create(orderDetails);
  res.status(201).json(createdOrderDetails);
};

export const getOrderDetailsById: RequestHandler = async (req, res) => {
  const orderDetailsId = req.params['id'];
  const orderDetails = await OrderDetails.findOne({
    where: {
      id: orderDetailsId,
      deleted_at: null,
    },
  });
  res.status(200).json(orderDetails);
};

export const updateOrderDetailsById: RequestHandler = async (req, res) => {
  const orderDetailsId = req.params['id'];
  await OrderDetails.update(
    { ...req.body },
    {
      where: {
        id: orderDetailsId,
        deleted_at: null,
      },
    }
  );
  res.status(204).json();
};

export const deleteOrderDetailsById: RequestHandler = async (req, res) => {
  const orderDetailsId = req.params['id'];
  await OrderDetails.update({ deleted_at: new Date() }, { where: { id: orderDetailsId } });
  res.status(204).json();
};
