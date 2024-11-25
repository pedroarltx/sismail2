
// Função para alternar a exibição das opções extras
function toggleExtraOptions() {
    const extraOptions = document.getElementById("extra_options");
    const showExtraOptions = document.getElementById("show_extra_options");
    extraOptions.style.display = showExtraOptions.checked ? "block" : "none";
}

// Função para gerar a mensagem com base nas entradas
function gerarTexto() {
    const placa = document.getElementById("placa_ctt_resp").value.trim();
    const motorista = document.getElementById("mot_ctt_resp").value.trim();
    const localizacao = document.getElementById("loc_ctt_resp").value.trim();
    const situacao = document.getElementById("sit_ctt_resp").value;
    const situacaoExtra = document.getElementById("extra_option_list").value;
    const simCheckbox = document.getElementById("sim_ctt").checked;
    const naoCheckbox = document.getElementById("nao_ctt").checked;
    const ocorrencia = document.getElementById("ocorrencia_ctt_resp").value.trim();

    if (!placa || !motorista || !localizacao || !situacao) {
        alert("Por favor, preencha todos os campos obrigatórios e selecione uma situação.");
        return;
    }

    const frasesSituacao = {
        perda_prd: "perda de sinal enquanto o veículo estava rodando",
        perda_rdn: "perda de sinal enquanto o veículo estava parado",
        alert_dsg: "alerta de desengate",
        abert_bau: "alerta de abertura do baú",
        sens_bau: "alerta de sensor do baú",
        conf_clt: `Notificamos que o Sr.(a) ${motorista} informou macro de cliente / fim de viagem fora do ponto cadastrado em sua SM, confirma o local? \nSegue localização: ${localizacao}`,
        alert_jammer: "alerta de jammer.",
        alert_bat: "alerta de bateria violada",
        alert_ant: "alerta de antena violada",
        alert_tec: "alerta de teclado desconectado ou sem funcionamento"
    };

    let texto;

    if (simCheckbox) {
        texto = `Notificamos que o veículo ${placa}, que está com o Sr.(a) ${motorista}, gerou ${frasesSituacao[situacao]}. Conseguimos contato com o motorista onde nos informou que ${ocorrencia}. \nSegue localização: ${localizacao}`;
    } else if (naoCheckbox) {
        texto = `Notificamos que o veículo ${placa}, que está com o Sr.(a) ${motorista}, gerou ${frasesSituacao[situacao]}. Não conseguimos contato com o motorista. Deste modo, seguiremos com o plano de contingência até normalizar a situação. \nSegue localização: ${localizacao}`;
    } else {
        alert("Por favor, marque 'Sim' ou 'Não' para indicar o contato com o motorista.");
        return;
    }

    if (situacaoExtra) {
        texto += `\nO mesmo também gerou ${frasesSituacao[situacaoExtra]}.`;
    }

    // Copiar para a área de transferência
    navigator.clipboard.writeText(texto).then(() => {
        const alerta = document.getElementById('alerta');
        alerta.style.display = 'block';
        setTimeout(() => {
            alerta.style.opacity = '1';
        }, 10);

        setTimeout(() => {
            alerta.style.opacity = '0';
            setTimeout(() => {
                alerta.style.display = 'none';
            }, 500);
        }, 2000);
    }).catch((err) => {
        console.error("Erro ao copiar o texto: ", err);
    });
}


// Função para limpar o formulário
function limparFormulario() {
    // Limpar os valores dos campos de seleção
    document.getElementById('sit_ctt_resp').value = '';
    document.getElementById('extra_option_list').value = '';

    // Desmarcar o checkbox e ocultar a seção de opções extras
    const checkbox = document.getElementById('show_extra_options');
    checkbox.checked = false;
    document.getElementById('extra_options').style.display = 'none';

    // Limpar outros campos
    document.getElementById('placa_ctt_resp').value = '';
    document.getElementById('mot_ctt_resp').value = '';
    document.getElementById('loc_ctt_resp').value = '';
    document.getElementById('sim_ctt').checked = false;
    document.getElementById('nao_ctt').checked = false;
    
    // Limpar o textarea de ocorrência
    toggleOcorrencia('sim_ctt', 'ocorrencia_ctt_resp');
}
// Eventos de clique para limpar e gerar texto
document.getElementById('limparEscolhas_ctt').addEventListener('click', limparFormulario);
document.getElementById("gerarTexto_ctt").addEventListener("click", gerarTexto);

function toggleOcorrencia(checkboxId, textareaId) {
    const checkbox = document.getElementById(checkboxId);
    const textarea = document.getElementById(textareaId); // Use o parâmetro textareaId aqui

    if (checkbox.checked) {
        textarea.style.display = 'block';
    } else {
        textarea.style.display = 'none';
    }
}