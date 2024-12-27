const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.post('/login', async (req, res) => {
  try {
    const { dni, password } = req.body;
    
    const query = 'SELECT codigo, dni, abonado FROM "SH_teleinca01".abonados WHERE codigo = $1 AND dni = $2';
    const result = await pool.query(query, [password, dni]);

    if (result.rows.length > 0) {
      res.json({
        success: true,
        nombre: result.rows[0].abonado,
        code: result.rows[0].codigo
      });
    } else {
      res.json({
        success: false,
        message: 'Credenciales incorrectas'
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error en el servidor'
    });
  }
  
});


module.exports = router; 