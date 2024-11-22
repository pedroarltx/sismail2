document.addEventListener("DOMContentLoaded", () => {
    // Verificar autenticação ao carregar a página
    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            // Se o usuário não estiver autenticado, redirecione para a página de login
            window.location.href = "login.html";
        }
    });

    // Referência aos elementos HTML
    const regEmailInput = document.getElementById("reg_email");
    const regPasswordInput = document.querySelector(".sing-up input[type='password']");
    const loginEmailInput = document.querySelector(".sing-in input[type='email']");
    const loginPasswordInput = document.querySelector(".sing-in input[type='password']");
    const regButton = document.getElementById("registrar");
    const loginButton = document.querySelector(".sing-in button");

    // Registrar novo usuário
    regButton.addEventListener("click", async (event) => {
        event.preventDefault(); // Prevenir o comportamento padrão do formulário

        const email = regEmailInput.value;
        const password = regPasswordInput.value;

        if (email && password) {
            try {
                const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
                alert("Usuário registrado com sucesso!");
                console.log("User:", userCredential.user);
            } catch (error) {
                console.error("Erro ao registrar usuário:", error.message);
                alert(`Erro: ${error.message}`);
            }
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    });

    // Fazer login
    loginButton.addEventListener("click", async (event) => {
        event.preventDefault(); // Prevenir o comportamento padrão do formulário

        const email = loginEmailInput.value;
        const password = loginPasswordInput.value;

        if (email && password) {
            try {
                const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
                console.log("User:", userCredential.user);
                window.location.href = "pags/home.html";
            } catch (error) {
                console.error("Erro ao fazer login:", error.message);
                alert(`Erro: ${error.message}`);
            }
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    });
});
