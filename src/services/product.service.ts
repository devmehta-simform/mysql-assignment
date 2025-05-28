import { col, FindOptions, fn } from 'sequelize';
import { Product } from '../models/product';
import { type RequestHandler } from 'express';
import { Order } from '../models/order';

export const getAllProducts: RequestHandler = async (req, res) => {
  /*  
  #swagger.parameters['filter'] = {
    in: 'query',
    schema: {
        '@enum': ['purchased']
    }
  }
  #swagger.parameters['$ref'] = ['#/components/parameters/sortByQueryParam','#components/parameters/limitQueryParam']
  #swagger.description = "get top n purchased products"
  #swagger.responses[200] = {
    content:{
      "application/json": {
        schema: {
          $ref: "#/definitions/TopNPurchasedProducts"
        }
      }
    }
  }
  */
  const filter: FindOptions = { where: { deleted_at: null } };
  const filterBy = req.query['filter']?.toString();
  const sortBy = req.query['sortBy']?.toString();
  const limit = req.query['limit']?.toString();
  if (filterBy && sortBy) {
    switch (filterBy) {
      case 'purchased': {
        filter.attributes = [
          [col('Products.name'), 'name'],
          [fn('count', 'Products.id'), 'numberOfProductsSold'],
        ];
        filter.include = [
          {
            model: Order,
            where: { deleted_at: null },
            attributes: [],
            through: { attributes: [], where: { deleted_at: null } },
            required: false,
          },
        ];
        filter.group = ['Products.id', 'Products.name'];
        filter.subQuery = false;
        if (sortBy) {
          if (sortBy === 'desc') filter.order = [[fn('count', 'Products.id'), 'desc']];
          else if (sortBy === 'asc') filter.order = [[fn('count', 'Products.id'), 'asc']];
        }
      }
    }
  }
  if (limit) {
    filter.limit = parseInt(limit);
  }
  const products = await Product.findAll(filter);
  res.status(200).json({ products });
};

export const createProduct: RequestHandler = async (req, res) => {
  /*  #swagger.requestBody = {
            required: true,
            content: { 
              "application/json": {
                schema: { $ref: "#/components/schemas/ProductCreateDto" }
              }
            }
    }  */
  const product = req.body;
  const createdProduct = await Product.create(product);
  res.status(201).json(createdProduct);
};

export const getProductById: RequestHandler = async (req, res) => {
  const productId = req.params['id'];
  const product = await Product.findOne({
    where: {
      id: productId,
      deleted_at: null,
    },
  });
  res.status(200).json(product);
};

export const updateProductById: RequestHandler = async (req, res) => {
  /*  #swagger.requestBody = {
            required: true,
            content: { 
              "application/json": {
                schema: { $ref: "#/components/schemas/ProductUpdateDto" }
              }
            }
    }  */
  const productId = req.params['id'];
  await Product.update(
    { ...req.body },
    {
      where: {
        id: productId,
        deleted_at: null,
      },
    }
  );
  res.status(204).json();
};

export const deleteProductById: RequestHandler = async (req, res) => {
  const productId = req.params['id'];
  await Product.update({ deleted_at: new Date() }, { where: { id: productId } });
  res.status(204).json();
};
