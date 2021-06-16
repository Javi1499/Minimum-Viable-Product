const express = require('express');
const router = express.Router();
const pool = require("../models/connection");
const {crearCita, obtenerCitas, eliminarCita} = require("../controllers/citas.controller")
const {verifyJWT} = require("../lib/helpers");
router.post('/nuevaCita', verifyJWT, crearCita );
router.post('/eliminarCita', verifyJWT,eliminarCita);
router.get("/obtenerCitas",verifyJWT, obtenerCitas);


module.exports = router;