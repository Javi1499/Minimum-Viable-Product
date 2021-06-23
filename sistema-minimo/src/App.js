import { React, Fragment, useState, useEffect } from "react";
import Cita from './Components/Cita';
import Login from './Components/Login'
import PropTypes from 'prop-types';
import axios from 'axios';
import MainView from './Components/MainView';
import { getToken, initAxiosIntterceptos } from "./helpers";
initAxiosIntterceptos();


function App() {
  //States
  const [citas, setCitas] = useState([]);
  const [citasCompletas, setCitasCompletas] = useState(false);
  const [estaLogueado, setEstaLogueado] = useState(false);
  const [esAdmin, setEsAdmin] = useState(false);
  //const [datosUsuario, setDatosUsuario] = useState([]);

  //Function para obtener las citas guardadas
  const obtenerData = async () => {
    const response = await axios.get("https://mvp-system.herokuapp.com/citas/obtenerCitas");
    setCitas(response.data.data);
  }

  const obtenerCitasCompletas = async () => {
    const response = await axios.get("https://mvp-system.herokuapp.com/citas/obtenerCitasCompletas");
    setCitas(response.data.data);
  }
  //Funcion que elimina una cita por su id/key
  const eliminarCita = async id_cita => {
    const numCita = {
      id_cita: id_cita
    }
    const data = await axios.post(`https://mvp-system.herokuapp.com/citas/eliminarCita`, numCita);
    console.log(data)
    await obtenerData();
  }
  const aceptarCita = async id_cita => {
    const numCita = {
      id_cita: id_cita
    }
    const data = await axios.post(`https://mvp-system.herokuapp.com/citas/aceptarCita`, numCita);
    await obtenerData();
  }
  //use Effect para realizar operaciones cuando el state cambia
  useEffect(async () => {
    async function cargarUsuario() {
      if (!getToken()) {
        setEstaLogueado(false);
      }
      else {
        setEstaLogueado(true);
        if(citasCompletas===true){
          await obtenerCitasCompletas()
        } else{
          await obtenerData();
        }
        
        if(localStorage.getItem('admin')==="true"){
          setEsAdmin(true)
        }
      }
    }
    cargarUsuario()
  }, [estaLogueado, citasCompletas]);
  //Mensaje condicional
  if (citas === undefined) {
    console.log(citas)
    setCitas([]); 
    return;
  } else {
    var titulo = citas.length === 0 || undefined ? "No hay citas" : "Administra tus citas";
  }

  return (
    <Fragment>
      {estaLogueado ?
        <MainView
        esAdmin={esAdmin}
        citas={citas}
        setCitas={setCitas}
        titulo={titulo}
        eliminarCita={eliminarCita}
        setEstaLogueado={setEstaLogueado}
        setEsAdmin={setEsAdmin}
        aceptarCita={aceptarCita}
        citasCompletas={citasCompletas}
        setCitasCompletas={setCitasCompletas}
        obtenerCitasCompletas={obtenerCitasCompletas}
        />
        : 
        <Login
          setEstaLogueado={setEstaLogueado}
          setEsAdmin={setEsAdmin}
        />
      }

    </Fragment>
  );
}




Cita.protoType = {
  cita: PropTypes.array.isRequired,
  eliminar: PropTypes.func.isRequired
}
export default App;