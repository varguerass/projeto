// Array para armazenar os nomes dos amigos
let amigos = [];

// Variável para armazenar os pares de amigos secretos
let pares = [];
let indiceAtual = 0; // Controla o índice do par atual

// Função para adicionar um amigo à lista
function adicionarAmigo() {
    // Captura o valor do campo de entrada
    const input = document.getElementById('amigo');
    const nome = input.value.trim();

    // Valida se o campo está vazio
    if (nome === "") {
        alert("Por favor, insira um nome.");
        return;
    }

    // Adiciona o nome ao array de amigos
    amigos.push(nome);

    // Limpa o campo de entrada
    input.value = "";

    // Atualiza a lista de amigos na tela
    atualizarListaAmigos();
}

// Função para atualizar a lista de amigos na tela
function atualizarListaAmigos() {
    // 1. Obter o elemento da lista
    const listaAmigos = document.getElementById('listaAmigos');

    // 2. Limpar a lista existente
    listaAmigos.innerHTML = "";

    // 3. Percorrer o array de amigos
    for (let i = 0; i < amigos.length; i++) {
        // 4. Criar um novo elemento <li> para cada amigo
        const itemLista = document.createElement('li');
        itemLista.textContent = amigos[i]; // Define o texto do <li> como o nome do amigo

        // 5. Adicionar o elemento <li> à lista
        listaAmigos.appendChild(itemLista);
    }
}

// Função para sortear amigos secretos
function sortearAmigo() {
    // Verifica se há pelo menos dois amigos para sortear
    if (amigos.length < 2) {
        alert("Adicione pelo menos dois amigos para sortear.");
        return;
    }

    // Embaralha o array de amigos
    const amigosEmbaralhados = [...amigos].sort(() => Math.random() - 0.5);

    // Cria pares de amigos secretos
    pares = [];
    for (let i = 0; i < amigosEmbaralhados.length; i++) {
        const amigoAtual = amigosEmbaralhados[i];
        const amigoSorteado = amigosEmbaralhados[(i + 1) % amigosEmbaralhados.length];
        pares.push({ amigoAtual, amigoSorteado });
    }

    // Reinicia o índice atual
    indiceAtual = 0;

    // Habilita o botão "Próximo"
    document.getElementById('botaoProximo').disabled = false;

    // Exibe o primeiro par
    exibirProximoPar();
}

// Função para exibir o próximo par
function exibirProximoPar() {
    const resultado = document.getElementById('resultado');

    // Verifica se ainda há pares para exibir
    if (indiceAtual < pares.length) {
        const par = pares[indiceAtual];
        resultado.innerHTML = `O amigo secreto de <strong>${par.amigoAtual}</strong> é...`;
    } else {
        // Exibe a mensagem de finalização
        resultado.innerHTML = "Todos os amigos já foram sorteados!";

        // Desabilita os botões "Sortear amigo" e "Próximo"
        document.getElementById('botaoProximo').disabled = true;
        document.getElementById('botaoSortear').disabled = true;
    }
}

// Função para revelar o amigo secreto
function revelarAmigoSecreto() {
    const resultado = document.getElementById('resultado');
    const par = pares[indiceAtual];

    // Revela o amigo secreto
    resultado.innerHTML = `O amigo secreto de <strong>${par.amigoAtual}</strong> é: <strong>${par.amigoSorteado}</strong>`;

    // Avança para o próximo par
    indiceAtual++;

    // Exibe o próximo par após um pequeno intervalo (opcional)
    setTimeout(() => {
        exibirProximoPar();
    }, 2000); // Aguarda 2 segundos antes de exibir o próximo par
}
