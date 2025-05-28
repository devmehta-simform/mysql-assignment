import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('mydb', 'dm', '', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  define: {
    timestamps: false,
  },
});
