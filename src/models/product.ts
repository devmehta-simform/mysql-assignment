import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/sequelizeProvider';

export const Product = sequelize.define('Products', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING(50),
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  },
});
