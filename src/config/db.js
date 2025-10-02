// llamado de la libreria mysql2 pero en forma de promesa.
import mysql from 'mysql2/promise'
// llamado de la configuración del archivo .env
import dotenv from 'dotenv';
dotenv.config();

// Preparamos la conexion a la base de datos para retornar
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;