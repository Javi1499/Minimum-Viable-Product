import { React, Fragment, useState, useEffect } from "react";
import Formulario from './Components/Formulario';
import Cita from './Components/Cita';
import Login from './Components/Login'
import PropTypes from 'prop-types';
import axios from 'axios'
import { getToken, deleteToken } from "./helpers";


function App() {
  //States
  const [citas, setCitas] = useState([]);
  const [estaLogueado, setEstaLogueado] = useState(false);
  //const [datosUsuario, setDatosUsuario] = useState([]);

  //Function para obtener las citas guardadas
  const obtenerData = async()=>{
    const response = await axios.get("http://localhost:4006/citas/obtenerCitas",{headers:{
      "x-access-token": localStorage.getItem("token")
    }})
 setCitas(response.data.data);
    
  }
    //Funcion que elimina una cita por su id/key
    const eliminarCita = async id_cita =>{
      await axios.post("http://localhost:4006/citas/eliminarCita", {id_cita});
    await  obtenerData();
    }
//use Effect para realizar operaciones cuando el state cambia
useEffect(async() => {
async function cargarUsuario(){
  console.log(getToken())
  if(!getToken()){
    setEstaLogueado(false);
  }
  else {
setEstaLogueado(true);
await obtenerData();
  } 
}
cargarUsuario()
}, [estaLogueado, ]);
//Mensaje condicional
const titulo = citas.length === 0||undefined ? "No hay citas" : "Administra tus citas";
  return (
    <Fragment>
      {estaLogueado ? 
       <div>
       <h1> Administrador de pacientes </h1>
     <div className="container">
       <div className="row">
         <div className="one-half column">
           <Formulario
           setCitas={setCitas}
           citas={citas}
           />
         </div>
         <div className="one-half column">
           <h2>{titulo}</h2>
           {citas.map(cita => (
             <Cita
key={cita.id_cita}
cita={cita}
eliminarCita={eliminarCita}
             />
           ))}
         </div>
       </div>
     </div>

     <button 
     onClick={()=>{
       deleteToken()
      setEstaLogueado(false);
      }}
     
     >Cerrar sesion</button>
       </div>
      :
      <Login
      setEstaLogueado={setEstaLogueado}
      />
      }
      
    </Fragment>
  );
}




Cita.protoType ={
  cita: PropTypes.array.isRequired,
  eliminar: PropTypes.func.isRequired
}
export default App;