import { DataTypes } from 'sequelize';
import { umzug } from '../utils/umzugProvider';

// create order_details table
export const up: typeof umzug._types.migration = async ({ context: queryInterface }) => {
  await queryInterface.createTable('Order_details', {
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
};

export const down: typeof umzug._types.migration = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('Order_details');
};
