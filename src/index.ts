import express from 'express';
import { sequelize } from './utils/sequelizeProvider';
import { umzug } from './utils/umzugProvider';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger-output.json';
import { userRouter } from './routes/user.routes';
import { productRouter } from './routes/product.routes';
import { orderRouter } from './routes/order.routes';
import { orderDetailsRouter } from './routes/orderDetails.routes';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);
app.use('/order-details', orderDetailsRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    await umzug.up();
    console.log('Connection has been established successfully.');
    console.log(`server listening on port ${port}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
