import React from 'react';
const Cita = ({ cita, eliminarCita, esAdmin, aceptarCita }) => {
    if (esAdmin) {
        return (
            <div className="cita">
                <p>Mascota:<span>{cita.mascota}</span></p>
                <p>Usuario:<span>{cita.usuario}</span></p>
                <p>Fecha:<span>{cita.fecha}</span></p>
                <p>Hora:<span>{cita.hora}</span></p>
                <p>Síntomas:<span>{cita.sintomas}</span></p>


                {cita.id_estatus === 3 ?
                    <div>
                        <button
                            className="button eliminar"
                            onClick={() => eliminarCita(cita.id_cita)}
                            disabled={cita.completa === "si"}
                        >
                            Eliminar cita &times;
                        </button>
                    </div>
                    :
                    <div>
                        <button
                            className="button eliminar"
                            onClick={() => eliminarCita(cita.id_cita)}
                            disabled={cita.completa === "si"}
                        >
                            Cancelar cita &times;
                        </button>
                        <button
                            className="button aceptar"
                            onClick={() => aceptarCita(cita.id_cita)}
                            hidden={true}
                        >
                            Aceptar cita
                        </button>
                    </div>
                }
            </div>
        )
    } else {
        return (
            <div className="cita">
                <p>Mascota:<span>{cita.mascota}</span></p>
                <p>Usuario:<span>{cita.usuario}</span></p>
                <p>Fecha:<span>{cita.fecha}</span></p>
                <p>Hora:<span>{cita.hora}</span></p>
                <p>Síntomas:<span>{cita.sintomas}</span></p>

                <button
                    className="button eliminar u-full-width"
                    onClick={() => eliminarCita(cita.id_cita)}
                >
                    Cancelar cita &times;
                </button>


            </div>
        );
    }

}




export default Cita;