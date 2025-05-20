import express from 'express';
import {
  createOrderDetails,
  deleteOrderDetailsById,
  getAllOrderDetails,
  getOrderDetailsById,
  updateOrderDetailsById,
} from '../services/orderDetails.service';

const orderDetailsRouter = express.Router();

orderDetailsRouter.route('/').get(getAllOrderDetails).post(createOrderDetails);
orderDetailsRouter.route('/:id').get(getOrderDetailsById).patch(updateOrderDetailsById).delete(deleteOrderDetailsById);

export { orderDetailsRouter };
