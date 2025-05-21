import express from 'express';
import { createUser, deleteUserById, getAllUsers, getUserById, updateUserById, getOrdersOfUser } from '../services/user.service';

const userRouter = express.Router();

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUserById).patch(updateUserById).delete(deleteUserById);
userRouter.route('/:id/orders').get(getOrdersOfUser);

export { userRouter };
