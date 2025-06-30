const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

router.get('/', productosController.getAll);
router.get('/:codProducto', productosController.getOne);
router.post('/', productosController.create);
router.put('/:codProducto', productosController.update);
router.delete('/:codProducto', productosController.remove);

module.exports = router;