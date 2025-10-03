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
async function actualizarUsuario (id, datos){
    try {
        
        // Construimos los datos que solamente se van a actualizar:
        const campos = [];
        const valores = [];

        if (datos.nombre !== undefined) {
            campos.push('nombre = ?');
            valores.push(datos.nombre);
        }

        if (datos.correo !== undefined) {
            campos.push('correo = ?');
            valores.push(datos.correo);
        }

        if (datos.edad !== undefined) {
            campos.push('edad = ?');
            valores.push(datos.edad);
        }

        if (datos.ciudad !== undefined) {
            campos.push('ciudad = ?');
            valores.push(datos.ciudad);
        }

        // Construimos la query final
        const query_actualizar = `UPDATE usuarios SET ${campos.join(', ')} WHERE id = ?`;
        valores.push(id);

        const [actualizado] = await pool.query(query_actualizar, valores);
        
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
        
        return eliminado.affectedRows > 0;

    } catch (error) {
        console.error("No se pudo eliminar la información del usuario: ", error.message);
        throw error;
    }
}

export {crearUsuario, 
    obtenerUsuarios, 
    usuarioEspecifico, 
    actualizarUsuario,
    borrarUsuario
};