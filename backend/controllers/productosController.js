const Producto = require('../models/producto');

exports.getAll = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.json(productos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getOne = async (req, res) => {
    try {
        const producto = await Producto.findByPk(req.params.codProducto);
        if (!producto) return res.status(404).json({ message: 'No encontrado' });
        res.json(producto);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const nuevo = await Producto.create(req.body);
        res.status(201).json(nuevo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const [actualizado] = await Producto.update(req.body, {
            where: { codProducto: req.params.codProducto }
        });
        if (actualizado === 0) return res.status(404).json({ message: 'No encontrado' });
        res.json({ message: 'Actualizado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const eliminado = await Producto.destroy({
            where: { codProducto: req.params.codProducto }
        });
        if (!eliminado) return res.status(404).json({ message: 'No encontrado' });
        res.send(204);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};