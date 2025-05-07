import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

export const Telefono = sequelize.define('Telefono', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: false
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  esSmartphone: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  tableName: 'telefono',   
  timestamps: false        
});
