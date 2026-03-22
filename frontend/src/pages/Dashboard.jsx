import { useNavigate } from "react-router-dom";  //
import { useState, useEffect } from "react";
import { useAlumnos } from "../hooks/useAlumnos";

import DeletedAlumnoList from "../components/DeleteAlumnoList/deletealumnoList";
import AlumnoForm from "../components/AlumnoForm/AlumnoForm";
import AlumnoList from "../components/AlumnoList/AlumnosList";
import Toast from "../components/Toast/Toast";
import { useAuth } from "../context/AuthContext";
import SpinnerPage from "../components/Spinner/SpinnerPage"
import SpinnerSmall from "../components/Spinner/SpinnerSmall";
import "./Dashboard.css";

export default function Dashboard(){
  const { logout, user} = useAuth();
 
  const {
    alumnos,
    deletedAlumnos,
    // 
    initialLoading,
    fetching,
    //
    addAlumno,
    updateAlumnoLocal,
    deleteAlumnoLocal,
    restoreAlumnoLocal,
    //
    search,
    setSearch,
    page,
    setPage
  } = useAlumnos();
  
  const [searchInput, setSearchInput] = useState(search);  

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
  }, 500); // 500ms debounce
    return () => clearTimeout(timeout);
  }, [searchInput]);


  const [editingAlumno,setEditingAlumno] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
 
  const navigate = useNavigate(); //

  function showMessage(text, type){
    if(type === "success") setMessage(text); 
    if (type === "error") setError(text);

    setTimeout(() => {
      setMessage(null)
      setError(null)
    }, 2000)
  }

  if (initialLoading) return <SpinnerPage />;

  return(
    <>
      <h2>Bienvenido {user?.email}</h2>
      <button onClick={()=>{
          logout();
          navigate("/login");
        }}
      >
        Cerrar sesión
      </button>
      
      <h2>{editingAlumno ? "Editar alumno" : "Crear alumno"}</h2>
      <AlumnoForm addAlumno={addAlumno} 
                  updateAlumnoLocal={updateAlumnoLocal}
                  editingAlumno={editingAlumno} 
                  setEditingAlumno ={setEditingAlumno}
                  showMessage = {showMessage}/>
      
      <div className="listHeader">
        <h2>Lista de alumnos</h2>
        {fetching && <SpinnerSmall />}
      </div>

        <input
          type="text"
          placeholder="Buscar alumno..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

      <button onClick={() => {
        setSearchInput("");
        setSearch("");
        setPage(1);
      }}>
        Limpiar
      </button>
      
      <AlumnoList alumnos={alumnos} 
                  onEdit={setEditingAlumno} 
                  deleteAlumnoLocal={deleteAlumnoLocal}
                  showMessage = {showMessage}/>
      <div>
        <button onClick={() => setPage(p => Math.max(p - 1, 1))}>
          Anterior
        </button>

        <span>Página {page}</span>

        <button onClick={() => setPage(p => p + 1)}>
          Siguiente
        </button>
      </div>

      <h2>Lista de alumnos borrados</h2>
      <DeletedAlumnoList deletedAlumnos = {deletedAlumnos}
                         restoreAlumnoLocal={restoreAlumnoLocal}
                         showMessage = {showMessage}/>

      <Toast message={message} error={error} />
      </>
  );
}

