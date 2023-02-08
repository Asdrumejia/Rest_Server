const { response, request } = require('express');


const usuariosGet = (req = request, res = response) => {
    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'get Api - controlador get', 
        q, 
        nombre, 
        apikey,
        page,
        limit 
    });
};


const usuariosPost = (req, res = response) => {
    const { nombre, edad } = req.body
    res.json({
        msg: 'post Api - controlador post',
        nombre, 
        edad
    });
};


const usuariosPut = (req, res = response) => {
//  const id = req.params.id;
    const { id }= req.params;

    res.json({
        msg: 'put Api - controlador put',
        id
    });
};


const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete Api - controlador delete'
    });
};


const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch Api - controlador patch'
    });
};





module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}