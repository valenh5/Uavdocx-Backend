import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/usuarios";

const router = express.Router();
const CLAVE_SECRETA = "supersecreto"; 

router.post("/registro", async (req: Request, res: Response) => {
    const { nombre_usuario, contraseña } = req.body;

    if (!nombre_usuario || !contraseña) {
        res.status(400).json({ mensaje: "El usuario y la contraseña son obligatorios" });
        return;
    }

    try {
        const usuarioExistente = await Usuario.findOne({ where: { nombre_usuario } });
        if (usuarioExistente) {
            res.status(400).json({ mensaje: "El usuario ya está en uso" });
            return;
        }

        const contraseñaHash = await bcrypt.hash(contraseña, 10);
        const nuevoUsuario = await Usuario.create({
            nombre_usuario,
            contraseña_hash: contraseñaHash,
        });

        const token = jwt.sign({ nombre_usuario: nuevoUsuario.nombre_usuario }, "supersecreto", { expiresIn: "1h" });

        res.status(201).json({ mensaje: "Usuario registrado con éxito", token });
    } catch (error) {
        console.error("Error al registrar usuario", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
});

export default router;
