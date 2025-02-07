const bcrypt = require('bcrypt');
const pool = require('../config/database');

class UserController {
    async crearUsuario(data) {
        try {
            const hash = await bcrypt.hash(data.passwords, 10);
            const userData = { ...data, passwords: hash };
            const [resultado] = await pool.query('INSERT INTO usuarios SET ?', [userData]);
            const { passwords, ...usuarioSinPassword } = userData;
            return { ...usuarioSinPassword, id: resultado.insertId };
        } catch (error) {
            throw error;
        }
    }

    async actualizarUsuario(id, data) {
        try {
            if (data.passwords) {
                data.passwords = await bcrypt.hash(data.passwords, 10);
            }
            const [resultado] = await pool.query('UPDATE usuarios SET ? WHERE id = ?', [data, id]);
            return resultado;
        } catch (error) {
            throw error;
        }
    }

    async obtenerUsuarioPorUsername(usuario) {
        try {
            const [resultado] = await pool.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
            return resultado;
        } catch (error) {
            throw error;
        }
    }

    async obtenerTodosUsuarios() {
        try {
            const [resultado] = await pool.query('SELECT * FROM usuarios');
            return resultado;
        } catch (error) {
            throw error;
        }
    }
}


module.exports = new UserController();