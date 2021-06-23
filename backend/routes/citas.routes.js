const express = require('express');
const router = express.Router();
const pool = require("../models/connection");
const {crearCita, obtenerCitas, eliminarCita, aceptarCita, obtenerCitasCompletas} = require("../controllers/citas.controller")
const {verifyJWT, esAdmin} = require("../lib/helpers");

router.post('/nuevaCita', verifyJWT, crearCita );
router.post('/eliminarCita',[verifyJWT, esAdmin], eliminarCita);
router.post('/aceptarCita',[verifyJWT, esAdmin], aceptarCita);
router.get("/obtenerCitas",[verifyJWT], obtenerCitas);
router.get("/obtenerCitasCompletas",[verifyJWT, esAdmin], obtenerCitasCompletas);


module.exports = router;