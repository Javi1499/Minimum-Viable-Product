const morgan = require("morgan");
const helmet = require("helmet");
const cors = require('cors');
const express = require("express");
const app = express(helmet());
const jwt = require('jsonwebtoken');



//Ajustes
app.set('port', process.env.PORT || 4006);
//cors
app.use(cors());
app.options("*", cors());
//Moddlewwares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}))

//Routes
const citasRouter = require("./routes/citas.routes");
const autenticacion = require("./routes/login.routes");
app.use("/citas",citasRouter);
app.use('/auth',autenticacion);

//arrancar server
app.listen(app.get('port'), ()=>{
    console.log('Server on port ', app.get('port'))
});