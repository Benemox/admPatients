import React, { Fragment, useState, useEffect} from 'react';
import Formulario from './components/formulario';
import Cita from './components/Cita';

function App() {

  //Citas en localStorage
  let citasIniciales =JSON.parse( localStorage.getItem("citas"));
  if(!citasIniciales){
    citasIniciales = [];
  }

  //Areglo de CITAS
   const[citas, guardarCitas]= useState(citasIniciales);

  // realizar ciertas operaciones cuando usseefect escucha cambios
  useEffect( ()=>{
    if(citasIniciales){
      localStorage.setItem("citas",JSON.stringify(citas));
    } else {
      localStorage.setItem("citas",JSON.stringify([]));
    }
  },[citas,citasIniciales])


   //Funcion agregando Citas nuevas y lee las anteriores
   const crearCita = cita => {guardarCitas([...citas, cita])}
  // funcionCita que elimina por id
    const eliminarCita = id => { 
    const nuevasCitas = citas.filter(cita => cita.id !== id) ;
    guardarCitas(nuevasCitas) 
    }  
    //Modificacion del titulo de segunda columna
    const titulo2 = citas.length === 0 ? "Esperando Citas"   : "Administra tus Citas"



  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
                <Formulario
                crearCita = {crearCita}
                />
          </div>
          <div className="one-half column">
            <h1>{titulo2}</h1>
            {citas.map(cita => (
              <Cita
                key= {Cita.id}
                cita ={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>

        </div>
      </div>
    </Fragment>
    
  );
}

export default App;
