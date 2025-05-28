import { Umzug, SequelizeStorage } from 'umzug';
import { sequelize } from './sequelizeProvider';
import path from 'path';

console.log(path.resolve('src', 'migrations/*.ts'));

export const umzug = new Umzug({
  migrations: { glob: path.resolve('src', 'migrations/*.ts') },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});
