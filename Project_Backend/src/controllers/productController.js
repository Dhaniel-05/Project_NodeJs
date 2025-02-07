const pool = require('../config/database');

class ProductController {
    async obtenerTodos() {
        try {
            const [rows] = await pool.query('SELECT * FROM products');
            return rows.map(product => ({
                ...product,
                image: product.image ? product.image.toString('base64') : null
            }));
        } catch (error) {
            throw error;
        }
    }

    async crear(data, image) {
        try {
            const [result] = await pool.query(
                'INSERT INTO products (name, price, image, description) VALUES (?, ?, ?, ?)',
                [data.name, data.price, image, data.description]
            );
            return { id: result.insertId };
        } catch (error) {
            throw error;
        }
    }

    async actualizar(id, data, image) {
        try {
            const updateQuery = image 
                ? 'UPDATE products SET name=?, price=?, image=?, description=? WHERE id=?'
                : 'UPDATE products SET name=?, price=?, description=? WHERE id=?';
            
            const params = image 
                ? [data.name, data.price, image, data.description, id]
                : [data.name, data.price, data.description, id];

            const [result] = await pool.query(updateQuery, params);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async eliminar(id) {
        try {
            const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async buscar(query) {
        try {
            const [rows] = await pool.query(
                'SELECT * FROM products WHERE name LIKE ? OR description LIKE ?', 
                [`%${query}%`, `%${query}%`]
            );
            return rows.map(product => ({
                ...product,
                image: product.image ? product.image.toString('base64') : null
            }));
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ProductController();