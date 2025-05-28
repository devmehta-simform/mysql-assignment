import { DataTypes } from 'sequelize';
import { umzug } from '../utils/umzugProvider';

// create users table
export const up: typeof umzug._types.migration = async ({ context: queryInterface }) => {
  await queryInterface.createTable('Users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.CHAR(10),
      allowNull: false,
    },
    age: {
      type: DataTypes.CHAR(3),
      allowNull: false,
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
};

export const down: typeof umzug._types.migration = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('Users');
};
