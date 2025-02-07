const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    try {
        const resultado = await userController.crearUsuario(req.body);
        res.status(201).json(resultado);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear usuario', detalle: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { usuario, passwords } = req.body;
        const [user] = await userController.obtenerUsuarioPorUsername(usuario);
        
        if (!user) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        const validPassword = await bcrypt.compare(passwords, user.passwords);
        if (!validPassword) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            { id: user.id }, 
            process.env.JWT_SECRET || 'secretkey', 
            { expiresIn: '1h' }
        );
        
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error en el login', detalle: error.message });
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const resultado = await userController.actualizarUsuario(req.params.id, req.body);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar usuario', detalle: error.message });
    }
});

// Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const usuarios = await userController.obtenerTodosUsuarios(); // Asegúrate de implementar esta función en userController
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios', detalle: error.message });
    }
});

module.exports = router;