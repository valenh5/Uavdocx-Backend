import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('telefono_basedatos', 'alumno', 'alumnoipm', {
  host: 'localhost',
  dialect: 'mysql',
});