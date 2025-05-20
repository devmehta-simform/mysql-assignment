import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/sequelizeProvider';
import { Product } from './product';
import { Order } from './order';

export const OrderDetails = sequelize.define('Order_details', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  },
});

Product.belongsToMany(Order, { through: OrderDetails, foreignKey: 'product_id' });
Order.belongsToMany(Product, { through: OrderDetails, foreignKey: 'order_id' });
