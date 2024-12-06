const apiBaseUrl = 'http://localhost:3000/api/produtos'; // Ajuste para sua API real

// Carregar produtos ao abrir a página
window.onload = () => carregarProdutos();

function carregarProdutos() {
    fetch(apiBaseUrl)
        .then(response => response.json())
        .then(produtos => {
            const lista = document.getElementById('product-list');
            lista.innerHTML = '';
            produtos.forEach(produto => {
                lista.innerHTML += `
                    <tr>
                        <td>${produto.nome}</td>
                        <td>R$ ${produto.preco.toFixed(2)}</td>
                        <td>
                            <button onclick="alterarProduto(${produto.id})">Alterar</button>
                            <button onclick="excluirProduto(${produto.id})">Excluir</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(err => console.error(err));
}

function adicionarProduto() {
    const nome = document.getElementById('nome').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const descricao = document.getElementById('descricao').value;

    fetch(apiBaseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, preco, descricao })
    })
    .then(() => carregarProdutos())
    .catch(err => console.error(err));
}

function alterarProduto(id) {
    const novoPreco = prompt('Digite o novo preço:');
    if (novoPreco) {
        fetch(`${apiBaseUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ preco: parseFloat(novoPreco) })
        })
        .then(() => carregarProdutos())
        .catch(err => console.error(err));
    }
}

function excluirProduto(id) {
    if (confirm('Deseja realmente excluir este produto?')) {
        fetch(`${apiBaseUrl}/${id}`, { method: 'DELETE' })
            .then(() => carregarProdutos())
            .catch(err => console.error(err));
    }
}
