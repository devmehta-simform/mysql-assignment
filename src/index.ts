import express from 'express';
import { userRouter } from './routes';
import { sequelize } from './utils/sequelizeProvider';

const app = express();
const port = 3000;

app.use('/user', userRouter);

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    console.log(`server listening on port ${port}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
