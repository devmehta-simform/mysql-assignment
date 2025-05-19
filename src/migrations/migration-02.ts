import { DataTypes } from 'sequelize';
import { umzug } from '../utils/umzugProvider';

// add deleted_at column to users table
export const up: typeof umzug._types.migration = async ({ context: queryInterface }) => {
  await queryInterface.addColumn('Users', 'deleted_at', { allowNull: true, defaultValue: null, type: DataTypes.DATE });
};

export const down: typeof umzug._types.migration = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn('Users', 'deleted_at');
};
