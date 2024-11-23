document.addEventListener("DOMContentLoaded", () => {
    // Verificar autenticação ao carregar a página
    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            // Se o usuário não estiver autenticado, redirecione para a página de login
            window.location.href = "index.html";
        }
    });
});