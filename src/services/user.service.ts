import { User } from '../models/user';
import { type RequestHandler } from 'express';

export const getAllUsers: RequestHandler = async (req, res) => {
  const users = await User.findAll({ where: { deleted_at: null } });
  res.status(200).json({ users });
};

export const createUser: RequestHandler = async (req, res) => {
  const user = req.body;
  const createdUser = await User.create(user);
  res.status(201).json(createdUser);
};

export const getUserById: RequestHandler = async (req, res) => {
  const userId = req.params['id'];
  const user = await User.findOne({
    where: {
      id: userId,
      deleted_at: null,
    },
  });
  res.status(200).json(user);
};

export const updateUserById: RequestHandler = async (req, res) => {
  const userId = req.params['id'];
  await User.update(
    { ...req.body },
    {
      where: {
        id: userId,
        deleted_at: null,
      },
    }
  );
  res.status(204).json();
};

export const deleteUserById: RequestHandler = async (req, res) => {
  const userId = req.params['id'];
  await User.update({ deleted_at: new Date() }, { where: { id: userId } });
  res.status(204).json();
};
