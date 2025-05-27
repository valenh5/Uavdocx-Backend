import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

export const Usuario = sequelize.define('Usuarios', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre_usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contrasenia: {
    type: DataTypes.STRING,
    allowNull: false,
    //field: 'contraseña_hash', depende de la db
  },
}, {
  timestamps: true,  //depende de la db tambien
});

