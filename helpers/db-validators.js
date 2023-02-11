const Role = require('../models/role');
const Usuario = require('../models/usuario');

//Verificar si el rol es valido en la base de datos
const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if(!existeRol){
       throw new Error(`El rol ${rol} no está registrado en la base de datos`);
    }
};


//Verificar si el email del usuario existe en la base de datos
const emailExiste = async(correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if(existeEmail) {
       throw new Error(`Este correo: ${correo}, ya está registrado`);
    }
};


//Verificar si el id del usuario existe en la base de datos
const existeUsuarioPorId = async(id) => {
        const existeUsuario = await Usuario.findById(id);
        if (!existeUsuario) {
            throw new Error(`El id: ${ id } no existe`);
        }
};


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}