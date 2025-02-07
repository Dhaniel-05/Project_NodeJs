// Definición de variables
const url = 'http://localhost:3000/api/clients/';
const contenedor = document.querySelector('tbody');
const modal = document.getElementById('modalCliente');
const formCliente = document.querySelector('form');
const nombre = document.getElementById('nombre');
const cedula = document.getElementById('cedula');
const telefono = document.getElementById('telefono');
const correo = document.getElementById('correo');
const estatura = document.getElementById('estatura');
const edad = document.getElementById('edad');
const btnCrear = document.getElementById('btnCrear');
const closeBtn = document.querySelector('.close');
const closeBtnSecondary = document.querySelector('.close-btn');
let opcion = '';
let idForm = 0;

if (!localStorage.getItem('token')) {
    window.location.href = 'login.html';
}

// Verificar autenticación
if (!localStorage.getItem('token')) {
    window.location.href = 'login.html';
}

// Función para agregar headers de autenticación
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

// Función para manejar eventos delegados
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e);
        }
    });
};

// Funciones del modal
btnCrear.onclick = function() {
    modal.style.display = "block";
    opcion = 'crear';
    formCliente.reset(); // Usar reset() en lugar de limpiar cada campo manualmente
};

closeBtn.onclick = function() {
    modal.style.display = "none";
};

closeBtnSecondary.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// Función para mostrar los resultados
const mostrar = (clientes) => {
    contenedor.innerHTML = '';
    clientes.forEach(cliente => {
        contenedor.innerHTML += `
            <tr>
                <td class="visually-hidden">${cliente.id}</td>
                <td>${cliente.nombre}</td>
                <td>${cliente.cedula}</td>
                <td>${cliente.telefono}</td>
                <td>${cliente.correo}</td>
                <td>${cliente.estatura}</td>
                <td>${cliente.edad}</td>
                <td>
                    <button class="btn btn-primary btnEditar">Editar</button>
                    <button class="btn btn-danger btnBorrar">Borrar</button>
                </td>
            </tr>
        `;
    });
};

// Cargar datos con autenticación
fetch(url, agregarHeaders())
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
    })
    .then(data => mostrar(data))
    .catch(error => {
        console.error('Error:', error);
        if (error.message.includes('401')) {
            localStorage.removeItem('token');
            window.location.href = 'login.html';
        }
    });

// Procedimiento Borrar
on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.closest('tr');
    const id = fila.cells[0].textContent;
    
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
        fetch(url + id, agregarHeaders({ method: 'DELETE' }))
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(() => {
            fila.remove();
        })
        .catch(error => {
            console.error('Error:', error);
            if (error.message.includes('401')) {
                localStorage.removeItem('token');
                window.location.href = 'login.html';
            }
            alert('Hubo un error al eliminar el cliente');
        });
    }
});

// Procedimiento Editar
on(document, 'click', '.btnEditar', e => {
    const fila = e.target.closest('tr');
    idForm = fila.cells[0].textContent;
    nombre.value = fila.cells[1].textContent;
    cedula.value = fila.cells[2].textContent;
    telefono.value = fila.cells[3].textContent;
    correo.value = fila.cells[4].textContent;
    estatura.value = fila.cells[5].textContent;
    edad.value = fila.cells[6].textContent;
    opcion = 'editar';
    modal.style.display = "block";
});

// Procedimiento para Crear y Editar
formCliente.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const data = {
        nombre: nombre.value,
        cedula: cedula.value,
        telefono: telefono.value,
        correo: correo.value,
        estatura: estatura.value,
        edad: edad.value
    };
    
    const method = opcion === 'crear' ? 'POST' : 'PUT';
    const endpoint = opcion === 'crear' ? url : url + idForm;
    
    fetch(endpoint, agregarHeaders({
        method: method,
        body: JSON.stringify(data)
    }))
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
    })
    .then(() => {
        // Recargar todos los datos después de crear o editar
        return fetch(url, agregarHeaders());
    })
    .then(response => response.json())
    .then(data => {
        mostrar(data);
        modal.style.display = "none";
        formCliente.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        if (error.message.includes('401')) {
            localStorage.removeItem('token');
            window.location.href = 'login.html';
        }
        alert('Hubo un error al procesar la solicitud');
    });
});

// Agregar botón de cerrar sesión
const btnLogout = document.createElement('button');
btnLogout.className = 'btn btn-danger';
btnLogout.textContent = 'Cerrar Sesión';
btnLogout.style.margin = '10px';
btnLogout.onclick = () => {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
};
document.querySelector('.container').insertBefore(btnLogout, document.querySelector('table'));

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    window.location.href = 'login.html';
}