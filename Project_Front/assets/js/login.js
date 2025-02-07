const url = 'http://localhost:3000/api/users/';
const modalRegistro = document.getElementById('modalRegistro');
const registroForm = document.querySelector('#registroForm');
const loginForm = document.querySelector('#loginForm');
const btnRegistro = document.getElementById('btnRegistro');
const closeBtn = document.querySelector('.close');
const closeBtnSecondary = document.querySelector('.close-btn');

btnRegistro.onclick = () => modalRegistro.style.display = "block";
closeBtn.onclick = () => modalRegistro.style.display = "none";
closeBtnSecondary.onclick = () => modalRegistro.style.display = "none";

window.onclick = (event) => {
    if (event.target == modalRegistro) {
        modalRegistro.style.display = "none";
    }
};

// Modificar registro para incluir redirección
registroForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const data = {
        nombre: document.getElementById('nombre').value,
        usuario: document.getElementById('usuario').value,
        email: document.getElementById('email').value,
        passwords: document.getElementById('password').value
    };
    
    try {
        const response = await fetch(url + 'register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) throw new Error('Error en el registro');
        
        alert('Usuario registrado exitosamente');
        modalRegistro.style.display = "none";
        registroForm.reset();
    } catch (error) {
        console.error('Error:', error);
        alert('Error en el registro');
    }
});

// Modificar login para guardar más información y redirigir al dashboard
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const data = {
        usuario: document.getElementById('loginUsuario').value,
        passwords: document.getElementById('loginPassword').value
    };
    
    try {
        const response = await fetch(url + 'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) throw new Error('Credenciales inválidas');
        
        const result = await response.json();
        localStorage.setItem('token', result.token);
        localStorage.setItem('userName', data.usuario); // Guardar el nombre de usuario
        window.location.href = 'index.html'; // Redirigir al dashboard en lugar de index.html
    } catch (error) {
        console.error('Error:', error);
        alert('Usuario o contraseña incorrectos');
    }
});