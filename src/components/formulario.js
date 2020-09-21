import React, {Fragment, useState} from 'react';
// trae un generador de ID aleatoria 
import { v4 as uuid } from 'uuid';
import PropTypes from "prop-types";

const Formulario = ({crearCita}) => {
    //Crear State de Citas
    const [cita,actualizarCita] = useState(
        {
            mascota:"",
            propietario:"",
            fecha:"",
            hora:"",
            sintomas:""
        }
    );
    const [error,actualizarError] = useState(false)

    //Funcion que se ejecuta cada vez que un usuario escribe en el input
    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    };
    // Extraer los valores
    const {mascota,propietario,fecha,hora,sintomas} = cita;

    // cuando el propietario presiona para tener la cita
    const submitCita = e =>{
        e.preventDefault();
    
        //Validar   
        if (mascota.trim()=== "" || propietario.trim()=== "" || fecha.trim()=== "" || hora.trim()=== "" || sintomas.trim()=== "" ) {
            actualizarError(true)
            return;
        } 

        //Eliminar Validacion
        actualizarError(false);
        //Asignar un ID
            cita.id = uuid();
            console.log(cita)

        // Crear la cita
        crearCita(cita)

        // Reiniciar el form
        actualizarCita({
            mascota:"",
            propietario:"",
            fecha:"",
            hora:"",
            sintomas:""
        }
        )

    }
    //{ error ? <p className="alert-error"> Todos los campos son Obligatorios <p/> : null}


    return ( 
        <Fragment>
            <h2>Crear Cita</h2>

            {error ? <p className="alerta-error">Todos los campos son Obligatorios</p>    :null}

            <form   
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input 
                type="text"
                name="mascota"
                className="u-full-width"
                placeholder="Nombre Mascota"
                onChange={actualizarState}
                value={mascota}
                />
            
           
                <label>Nombre Dueño</label>
                <input 
                type="text"
                name="propietario"
                className="u-full-width"
                placeholder="Nombre dueño de la Mascota"
                onChange={actualizarState}
                value={propietario}
                />
           
           
                <label>Fecha</label>
                <input 
                type="Date"
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
                placeholder="Especificacion de los sintomas de su mascota"
                onChange={actualizarState}
                value={sintomas}
                ></textarea>
            
            <button
                type="submit"
                className="u-full-width button-primary"
            >Agregar cita</button>
            </form>
        </Fragment>
     );
}
 
Formulario.protoType = {
    crearCita : PropTypes.func.isRequired
}

export default Formulario;