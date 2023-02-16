const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, adminRole } = require('../middlewares');

const { obtenerProductos, crearProducto, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');


const router = Router();


//Obtener todas los productos - publico
router.get('/', obtenerProductos);


//Obtener un producto por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
],  obtenerProducto);


//cear un producto - privado - cualquier persona con un token valido
router.post('/', [ 
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id de Mongo').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    validarCampos
],  crearProducto);


//Para actualizar - privado - cualquiera con un token valido
router.put('/:id', [
    validarJWT,
    check('id').custom(existeProductoPorId),
    validarCampos
],  actualizarProducto);


//Para borrar una producto- solo si es un Admin
router.delete('/:id', [
    validarJWT,
    adminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
],  borrarProducto);


module.exports = router;