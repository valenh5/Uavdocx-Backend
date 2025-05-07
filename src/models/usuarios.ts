import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

export class Usuario extends Model {
    public id!: number;
    public nombre_usuario!: string;
    public contraseña_hash!: string;
    public fecha_creacion!: Date;
}

Usuario.init(
    {
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
        contraseña_hash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fecha_creacion: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: "Usuario",
        tableName: "usuarios",
        timestamps: false,
    }
);

