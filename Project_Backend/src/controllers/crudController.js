const pool = require('../config/database');

class CrudController {
    async obtenerTodos(tabla) {
        try {
            const [resultados] = await pool.query(`SELECT * FROM ${tabla}`);
            return resultados;
        } catch (error) {
            throw error;
        }
    }

    async obtenerUno(tabla, id) {
        try {
            const [resultado] = await pool.query(`SELECT * FROM ${tabla} WHERE id = ?`, [id]);
            return resultado;
        } catch (error) {
            throw error;
        }
    }

    async crear(tabla, data) {
        try {
            const [resultado] = await pool.query(`INSERT INTO ${tabla} SET ?`, [data]);
            return { ...data, id: resultado.insertId };
        } catch (error) {
            throw error;
        }
    }

    async actualizar(tabla, id, data) {
        try {
            const [resultado] = await pool.query(`UPDATE ${tabla} SET ? WHERE id = ?`, [data, id]);
            return resultado;
        } catch (error) {
            throw error;
        }
    }

    async eliminar(tabla, id) {
        try {
            const [resultado] = await pool.query(`DELETE FROM ${tabla} WHERE id = ?`, [id]);
            return resultado;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new CrudController();