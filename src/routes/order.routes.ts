import express from 'express';
import { createOrder, deleteOrderById, getAllOrders, getOrderById, updateOrderById } from '../services/order.service';

const orderRouter = express.Router();

orderRouter.route('/').get(getAllOrders).post(createOrder);
orderRouter.route('/:id').get(getOrderById).patch(updateOrderById).delete(deleteOrderById);

export { orderRouter };
