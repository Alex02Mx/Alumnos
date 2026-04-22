// === Imports ===
import { useNavigate } from "react-router-dom";  //
import { useState, useEffect } from "react";
import { useAlumnos } from "../hooks/useAlumnos";

// === Imports from Componets === //
import DeletedAlumnoList from "../components/DeleteAlumnoList/deletealumnoList";
import AlumnoForm from "../components/AlumnoForm/AlumnoForm";
import AlumnoList from "../components/AlumnoList/AlumnosList";
import Toast from "../components/Toast/Toast";
import SpinnerPage from "../components/Spinner/SpinnerPage"
import SpinnerSmall from "../components/Spinner/SpinnerSmall";
import SearchBar from "../components/SearchBar/SearchBar";
import Pagination from "../components/Pagination/Pagination"

// === Import from context === //
import { useAuth } from "../context/AuthContext";

// === Import Styles === //
import "./Dashboard.css";

// Function to export === //
export default function Dashboard(){
  const { logout, user} = useAuth();
 
  // === custome Hook from useAlumnos.jsx === //
  const {
    alumnos,
    deletedAlumnos,
    // 
    initialLoading,
    fetching,
    //
    totalPages,
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
  
  // === UseStates Here === //
  const [editingAlumno, setEditingAlumno] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
 
  // === Router Function === //
  const navigate = useNavigate(); //

  // === Central Function Messages Toast === //
  const showMessage = (text, type) => {
    if(type === "success") setMessage(text); // here state
    if (type === "error") setError(text);    // here state

    setTimeout(() => {
      setMessage(null)  // here state
      setError(null)    // here state
    }, 2000)
  }

  //  === Conditional for Spinner === //
  if (initialLoading) return <SpinnerPage />;  // From useAlumnos state

  return(
    <>
      <h2>Bienvenido {user?.email}</h2>   {/* From AuthContext State */}
      <button onClick={()=>{
          logout();   //  From AuthContext Function 
          navigate("/login");
        }}
      >
        Cerrar sesión
      </button>
      
     
      <h2>{editingAlumno ? "Editar alumno" : "Crear alumno"}</h2>  {/* Here state */}
      <AlumnoForm addAlumno={addAlumno}    // From useAlumnos function
                  updateAlumnoLocal={updateAlumnoLocal}   // From useAlumnos function
                  editingAlumno={editingAlumno}   // here state
                  setEditingAlumno ={setEditingAlumno}   // here state
                  showMessage = {showMessage} />  {/* here Function */}  
      
      <div className="listHeader">
        <h2>Lista de alumnos</h2>

        {fetching && <SpinnerSmall />} {/* From useAlumnos state */}
      </div>

      <SearchBar
          search={search}
          setSearch={setSearch}
          setPage={setPage}
      />

      <AlumnoList alumnos={alumnos}    // From useAlumnos state
                  setEditingAlumno={setEditingAlumno}   // Here state
                  deleteAlumnoLocal={deleteAlumnoLocal}   // From useAlumnos Function
                  showMessage = {showMessage}/>   {/* Here Function */}

      <Pagination
        page = {page}
        setPage = {setPage}
        totalPages = {totalPages}
      />

      <h2>Lista de alumnos borrados</h2>
      <DeletedAlumnoList deletedAlumnos = {deletedAlumnos}   // From useAlumnos state
                         restoreAlumnoLocal={restoreAlumnoLocal}   // From useAlumnos Function
                         showMessage = {showMessage}/>   {/* Here Function */}

      <Toast message={message} error={error} />   {/* Here State */}
      </>
  );
}

