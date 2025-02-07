const express = require('express');
const crudController = require('../controllers/crudController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get('/', auth, async (req, res) => {
    try {
        const resultados = await crudController.obtenerTodos('clientes');
        res.json(resultados);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener clientes', detalle: error.message });
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const resultado = await crudController.obtenerUno('clientes', req.params.id);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener cliente', detalle: error.message });
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const resultado = await crudController.crear('clientes', req.body);
        res.status(201).json(resultado);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear cliente', detalle: error.message });
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const resultado = await crudController.actualizar('clientes', req.params.id, req.body);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar cliente', detalle: error.message });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const resultado = await crudController.eliminar('clientes', req.params.id);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar cliente', detalle: error.message });
    }
});

module.exports = router;