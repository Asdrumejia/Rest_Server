const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, adminRole } = require('../middlewares');

const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');


const router = Router();


//Obtener todas las categorias - publico
router.get('/', obtenerCategorias);


//Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
], obtenerCategoria);


//cear una categoria - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],  crearCategoria);


//Para actualizar - privado - cualquiera con un token valido
router.put('/:id', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],  actualizarCategoria );


//Para borrar una categoria - solo si es un Admin
router.delete('/:id', [
    validarJWT,
    adminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
],  borrarCategoria);


module.exports = router;