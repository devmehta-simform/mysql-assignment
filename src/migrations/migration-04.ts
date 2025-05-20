import { DataTypes } from 'sequelize';
import { umzug } from '../utils/umzugProvider';

// create order table
export const up: typeof umzug._types.migration = async ({ context: queryInterface }) => {
  await queryInterface.createTable('Orders', {
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
};

export const down: typeof umzug._types.migration = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('Orders');
};
