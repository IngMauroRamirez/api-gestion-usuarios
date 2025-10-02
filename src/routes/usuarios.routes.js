
import express from 'express';
import Router  from "express";
const router = Router()

import usuariosController from '../controllers/usuarios.controller'

// Creamos las rutas para ser llamadas en el punto de entra de la api

router.post('/crearUsuario', usuariosController.crearUsuarioController);
router.get('/todosUsuarios', usuariosController.ObtenerUsuariosController);
