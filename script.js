function carregarProdutos() {
    const lista = document.getElementById('product-list');
    lista.innerHTML = '<tr><td colspan="4">Carregando...</td></tr>';
    
    fetch('http://localhost:3000/api/produtos')
        .then(response => response.json())
        .then(produtos => {
            lista.innerHTML = '';
            produtos.forEach(produto => {
                lista.innerHTML += `
                    <tr>
                        <td>${produto.nome}</td>
                        <td>R$ ${produto.preco.toFixed(2)}</td>
                        <td><img src="${produto.imagem}" alt="${produto.nome}" class="product-img"></td>
                        <td>
                            <button onclick="excluirProduto(${produto.id})">Excluir</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(err => {
            console.error(err);
            lista.innerHTML = '<tr><td colspan="4">Erro ao carregar os produtos.</td></tr>';
        });
}

function adicionarProduto() {
    const nome = document.getElementById('nome').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const descricao = document.getElementById('descricao').value;
    const imagem = document.getElementById('imagem').files[0];

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('preco', preco);
    formData.append('descricao', descricao);
    formData.append('imagem', imagem);

    fetch('http://localhost:3000/api/produtos', {
        method: 'POST',
        body: formData
    })
    .then(() => {
        carregarProdutos();
        document.getElementById('nome').value = '';
        document.getElementById('preco').value = '';
        document.getElementById('descricao').value = '';
        document.getElementById('imagem').value = '';
    })
    .catch(err => console.error(err));
}

function excluirProduto(id) {
    fetch(`http://localhost:3000/api/produtos/${id}`, {
        method: 'DELETE'
    })
    .then(() => carregarProdutos())
    .catch(err => console.error(err));
}

// Carregar os produtos ao abrir a página
window.onload = carregarProdutos;
