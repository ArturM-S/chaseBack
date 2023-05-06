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
    pool.query('SELECT * FROM chaseio', (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send('Erro ao consultar a tabela chaseio');
      } else {
        res.json(result.rows);
      }
    });
  });

  app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
  });
