const { Pool } = require('pg');

// Connexion à PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'taskmate',
  password: 'taskpass', // remplace par ton mot de passe
  port: 5432,
});

module.exports = pool;






