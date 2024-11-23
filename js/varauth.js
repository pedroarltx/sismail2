document.addEventListener("DOMContentLoaded", () => {
    // Verificar autenticação ao carregar a página
    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            // Se o usuário não estiver autenticado, redirecione imediatamente para a página de login
            window.location.replace("index.html");  // usa replace para não manter a página atual no histórico
        }
    });
});
