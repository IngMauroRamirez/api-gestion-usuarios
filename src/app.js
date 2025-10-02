/*  Configuramos express y llamamos 
    a usuarios.routes para importar las rutas 
    del controlador. 
*/
import express from 'express';
import dotenv from 'dotenv';
import './config/db.js'; 
import usuariosRutas from './routes/usuarios.routes.js';

dotenv.config();

const app = express();
app.use(express.json());

// Accedemos a las rutas:
app.use('/api/usuarios', usuariosRutas);

export default app;