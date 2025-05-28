import { type RequestHandler } from 'express';
import { Order } from '../models/order';
import { col, FindOptions, fn } from 'sequelize';
import { Product } from '../models/product';

export const getAllOrders: RequestHandler = async (req, res) => {
  /*  
  #swagger.parameters['filter'] = {
    in: 'query',
    schema: {
        '@enum': ['recent', 'price']
    }
  }
  #swagger.parameters['status'] = {
    in: 'query',
    schema: {
        '@enum': ['undelivered']
    }
  }
  #swagger.parameters['$ref'] = ['#/components/parameters/sortByQueryParam','#components/parameters/limitQueryParam']
  #swagger.description = 'get all orders with filtering by status, recent date, total price, and limit'
  */
  const filter: FindOptions = {
    where: {
      deleted_at: null,
    },
  };
  const status = req.query['status']?.toString();
  const filterBy = req.query['filter']?.toString();
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

  if (filterBy && sortBy) {
    switch (filterBy) {
      case 'recent': {
        if (sortBy === 'desc') filter.order = [['order_date', 'desc']];
        else if (sortBy === 'asc') filter.order = [['order_date', 'asc']];
        break;
      }
      case 'price': {
        filter.include = [
          {
            model: Product,
            attributes: [],
            where: { deleted_at: null },
            through: { attributes: [], where: { deleted_at: null } },
          },
        ];
        filter.attributes = [
          [col('Orders.id'), 'id'],
          [fn('sum', col('Products.price')), 'price'],
        ];
        filter.group = ['Orders.id'];
        filter.subQuery = false;
        if (sortBy === 'desc') filter.order = [[fn('sum', col('Products.price')), 'desc']];
        else if (sortBy === 'asc') filter.order = [[fn('sum', col('Products.price')), 'asc']];
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
  /*  #swagger.requestBody = {
            required: true,
            content: { 
              "application/json": {
                schema: { $ref: "#/components/schemas/OrderCreateDto" }
              }
            }
    }  */
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
  /*  #swagger.requestBody = {
            required: true,
            content: { 
              "application/json": {
                schema: { $ref: "#/components/schemas/OrderUpdateDto" }
              }
            }
    }  */
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
