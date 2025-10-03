/* Importamos las funciones creadas en el modelo para poder usarlas en el controlador */
import {
    crearUsuario, 
    obtenerUsuarios, 
    usuarioEspecifico, 
    actualizarUsuario, 
    borrarUsuario
} from '../models/usuarios.model.js'

// Función para crear un usuario
async function crearUsuarioController(req, res){
    try {
        // extraemos los campos que llegan por req
        const { nombre, correo, edad, ciudad } = req.body;

        // validamos que almenos el usuario haya enviado el nombre y el correo
        // ya que son dos datos requeridos por la bd y en caso de que no mandamos
        // un status 400 (bad request)
        if (!nombre || !correo) {
            return res.status(400).json({
                error: 'nombre y el correo son campos obligatorios.'
            });
        }

        // convertimos el valor de edad en dato numérmico.
        // si no es un valor numero entonces mandamos un status 400 (bad request)
        const edadNumerica = edad !== undefined && edad !== null ? parseInt(edad, 10) : null;
        if (edad !== undefined && Number.isNaN(edadNumerica)) {
            return res.status(400).json({
                error: 'La edad debe ser un número.'
            });
        }

        // Si todo sale bien ejecutamos el modelo y mandamos un
        // status 200 (solicitud exitosa)
        const nuevoUsuario= await crearUsuario({ nombre, correo, edad, ciudad });
        return res.status(200).json({
            mensaje:"El usuario ha sido creado.", usuario: nuevoUsuario
        });
    } catch (error) {
        // generamos un mensaje por consola
        console.error("No se pudo crear el usuario.", error.message);

        // Para el error preguntamos por el código 409 en caso de se haya generado.
        if (error.status) {
            return res.status(error.status).json({
                error: error.message
            });
        }
        
        // retornamos el error por defecto 500 (Internal server error)
        return res.status(500).json({ 
            error: "No se pudo crear el usuario" 
        });
    }
}

// Función para obtener la info de todos los usuarios
async function ObtenerUsuariosController(req, res){
    try {
        // consultamos el modelo para traer la data de todos los usuarios
        const informacion_usuarios = await obtenerUsuarios();

        // Validamos si viene o no información de la base de datos.
        if (informacion_usuarios.length == 0) {
            return res.status(200).json({
                mensaje: "No hay usuarios registrados en la base de datos"
            });
        }else{
            return res.status(200).json({
                data:informacion_usuarios
            });
        }
    } catch (error) {
        // generamos un mensaje por consola
        console.error("No se pudo obtener la información de los usuarios.", error.message);

        // retornamos el error por defecto 500 (Internal server error)
        return res.status(500).json({ 
            error: "No se pudo obtener la info de los usuarios" 
        });
    }
}

// Función para obtener la info de un usuario en específico
async function usuarioEspecificoController(req, res) {
  try {
    // Obtenemos el id que se manda como parametro
    const { id } = req.params;

    // llamamos al modelo para obtener la info del usuario.
    const usuario = await usuarioEspecifico(id);

    // si el usuario no existe entonces mandamos un status (404 not found)
    if (!usuario) {
        return res.status(404).json({ 
            mensaje: "No se pudo encontrar la información del usuario." 
        });
    }else{
        return res.status(200).json({
            data:usuario
        });
    }
    // res.json(usuario);
  } catch (error) {
    // generamos un mensaje por consola
    console.error("No se pudo encontrar al usuario con id: "+id, error.message);
    
    // retornamos el error por defecto 500 (Internal server error)
    return res.status(500).json({ 
        error: "No se pudo consultar el usuario con id: "+id 
    });
  }
}

// Función para actualizar un Usuario acorde al id propocionado
async function actualizarUsuarioController(req, res) {
  try {
    // Obtenemos el id que se manda como parametro
    const { id } = req.params;

    // extraemos los campos que llegan por req
    const { nombre, correo, edad, ciudad } = req.body;

    // llamamos al modelo para actualizar la info del usuario.
    const actualizado = await actualizarUsuario(id, { nombre, correo, edad, ciudad });

    // Si no se pudo actualizar entonces generamos una respuesta con status 404 (bad request)
    if (!actualizado) {
        return res.status(404).json({ 
            mensaje: "No se encontro el usuario para actualizar la información" 
        });
    }else{
        return res.status(200).json({ 
            mensaje: "Información del usuario actualizado con éxito."
        });
    }

  } catch (error) {
    // generamos un mensaje por consola.
    console.error("Hubo un error al intentar actualizar la información del usuario: ", error.message);

    // retornamos el error por defecto 500 (Internal server error)
    return res.status(500).json({ 
        error: "No se pudo actualizar la información del usuario." 
    });
  }
}

// Función para eliminar un usuario específico de la base de datos.
async function eliminarUsuarioController(req, res){
    try {
        // Obtenemos el id que se manda como parametro
        const { id } = req.params;

        // llamamos al modelo para eliminar al usuario de la bd
        const eliminado = await borrarUsuario(id);

        // Si no se pudo eliminar entonces generamos una respuesta con status 404 (bad request)
        if (!eliminado) {
            return res.status(404).json({ 
                mensaje: "No se pudo eliminar el usuario." 
            });
        }else{
            return res.status(200).json({ 
                mensaje: "Usuario eliminado con éxito." 
            });
        }

    } catch (error) {
        // generamos un mensaje por consola.
        console.error("Error en borrar al usuario:", error.message);

        // retornamos el error por defecto 500 (Internal server error)
        return res.status(500).json({ 
            error: "No se pudo eliminar el usuario" 
        });
    }
}

export {
    crearUsuarioController, 
    ObtenerUsuariosController, 
    usuarioEspecificoController,
    actualizarUsuarioController,
    eliminarUsuarioController
};