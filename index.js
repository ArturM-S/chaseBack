const express = require('express');

const { Pool } = require('pg');

const app = express();


const pool = new Pool({
    user: 'postgres',
    host: '172.21.0.2',
    database: 'chaseio',
    password: 'postgres',
    port: 5432, // porta padrão do PostgreSQL
});

app.get('/chaseio', (req, res) => {
    pool.query('SELECT * FROM chaseio limit 100', (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send('Erro ao consultar a tabela chaseio');
      } else {
        res.json(result.rows);
      }
    });
  });


//get with word that cnae_fiscal can contain and uf and return only nome e celular
app.get('/chaseio/:cnae_fiscal/:uf', (req, res) => {
    const cnae_fiscal = req.params.cnae_fiscal;
    const uf = req.params.uf;
    pool.query('SELECT razao_social, celular FROM chaseio WHERE cnae_fiscal LIKE $1 AND uf = $2 limit 10', ['%' + cnae_fiscal + '%', uf], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erro ao consultar a tabela chaseio');
        } else {
            res.json(result.rows);
        }
    });
});
// app.get('/chaseio/:cnae_fiscal/:uf', (req, res) => {
//     const cnae_fiscal = req.params.cnae_fiscal;
//     const uf = req.params.uf;
//     pool.query('SELECT nome, celular FROM chaseio WHERE cnae_fiscal = $1 AND uf = $2 limit 10', [cnae_fiscal, uf], (error, result) => {
//         if (error) {
//             console.error(error);
//             res.status(500).send('Erro ao consultar a tabela chaseio');
//         } else {
//             res.json(result.rows);
//         }
//     });
// });

//create a post route to insert email and name
app.post('/chaseio', (req, res) => {
    const { nome, email } = req.body;
    pool.query('INSERT INTO chaseio (nome, email) VALUES ($1, $2)', [nome, email], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erro ao inserir na tabela chaseio');
        } else {
            res.status(201).send(`Usuário adicionado com sucesso: ${result.insertId}`);
        }
    });
});


  app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
  });
