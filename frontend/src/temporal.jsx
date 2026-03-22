import { useState } from 'react'
import "./index.css"
import { useEffect } from 'react';

export default function App() {

const [alumnos, setAlumnos] = useState([]);
const [name, setName] = useState("");
const [course, setCourse] = useState("");

const host = window.location.hostname;
const API_URL = `http://${host}:3000`

function  handleSubmit(e){
  e.preventDefault();
  guardarAlumnos();
}

const obtenerAlumnos = async() => {
  try{
    const respuesta = await fetch(`${API_URL}/alumnos`);
    const datos = await respuesta.json();
    setAlumnos(datos.data);
  } catch(error) {
    console.error("No puede conectarse al backend", error);
  }
};

useEffect(() => {
  obtenerAlumnos();
},[]);

const guardarAlumnos = async() => {
  await fetch(`${API_URL}/alumnos`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: name,
      course: course,
    })
  })
  setName("");
  setCourse("");
  obtenerAlumnos();
}

const borrarAlumnos = async() => {
  await fetch(`${API_URL}/alumnos/1O`, {
    method: 'DELETE',
    headers: {'Content-Type':'application/json'}
    })
    obtenerAlumnos();
}

  return (
  <>
    <div className='formCtn'>
      <h1 className='titleHeader'>Nuevo alumno</h1>
      <form className="form" onSubmit={handleSubmit} >
        <label className="winTitle" htmlFor="namWin">Nombre</label>
        <input className="inpWin" 
               id="namWin" 
               type="text"
               value={name}
               onChange={(e) => setName(e.target.value)} />
        <label className="winTitle" htmlFor="agrWin">Curso</label>
        <input className="inpWin" 
               id="agrWin"
               type="text"
               value={course}
               onChange={(e) => setCourse(e.target.value)} />
        <button className='btn'>Agregar</button>
      </form>
    </div>

    {alumnos.length === 0 && 
      <>
        <div className='formCtn'>
          <p className='subTitle'>Lista vacia</p>
        </div>
      </>
    }
    {alumnos.length > 0 && 
      <>
        <ul className='listCtn'>
          {alumnos.map((alumno, index) => {
            return(
              <li key = {index} className='listRow'>
                <div>
                  <div><span>Nombre :</span> {alumno.name}</div>
                  <div className='crsTxt'><span>Curso :</span> {alumno.course}</div>
                </div>
                <div>
                  <button className='btnStd btnEdt'>E</button>
                  <button className='btnStd btnClr'
                  onClick={() => borrarAlumnos()}
                  >X</button>
                </div>
              </li>
            )
          })}
        </ul>
      </>       
    }
  </>
  )
}