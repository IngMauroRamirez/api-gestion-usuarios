/* llamado de app.js en donde se configura express y las rutas del controlador de usuarios */
import app from './app.js'

/* 
    llamado de la configuración del archivo .env 
    unicamente para asignar el puerto
*/
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.APP_PORT;

app.listen(PORT, () =>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
})