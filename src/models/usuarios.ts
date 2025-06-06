import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

export const Usuario = sequelize.define('Usuarios', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contrasenia: {
    type: DataTypes.STRING,
    allowNull: false,
    //field: 'contraseña_hash', depende de la db
  },
  verificado:{
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
}, {
  timestamps: true,  //depende de la db tambien
});