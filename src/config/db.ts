import { Sequelize } from 'sequelize';

<<<<<<< HEAD
export const sequelize = new Sequelize('telefono_basedatos', 'alumno', 'alumnoipm', {
=======
export const sequelize = new Sequelize('uavdocx', 'root', 'valen3008', {
>>>>>>> abmPrenda
  host: 'localhost',
  dialect: 'mysql',
});
//Por falta de permisos, el env se usa en el poli
/*import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';


dotenv.config({ path: path.resolve(__dirname, '../../../compose/.env') });


if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD) {
  throw new Error("Faltan variables de entorno en .env");
}

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
  }
);
*/