import express from 'express';
import { createProduct, deleteProductById, getAllProducts, getProductById, updateProductById } from '../services/product.service';

const productRouter = express.Router();

productRouter.route('/').get(getAllProducts).post(createProduct);
productRouter.route('/:id').get(getProductById).patch(updateProductById).delete(deleteProductById);

export { productRouter };
