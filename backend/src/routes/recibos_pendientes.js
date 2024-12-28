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
    "SH_huanuco002".deuda d
INNER JOIN 
    "SH_huanuco002".abonados k
    ON d.codigo_abonado = k.codigo
LEFT JOIN 
    "ventas".conceptos_comprobante cb
    ON d.detalle::INTEGER = cb.id
LEFT JOIN 
    "SH_huanuco002".cobros_servicio cs
    ON d.codigo_abonado = cs.codigo_abonado
WHERE 
    (d.codigo_cobro IS NULL OR d.codigo_cobro = '')
    AND d.anulado = 'f'
    AND d.fecha_ultimo_pago <= (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 MONTH - 1 DAY')
    AND d.codigo_abonado = $1
ORDER BY
	d.codigo_abonado ASC,
    d.fecha_ultimo_pago ASC
    `;
    const result = await pool.query(query, [codigoUsuario]);

    res.json(result.rows);
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ message: 'Error al consultar la base de datos' });
  }
});


module.exports = router;
