import React from 'react';

const Cita = ({cita, eliminarCita}) => (
    <div className="cita">
        <p>Mascota:<span>{cita.mascota}</span></p>
        <p>Usuario:<span>{cita.usuario}</span></p>
        <p>Fecha:<span>{cita.fecha}</span></p>
        <p>Hora<span>{cita.hora}</span></p>
        <p>Sintomas<span>{cita.sintomas}</span></p>

        <button
        className="button eliminar u-full-width"
        onClick={()=> eliminarCita(cita.id_cita)}
        >
            Cancelar cita &times;
        </button>
    </div>
  );

 


export default Cita;