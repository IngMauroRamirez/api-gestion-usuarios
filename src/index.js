/* 
    llamado de la configuración del archivo .env
    para cargar las variables de entorno definidas solamente una vez
    antes de importar los modulos que las usarán (db.js y app.js)
*/
import dotenv from 'dotenv';
dotenv.config();

/* llamado de app.js en donde se configura express y las rutas del controlador de usuarios */
import app from './app.js'

// Definimos el puerto por donde estará ejecutando la apirestful
const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () =>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
})