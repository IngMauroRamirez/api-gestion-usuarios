import pool from '../config/db.js'

// Función para crear un usuario
async function crearUsuario({nombre, correo, edad, ciudad}) {
    // realizamos la la inserción haciendo conexión a la bd
    try {
        const [resultado_insercion] = await pool.query(
            'INSERT INTO usuarios (nombre, correo, edad, ciudad) VALUES (?, ?, ?, ?)',
            [nombre, correo, edad, ciudad]
        );
        return {id: resultado_insercion.insertId, nombre, correo, edad, ciudad };
    } catch (error) {
        // en caso de error mostrará el mensaje correspondiente
        console.error("No se pudo crear el usuario: ", error.message);

        // validamos que solo se pueda hacer un registro por correo
        if(error.code == 'ER_DUP_ENTRY'){
            const e = new Error('El correo ya está registrado en la base de datos');
            // generamos el status 409 (conflicto solicitud mal enviada)
            e.status = 409;
            throw e;
        }

        throw error;
    }
}

// Función para consultar todos los usuarios existentes
async function obtenerUsuarios (){
    try {
        const[info_usuarios] = await pool.query('SELECT * FROM usuarios');
        return info_usuarios;
    } catch (error) {
        console.error("No se pudo consultar la información de todos los usuarios: ", error.message);
        throw error;
    }
}

// Función para consultar a un usuario en específico
async function usuarioEspecifico (id){
    try {
        const [datos_usuario] = await pool.query(
            'SELECT * FROM usuarios where id = ?', [id]
        );
        return datos_usuario[0];
    } catch (error) {
        console.error("No se pudo consultar la información del usuario: ", error.message);
        throw error;
    }
}

// Función para actualizar la información de un usuario en específico
async function actualizarUsuario (id, {nombre, correo, edad, ciudad}){
    try {
        const [actualizado] = await pool.query(
            'UPDATE usuarios SET nombre = ?, correo = ?, edad = ?, ciudad = ? WHERE id = ?',
            [nombre, correo, edad, ciudad, id]
        );
        
        return actualizado.affectedRows > 0;

    } catch (error) {
        console.error("No se pudo actualizar la información del usuario: ", error.message);
        throw error;
    }
}

// Función para eliminar un usuario de la base de datos:
async function borrarUsuario (id) {
    try {
        const [eliminado] = await pool.query(
            'DELETE FROM usuarios WHERE id = ?', [id]
        );
        
        return result.affectedRows > 0;

    } catch (error) {
        console.error("No se pudo eliminar la información del usuario: ", error.message);
        throw error;
    }
}

export {crearUsuario, 
    obtenerUsuarios, 
    usuarioEspecifico, 
    actualizarUsuario
};