const express = require('express');
const router = express.Router();
const multer = require('multer');
const productController = require('../controllers/productController');

const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

router.get('/', async (req, res) => {
    try {
        const productos = await productController.obtenerTodos();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', upload.single('image'), async (req, res) => {
    try {
        const image = req.file ? req.file.buffer : null;
        const resultado = await productController.crear(req.body, image);
        res.status(201).json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const image = req.file ? req.file.buffer : null;
        const resultado = await productController.actualizar(req.params.id, req.body, image);
        res.json({ message: 'Producto actualizado', ...resultado });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await productController.eliminar(req.params.id);
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/search', async (req, res) => {
    try {
        const productos = await productController.buscar(req.query.query);
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;