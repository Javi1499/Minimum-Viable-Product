const pool = require("../models/connection");

const controladorCitas = {
    crearCita: async (req, res) => {
        console.log(req.body);
        const { usuario, mascota, fecha, hora, sintomas } = req.body;
        const newCita = {
            usuario,
            mascota,
            fecha,
            hora,
            sintomas,
            id_estatus: 1
        }
        const verificarLugar = await pool.query(`SELECT * from citas where fecha = "${fecha}" AND hora = "${hora}"`);
        console.log("Aqui es")
        console.log(verificarLugar.length);
        if(verificarLugar.length>0){
            res.json({ status: "400", mensaje: "Ya hay una cita en ese dia y hora" })
            return;
        }
        await pool.query("INSERT INTO citas set ?", [newCita]);
        res.json({ status: "200", mensaje: "Cita creada correctamente" })
    },
    obtenerCitas: async (req, res) => {
        const data = await
            pool.query(`SELECT * FROM citas JOIN estatus on citas.id_estatus = estatus.id_estatus where estatus.descripcion = "ACTIVO" `);
        if (data.length < 1) {
            res.json({ status: 400, mensaje: "Hubo un error", data: [] })
            return;
        }
        res.json({ status: 200, mensaje: "Esta es la informacion", data, token: req.token })
    },
    obtenerCitasCompletas: async (req, res) => {
        const data = await
            pool.query(`SELECT * FROM citas JOIN estatus on citas.id_estatus = estatus.id_estatus where estatus.descripcion = "COMPLETA" `);
        if (data.length < 1) {
            res.json({ status: 400, mensaje: "Hubo un error", data: [] })
            return;
        }
        res.json({ status: 200, mensaje: "Esta es la informacion", data, token: req.token })
    },
    eliminarCita: async (req, res) => {
        try {
            const { id_cita } = req.body;
        console.log(req.body);
        await pool.query(`UPDATE citas SET id_estatus=2 where id_cita = ?`, [id_cita]);;
        res.json({ status: 200, mensaje: "Cita cancelada", data: [] });
        } catch (error) {
            res.json({ status: 400, mensaje: error, data: [] });
        }
        

    },
    aceptarCita: async (req, res) => {
        try {
            const { id_cita } = req.body;
        console.log(req.body);
        await pool.query(`UPDATE citas SET id_estatus=3 where id_cita = ?`, [id_cita]);;
        res.json({ status: 200, mensaje: "Cita aceptada", data: [] });
        } catch (error) {
            res.json({ status: 400, mensaje: error, data: [] });
        }
        

    }
}

module.exports = controladorCitas


