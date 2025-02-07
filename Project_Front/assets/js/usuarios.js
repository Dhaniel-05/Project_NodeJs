const url = 'http://localhost:3000/api/users/';
const contenedor = document.querySelector('tbody');
const modal = document.getElementById('modalUsuario');
const formUsuario = document.querySelector('form');
const nombre = document.getElementById('nombre');
const usuario = document.getElementById('usuario');
const email = document.getElementById('email');
const password = document.getElementById('password');
const btnCrear = document.getElementById('btnCrear');

// Verificar autenticación
if (!localStorage.getItem('token')) {
    window.location.href = 'login.html';
}

function agregarHeaders(options = {}) {
    return {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            ...options.headers
        }
    };
}

const mostrar = (usuarios) => {
    contenedor.innerHTML = '';
    usuarios.forEach(usuario => {
        contenedor.innerHTML += `
            <tr>
                <td class="visually-hidden">${usuario.id}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.usuario}</td>
                <td>${usuario.email}</td>
                <td>
                    <button class="btn btnEditar">Editar</button>
                    <button class="btn btn-danger btnBorrar">Borrar</button>
                </td>
            </tr>
        `;
    });
};

// Función para cargar usuarios
const cargarUsuarios = async () => {
    try {
        const response = await fetch(url, agregarHeaders());
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        mostrar(data);
    } catch (error) {
        console.error('Error:', error);
        if (error.message.includes('401')) {
            localStorage.removeItem('token');
            window.location.href = 'login.html';
        } else if (error.message.includes('404')) {
            alert('No se encontraron usuarios.');
        }
    }
};

// Cargar usuarios al iniciar
cargarUsuarios();

document.addEventListener('click', e => {
    if (e.target.matches('.btnBorrar')) {
        const fila = e.target.closest('tr');
        const id = fila.cells[0].textContent;
        
        if (confirm('¿Eliminar este usuario?')) {
            fetch(url + id, agregarHeaders({ method: 'DELETE' }))
                .then(() => fila.remove())
                .catch(error => console.error('Error:', error));
        }
    }

    if (e.target.matches('.btnEditar')) {
        const fila = e.target.closest('tr');
        idForm = fila.cells[0].textContent;
        nombre.value = fila.cells[1].textContent;
        usuario.value = fila.cells[2].textContent;
        email.value = fila.cells[3].textContent;
        opcion = 'editar';
        modal.style.display = "block";
    }
});

formUsuario.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const data = {
        nombre: nombre.value,
        usuario: usuario.value,
        email: email.value
    };

    if (password.value) {
        data.passwords = password.value;
    }
    
    const method = opcion === 'crear' ? 'POST' : 'PUT';
    const endpoint = opcion === 'crear' ? url : url + idForm;
    
    try {
        const response = await fetch(endpoint, agregarHeaders({
            method: method,
            body: JSON.stringify(data)
        }));
        if (!response.ok) {
            throw new Error('Error al guardar el usuario');
        }
        await cargarUsuarios(); // Recargar usuarios
        modal.style.display = "none";
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al procesar la solicitud');
    }
});

// Logout
document.getElementById('btnLogout').onclick = () => {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
};
