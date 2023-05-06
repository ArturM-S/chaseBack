const db = require('./index');

db.query('SELECT * FROM users WHERE id = $1', [1])
    .then(res => console.log(res.rows[0]))
    .catch(e => console.error(e.stack));
