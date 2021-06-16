const pool = require("../models/connection");

const controladorCitas = {
    crearCita: async(req, res) =>{
        console.log(req.body);
        const {usuario, mascota, fecha, hora, sintomas} = req.body;
        const newCita={
            usuario,
            mascota,
            fecha,
            hora,
            sintomas,
            id_estatus:1
        }
        await pool.query("INSERT INTO citas set ?", [newCita]);
        res.json({status:"400"})
    },
    obtenerCitas: async(req, res) =>{
        const data = await 
        pool.query(`SELECT * FROM citas JOIN estatus on citas.id_estatus = estatus.id_estatus where estatus.descripcion = "ACTIVO" `);
        console.log(data)
        if(data.length<1){
            res.json({status:400, mensaje:"Hubo un error", data:[]})
            return;
        }
        res.json({status:200, mensaje:"Esta es la informacion", data, token:req.token})
    },
    eliminarCita: async(req, res) =>{
const {id_cita} = req.body;

await pool.query(`UPDATE citas SET id_estatus=2 where id_cita = ?`, [id_cita]);
res.json({status:200, mensaje:"Cita cancelada", data:[]});

    }
}

module.exports = controladorCitas