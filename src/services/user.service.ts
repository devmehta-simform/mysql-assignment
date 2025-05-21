import { User } from '../models/user';
import { type RequestHandler } from 'express';
import { sequelize } from '../utils/sequelizeProvider';
import { Product } from '../models/product';
import { Order } from '../models/order';
import { col, FindOptions, fn } from 'sequelize';

export const getAllUsers: RequestHandler = async (req, res) => {
  const filter: FindOptions = { where: { deleted_at: null } };
  const filterBy = req.query['filter']?.toString();
  const sortBy = req.query['sortBy']?.toString();
  const limit = req.query['limit']?.toString();
  if (filterBy && sortBy) {
    switch (filterBy) {
      case 'active': {
        filter.attributes = [
          [col('Users.name'), 'name'],
          [fn('count', col('Orders.id')), 'numberOfOrders'],
        ];
        filter.include = [{ model: Order, attributes: [], where: { deleted_at: null } }];
        filter.group = ['Users.id'];
        if (sortBy === 'desc') filter.order = [[fn('COUNT', col('Orders.id')), 'desc']];
        if (sortBy === 'asc') filter.order = [[fn('COUNT', col('Orders.id')), 'asc']];
        filter.subQuery = false;
        break;
      }
      case 'inactive': {
        filter.attributes = [[col('Users.name'), 'name']];
        filter.include = [{ model: Order, attributes: [], where: { deleted_at: null }, required: false }];
        filter.where = { ...filter.where, '$Orders.id$': null };
        filter.group = ['Users.id'];
        filter.subQuery = false;
        break;
      }
    }
  }
  if (limit) {
    filter.limit = parseInt(limit);
  }
  const users = await User.findAll(filter);
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

export const getOrdersOfUser: RequestHandler = async (req, res) => {
  const userId = req.params['id'];
  const orders = await User.findAll({
    where: { deleted_at: null, id: userId },
    attributes: ['email', 'name', 'address'],
    include: [
      {
        model: Order,
        attributes: [
          'status',
          'id',
          'order_date',
          'expected_delivery_date',
          [
            sequelize.literal('case when Orders.status="pending" then DATEDIFF(Orders.expected_delivery_date,now()) else 0 end'),
            'days_left_before_delivery',
          ],
        ],
        where: { deleted_at: null },
        include: [
          {
            model: Product,
            attributes: ['id', 'name', 'description', 'price'],
            where: { deleted_at: null },
            through: {
              attributes: [],
            },
          },
        ],
      },
    ],
  });
  res.status(200).json(orders);
};
