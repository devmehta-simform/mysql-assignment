import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/sequelizeProvider';
import { User } from './user';

export const Order = sequelize.define('Orders', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  status: {
    type: DataTypes.ENUM('delivered', 'pending', 'cancelled'),
    allowNull: false,
  },
  expected_delivery_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  order_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  },
});

Order.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });
User.hasMany(Order, { foreignKey: 'user_id' });
