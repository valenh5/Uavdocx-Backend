import { Request, Response } from 'express';
import { Usuario } from '../models/usuarios';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import { enviarCorreoVerificacion } from '../utils/email'; 
import { enviarCorreoReset } from '../utils/email'; 


const SECRET_KEY = 'uavdocx'; // igual que en el middleware

export const registrarUsuario = async (req: Request, res: Response): Promise<void> => {
  const { usuario, email, contrasenia } = req.body;

  if (!usuario || !email || !contrasenia) {
    res.status(400).json({ mensaje: 'Faltan datos back' });
    return;
  }

  if (!validator.isEmail(email)) {
    res.status(400).json({ mensaje: 'Email inválido' });
    return;
  }

  try {
    const usuarioExistente = await Usuario.findOne({ where: { usuario } });
    if (usuarioExistente) {
      res.status(409).json({ mensaje: 'El usuario ya existe' });
      return;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contrasenia, saltRounds);

    const nuevoUsuario = await Usuario.create({
      usuario,
      email,
      contrasenia: hashedPassword,
      verificado: false, 
    });

    
    const tokenVerificacion = jwt.sign(
      { email },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

   
    await enviarCorreoVerificacion(email, tokenVerificacion);

    res.status(201).json({ mensaje: 'Usuario registrado. Revisa tu correo para confirmar tu cuenta.' });
} catch (error: any) {
  console.error('Error en registrarUsuario:', error);
  res.status(500).json({
    mensaje: 'Error al registrar usuario',
    error: error.errors?.[0]?.message || error.message || error
  });
}

};

export const comprobarUsuario = async (req: Request, res: Response): Promise<void> => {
  const { usuario_ingreso, pass_ingreso } = req.body;

  if (!usuario_ingreso || !pass_ingreso) {
    res.status(400).json({ mensaje: 'Faltan ingresar datos' });
    return;
  }

  try {
    const usuario = await Usuario.findOne({ where: { usuario: usuario_ingreso } });

    if (!usuario) {
      res.status(404).json({ mensaje: 'El usuario no fue encontrado' });
      return;
    }

    const hashBD = usuario.get('contrasenia') as string;
    const passBien = await bcrypt.compare(pass_ingreso, hashBD);

    if (passBien) {
      const token = jwt.sign(
        { usuario: usuario_ingreso },
        SECRET_KEY,
        { expiresIn: '1h' }
      );

      res.status(200).json({ mensaje: 'Login correcto', token });
    } else {
      res.status(401).json({ mensaje: 'La contraseña es incorrecta' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al ingresar al usuario' });
  }
};

export const verificarUsuario = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.params;

  try {
    const payload = jwt.verify(token, SECRET_KEY) as { email: string };

    const usuario = await Usuario.findOne({ where: { email: payload.email } });

    if (!usuario) {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
      return;
    }

    await usuario.update({ verificado: true });

    res.status(200).json({ mensaje: 'Cuenta verificada con éxito, puede volver a la pagina' });
  } catch (error: any) {
    console.error('Error para verificar usuario:', error);
    res.status(400).json({ mensaje: 'Token inválido o expirado', error: error.message || error });
  }
};


export const solicitarResetContrasenia = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;

  if (!email || !validator.isEmail(email)) {
    res.status(400).json({ mensaje: 'Email inválido' });
    return;
  }

  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      res.status(404).json({ mensaje: 'No existe un usuario con ese email' });
      return;
    }

    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '15m' });
    await enviarCorreoReset(email, token);

    res.status(200).json({ mensaje: 'Correo enviado para restablecer contraseña' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al solicitar restablecimiento' });
  }
};

export const resetearContrasenia = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.params || req.body.token;;
  const { nuevaContrasenia } = req.body;
  console.log('Token recibido:', req.params.token);

  if (!nuevaContrasenia) {
    res.status(400).json({ mensaje: 'Falta la nueva contraseña' });
    return;
  }

  try {
    const { email } = jwt.verify(token, SECRET_KEY) as { email: string };

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
      return;
    }

    const hashed = await bcrypt.hash(nuevaContrasenia, 10);
    await usuario.update({ contrasenia: hashed });

    res.status(200).json({ mensaje: 'Contraseña actualizada correctamente' });
  } catch (error: any) {
    console.error('Error en resetearContrasenia:', error);
    res.status(400).json({ mensaje: 'Token inválido o expirado', error: error.message });
  }
};
