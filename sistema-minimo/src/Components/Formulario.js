import {React, Fragment, useState} from 'react';
import axios from 'axios'
const Formulario = ({setCitas, citas}) => {
//Crear State Citas
const [cita, setCita] = useState({
    mascota:'',
    usuario:'',
    fecha:'',
    hora: '',
    sintomas:''
});
const [error, setError] = useState(false);

//Funcion que se ejecuta cada que el usuaruioi modica un input
const actualizarState = e =>{
    setCita({
        ...cita,
        [e.target.name] : e.target.value
    })
}
//Extraer valores
const {mascota, usuario, fecha, hora, sintomas} = cita;

//Enviar formulario
const submitCita = async (e) =>{
   e.preventDefault();

   //validar
if(mascota.trim()===''|| usuario.trim()===""|| fecha.trim()===""||
 hora.trim()===""|| sintomas.trim()===""){
    setError(true)
    
    return
}
//Actualizar error
setError(false);

   //Crear cita
   
    await axios.post("http://localhost:4006/citas/nuevaCita", cita)
    setCitas([...citas, cita])
   // Reiniciar el form
   setCita({
    mascota:'',
    usuario:'',
    fecha:'',
    hora: '',
    sintomas:''
   })
}
    return ( 
<Fragment>
    <h2>Crear Cita</h2>
{error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}

    <form
    onSubmit={submitCita}
    >
        <label>Nombre Mascota</label>
        <input 
        type="text"
        name="mascota"
        className="u-full-width"
        placeholder="Nombre mascota"
        onChange={actualizarState}
        value={mascota}
        />
        <label>Nombre del duenio</label>
        <input 
        type="text"
        name="usuario"
        className="u-full-width"
        placeholder="Nombre del duenio"
        onChange={actualizarState}
        value={usuario}
        />
         <label>Fecha</label>
        <input 
        type="date"
        name="fecha"
        className="u-full-width"
        onChange={actualizarState}
        value={fecha}
        />
         <label>Hora</label>
        <input 
        type="time"
        name="hora"
        className="u-full-width"
        onChange={actualizarState}
        value={hora}
        />
          <label>Sintomas</label>
       <textarea
       className="u-full-width"
       name="sintomas"
       onChange={actualizarState}
       value={sintomas}
       >
       </textarea>
       <button
    type="submit"
    className="u-full-width button-primary">
        Agregar cita</button>
    </form>
</Fragment>

    );
}
 
export default Formulario;