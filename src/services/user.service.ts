import { User } from '../models/user';
import { type RequestHandler } from 'express';

export const getAllUsers: RequestHandler = async (req, res) => {
  const users = await User.findAll();
  res.status(200).json({ users });
};
