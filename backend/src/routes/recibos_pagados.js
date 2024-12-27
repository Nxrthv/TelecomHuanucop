const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/:codigoUsuario', async (req, res) => {
  try {
    const { codigoUsuario } = req.params;  // Recibir el parámetro del código único
    //console.log('codigoUsuario:', codigoUsuario);  // Depurar el parámetro recibido

    const query = `
    
    SELECT DISTINCT
    d.codigo_abonado,
    d.codigo,
    k.dni,
    cb.concepto, 
    d.monto AS deuda,
    d.codigo_cobro AS codigo_pago,
    cs.anulado AS servicio_anulado,
    TO_CHAR(d.fecha_vencimiento, 'YYYY-MM-DD') AS fecha_vencimiento,
    d.fecha_ultimo_pago
FROM 
    "SH_teleinca01".deuda d
INNER JOIN 
    "SH_teleinca01".abonados k
    ON d.codigo_abonado = k.codigo
LEFT JOIN 
    "ventas".conceptos_comprobante cb
    ON d.detalle::INTEGER = cb.id
LEFT JOIN 
    "SH_teleinca01".cobros_servicio cs
    ON d.codigo_abonado = cs.codigo_abonado
WHERE 
    (d.codigo_cobro IS NOT NULL AND trim(d.codigo_cobro) != '')
    AND cs.anulado = 'f'
    AND d.anulado = 'f'
    AND d.fecha_ultimo_pago <= '2024-12-31'
	  AND d.codigo_abonado = $1
ORDER BY
	d.codigo_abonado ASC,
    d.fecha_ultimo_pago DESC
    `;
    const result = await pool.query(query, [codigoUsuario]);

    res.json(result.rows);
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ message: 'Error al consultar la base de datos' });
  }
});

module.exports = router;
