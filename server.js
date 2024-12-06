const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'MSDistribuidora'
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado ao banco de dados.');
});

app.get('/api/produtos', (req, res) => {
    db.query('SELECT * FROM Produtos', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/api/produtos', (req, res) => {
    const { nome, preco, descricao } = req.body;
    db.query('INSERT INTO Produtos (nome, preco, descricao) VALUES (?, ?, ?)', [nome, preco, descricao], err => {
        if (err) throw err;
        res.sendStatus(201);
    });
});

app.put('/api/produtos/:id', (req, res) => {
    const { preco } = req.body;
    const { id } = req.params;
    db.query('UPDATE Produtos SET preco = ? WHERE id = ?', [preco, id], err => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

app.delete('/api/produtos/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Produtos WHERE id = ?', [id], err => {
        if (err) throw err;
        res.sendStatus(200);
    });
});

app.listen(port, () => console.log(`API rodando em http://localhost:${port}`));
