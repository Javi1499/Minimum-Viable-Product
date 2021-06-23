import {React, Fragment, useState} from 'react';
import axios from 'axios'

const Formulario = ({setCitas, citas}) => {
//Crear State Citas
const [cita, setCita] = useState({
    mascota:'',
    usuario:'',
    fecha:new Date(),
    hora: '',
    sintomas:''
});
const [error, setError] = useState({
    error:false,
    mensaje:""
});

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
    setError({error:true, mensaje:"Todos los campos son obligatorios"});
    
    return
}
//Actualizar error
setError(false);

   //Crear cita
   
   const res = await axios.post("https://mvp-system.herokuapp.com/citas/nuevaCita", cita);
   if(res.data.status !=200){
       setError({error:true, mensaje:"Ya hay una cita en ese horario y dia"})
       setCita({
        mascota:'',
        usuario:'',
        fecha:'',
        hora: '',
        sintomas:''
       })
       return;
   }
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
{error.error ? <p className="alerta-error">{error.mensaje}</p> : null}

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
        <label>Nombre del dueño</label>
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
          <label>Síntomas</label>
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