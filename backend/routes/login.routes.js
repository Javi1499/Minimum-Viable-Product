const express = require('express');
const router = express.Router();
const pool = require("../models/connection");
const {iniciarSesion, singUp} = require("../controllers/login.controllers")

router.post('/iniciarSesion',iniciarSesion);
router.post('/registro', singUp);
// router.get('/whoami', validarToken);


module.exports = router;