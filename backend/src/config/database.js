const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.SDB_USER,
  host: process.env.SDB_HOST,
  database: process.env.SDB_DATABASE,
  password: process.env.SDB_PASSWORD,
  port: process.env.SDB_PORT,
});

// Opción 1: Exportación más moderna
//export default pool;

module.exports = pool;
