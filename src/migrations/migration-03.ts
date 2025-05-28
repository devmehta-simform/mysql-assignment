import { DataTypes } from 'sequelize';
import { umzug } from '../utils/umzugProvider';

// create products table
export const up: typeof umzug._types.migration = async ({ context: queryInterface }) => {
  await queryInterface.createTable('Products', {
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
      allowNull: true,
      defaultValue: null,
      type: DataTypes.DATE,
    },
  });
};

export const down: typeof umzug._types.migration = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('Products');
};
