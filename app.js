const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = 3305;

// Configurando o EJS como template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servindo arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));


// Middleware para parsing de JSON e urlencoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexão com MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cimatec',
    database: 'aulateste'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        throw err;
    }
    console.log('Conectado ao MySQL!');
});

// Rota para a página inicial (home.ejs)
app.get('/home', (req, res) => {
    res.render('home'); // Renderiza o arquivo home.ejs na rota /home
});

// Rota para a página de cadastros (index.ejs)
app.get('/', (req, res) => {
    res.render('index'); // Renderiza o arquivo index.ejs na rota /
});

app.get('/sobre', (req, res) => {
    res.render('sobre'); 
});


// Rota para processar o formulário de adição de livros
app.post('/adicionar-livro', (req, res) => {
    let data = {isbn: req.body.isbn, title: req.body.title, author: req.body.author, year: req.body.year };
    let sql = "INSERT INTO books SET ?";
    db.query(sql, data, (err, results) => {
        if (err) {
            console.error('Erro ao inserir dados:', err);
            throw err;
        }
        res.redirect('/'); // Redireciona de volta para a página inicial de cadastros
    });
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
