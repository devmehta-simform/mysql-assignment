import { Product } from '../models/product';
import { type RequestHandler } from 'express';

export const getAllProducts: RequestHandler = async (req, res) => {
  const products = await Product.findAll({ where: { deleted_at: null } });
  res.status(200).json({ products });
};

export const createProduct: RequestHandler = async (req, res) => {
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
