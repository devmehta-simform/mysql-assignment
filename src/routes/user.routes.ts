import express from 'express';
import { getAllUsers } from '../services/user.service';

const userRouter = express.Router();

userRouter.route('/').get(getAllUsers);

export { userRouter };
