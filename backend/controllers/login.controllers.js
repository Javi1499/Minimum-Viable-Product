const pool = require("../models/connection");
const helpers = require('../lib/helpers');
const jtw = require("jsonwebtoken");

const controladorCitas = {
    iniciarSesion: async (req, res) => {
        console.log(req.body);
        const { email, password } = req.body;
        const respuesta = await pool.query(`SELECT id_usuario, email, rol, usuario, password FROM usuarios WHERE email = ?`, [email]);
        if (respuesta.length > 0) {
            const usuario = respuesta[0];
            const validarPassword = await helpers.loginPassword(password, usuario.password);
            if (validarPassword) {
                //const id = respuesta[0].id_usuario;
                const user={
                    email:respuesta[0].email,
                    usuario:respuesta[0].usuario
                }
                const token = jtw.sign(user, "secretJWT"
                );
                res.json({ status: 200, mensaje: "Bienvenido", auth: true, token, data: {id_usuario:respuesta[0].id_usuario, rol:respuesta[0].rol} })
                return
            }
            res.json({ status: 400, mensaje: "Contraseñia incorrecta", auth: false });
            return;
        }
        res.json({ status: 400, mensaje: "Usuario no existe", auth: false });
    },
    singUp: async (req, res) => {
        const { usuario, email, password } = req.body;
        const newUser = {
            usuario,
            email,
            password,
            estatus: 1
        }

        newUser.password = await helpers.encryptPassword(password);
        const result = await pool.query("INSERT INTO usuarios set ?", [newUser]);
        res.json({ status: "400", result });
    }
    // validarToken: async(req,res)=>{
    //     jtw.verify(req.token, "secretJWT", (err))
    // }
}
// function verifyToken(req, res, next) {
//     const bearerHeader = req.headers['authorization'];
//     if(typeof bearerHeader!== 'undefined'){
//         const bearerToken = bearerHeader.split(""[1]);
//         req.token = bearerToken;
//         next()
//     }{
//         res.sendStatus(403);
//     }
//         }


module.exports = controladorCitas