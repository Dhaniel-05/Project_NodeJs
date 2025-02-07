const validateUser = (data) => {
    const errors = {};

    if (!data.usuario) {
        errors.usuario = 'El usuario es requerido';
    }

    if (!data.passwords) {
        errors.passwords = 'La contraseña es requerida';
    } else if (data.passwords.length < 6) {
        errors.passwords = 'La contraseña debe tener al menos 6 caracteres';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

const validateProduct = (data) => {
    const errors = {};

    if (!data.name) {
        errors.name = 'El nombre es requerido';
    }

    if (!data.price) {
        errors.price = 'El precio es requerido';
    } else if (isNaN(data.price) || data.price <= 0) {
        errors.price = 'El precio debe ser un número mayor que 0';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

module.exports = {
    validateUser,
    validateProduct
};