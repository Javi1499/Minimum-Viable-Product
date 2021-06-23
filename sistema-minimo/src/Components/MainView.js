import { React, Fragment } from "react";
import Formulario from './Formulario';
import Cita from './Cita';
import {deleteToken } from "../helpers";
const MainView = ({ citas, setCitas, titulo, eliminarCita, setEstaLogueado, esAdmin, setEsAdmin, aceptarCita, obtenerCitasCompletas, setCitasCompletas, citasCompletas, datosUsuario}) => {

  const textButton = citasCompletas ? "Ver citas pendientes" : "Ver citas terminadas";

  if (esAdmin) {
    return (
      <Fragment>
        <div>
          <h1> Estas son las citas pendientes</h1>
          <div>
            <button className="button citas"
              onClick={() => {
                if (!citasCompletas) {
                  obtenerCitasCompletas();
                  setCitasCompletas(!citasCompletas);
                  return;
                }
                setCitasCompletas(!citasCompletas)
              }}

            >{textButton}</button>
          </div>
          <div className="container">
            <div className="listas">
              <h2>{titulo}</h2>
              {citas.map(cita => (
                <Cita
                  key={cita.id_cita}
                  cita={cita}
                  eliminarCita={eliminarCita}
                  esAdmin={true}
                  aceptarCita={aceptarCita}
                />
              ))}
            </div>
          </div>
          <div className="row">

            <button className="button sesion two-half column"
              onClick={() => {
                deleteToken()
                setEstaLogueado(false);
                setEsAdmin(false)
                localStorage.removeItem('admin');
                setCitasCompletas(false);
              }}

            >Cerrar SESIÓN</button>
          </div>

        </div>
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <div>
          <h1> Administrador de pacientes </h1>
          <div className="container">
            <div className="row">
              <div className="one-half column">
                <Formulario
                  setCitas={setCitas}
                  citas={citas}
                  datosUsuario={datosUsuario}
                />
              </div>
              <div className="one-half column">
                <h2>{titulo}</h2>
                {citas.map(cita => (
                  <Cita
                    key={cita.id_cita}
                    cita={cita}
                    eliminarCita={eliminarCita}
                    aceptarCita={aceptarCita}
                  />
                ))}
              </div>
            </div>
          </div>

          <button className="button sesion"
            onClick={() => {
              deleteToken()
              setEstaLogueado(false);
              localStorage.removeItem('admin');
              setCitasCompletas(false);
            }}

          >Cerrar SESIÓN</button>
        </div>
      </Fragment>
    )
  }
}

export default MainView;