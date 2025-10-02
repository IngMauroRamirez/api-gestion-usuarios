/*  Importamos express */
import express from 'express';
/* Incializamos la conexión a la base de datos */
import './config/db.js'; 

/* Importamos las rutas */
import usuariosRutas from './routes/usuarios.routes.js';


const app = express();
app.use(express.json());

// Accedemos a las rutas:
app.use('/api/usuarios', usuariosRutas);

export default app;