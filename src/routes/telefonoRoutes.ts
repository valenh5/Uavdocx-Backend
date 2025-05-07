import { Router } from 'express';
import {
  getTelefonos,
  crearTelefono,
  actualizarTelefono,
  eliminarTelefono
} from '../controllers/telefonoController';

const router = Router();

router.get('/', getTelefonos); 
router.post('/', crearTelefono);
router.put('/:id', actualizarTelefono);
router.delete('/:id', eliminarTelefono);

export default router;