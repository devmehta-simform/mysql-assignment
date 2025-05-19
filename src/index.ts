import express from 'express';
import { userRouter } from './routes';
import { sequelize } from './utils/sequelizeProvider';
import { umzug } from './utils/umzugProvider';
import { productRouter } from './routes/product.routes';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/user', userRouter);
app.use('/product', productRouter);

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
