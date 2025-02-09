 // Verificar autenticación al cargar la página
 document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('token')) {
        window.location.href = 'login.html';
        return;
    }
    
    // Aquí podrías hacer una petición al backend para obtener el nombre del usuario
    // Por ahora usaremos un valor del localStorage si existe
    const userName = localStorage.getItem('userName') || 'Usuario';
    document.getElementById('userName').textContent = userName;
});

function navigateTo(page) {
    // Verificar autenticación antes de navegar
    if (!localStorage.getItem('token')) {
        window.location.href = 'login.html';
        return;
    }
    window.location.href = page;
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    window.location.href = 'login.html';
}