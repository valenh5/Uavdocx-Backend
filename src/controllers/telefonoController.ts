import { Request, Response } from 'express';
import { Telefono } from '../models/Telefono';

export const getTelefonos = async (_: Request, res: Response) => {
  const telefonos = await Telefono.findAll();
  res.json(telefonos);
};

export const crearTelefono = async (req: Request, res: Response) => {
    try {
      const nuevoTelefono = await Telefono.create(req.body);
      res.status(201).json(nuevoTelefono);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el teléfono' });
    }
};

export const actualizarTelefono = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Telefono.update(req.body, { where: { id } });
  res.sendStatus(204);
};

export const eliminarTelefono = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Telefono.destroy({ where: { id } });
  res.sendStatus(204);
};
