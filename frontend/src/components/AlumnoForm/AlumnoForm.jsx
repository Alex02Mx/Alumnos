import { useState, useEffect } from "react";
import { createAlumno, updateAlumno } from "../../api/alumnos.api";
import SpinnerSmall from "../Spinner/SpinnerSmall";

export default function AlumnoForm({ addAlumno,
                              updateAlumnoLocal,
                              editingAlumno, 
                              setEditingAlumno,
                              showMessage
                         }) {

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  // Cuando seleccionamos un alumno para editar
  useEffect(() => {
    if (editingAlumno) {
      setName(editingAlumno.name);
      setCourse(editingAlumno.course);
    } else {
      setName("")
      setCourse("")
    }
  }, [editingAlumno]);


  const handleSubmit = async (e) => {
    e.preventDefault();

  // Validación del formulario
    if (!name || !course) {
      showMessage("Todos los campos son obligatorios", "error");
      return;
    }

    try {
      setLoadingSubmit(true);

      if (editingAlumno) {
        const res = await updateAlumno(editingAlumno.id, { name, course });
        updateAlumnoLocal(res.data);
        setEditingAlumno(null)
      } else {
        const res = await createAlumno({ name, course });
        addAlumno(res.data)
      }

    // limpiar formulario
      setName("");
      setCourse("");

    if (editingAlumno) {
      showMessage("Alumno actualizado correctamente", "success");
    } else {
      showMessage("Alumno creado correctamente", "success");
    }

    } catch (error) {
      if ( editingAlumno ) {
        showMessage("Error al actualizar el alumno", "error");
      } else {
        showMessage("Error al crear el alumno", "error");
      }
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        value={name}
        onChange={(e) => {
          setName(e.target.value)
        }}
        placeholder="Nombre"
      />

      <input
        value={course}
        onChange={(e) => {
          setCourse(e.target.value)
        }}
        placeholder="Curso"
      />

      <button disabled={loadingSubmit}>
        {loadingSubmit ? <SpinnerSmall  /> : editingAlumno ? "Actualizar" : "Guardar"}
      </button>

      {editingAlumno && (
        <button
          type="button"
          onClick={()=> {
            setEditingAlumno(null)
            showMessage("Edición cancelada", "success");
          }}
        >
          Cancelar
        </button>
      )}  

    </form>
  );
}




// 🔹 Fase 1 — Estado consistente (CRÍTICO)

//  create optimista

//  update optimista

//  delete optimista

//  restore optimista

//  sincronizar activos 

// 🔹 Fase 2 — UX profesional

// reemplazar window.confirm por modal

// loaders por botón (ya casi lo tienes)

// feedback visual mejorado

// 🔹 Fase 3 — Features reales

// 🔍 búsqueda por ID / nombre

// filtros

// paginación (opcional)

// 🔹 Fase 4 — Performance

// memoización (React.memo, useCallback)

// evitar renders innecesarios

