
import { Router }  from "express";
const router = Router()
import * as usuariosController from '../controllers/usuarios.controller.js'

// Creamos las rutas para ser llamadas en el punto de entra de la api

router.post('/', usuariosController.crearUsuarioController);
router.get('/', usuariosController.ObtenerUsuariosController);
router.get('/:id', usuariosController.usuarioEspecificoController);
router.put('/:id', usuariosController.actualizarUsuarioController);
router.delete('/:id', usuariosController.eliminarUsuarioController);

export default router;