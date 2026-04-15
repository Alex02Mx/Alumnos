import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { deleteAlumno } from "../../api/alumnos.api";
import { useState } from "react";
import SpinnerSmall from "../Spinner/SpinnerSmall";

export default function AlumnoList({ 
                              alumnos, 
                              setEditingAlumno,
                              deleteAlumnoLocal, 
                              showMessage
                            }){

const [loadingId, setLoadingId] = useState(null);

const [showModal, setShowModal] = useState(false);
const [selectedId, setSelectedId] = useState(null);

const handleConfirmDelete = async () => {
  try {
    setLoadingId(selectedId);

    await deleteAlumno(selectedId);

    deleteAlumnoLocal(selectedId);

    showMessage("Registro borrado con exito", "success");

  } catch (error) {
    showMessage("Error al eliminar alumno", "error");
  } finally {
    setLoadingId(null);
    setShowModal(false);
    setSelectedId(null);
  }
};

if(!alumnos.length){
  return <p>No hay alumnos registrados</p>
}

return (
    <>
      <ul>
        {alumnos.map(a => (
          <li key={a.id}>
            {a.name} — {a.course}

            <button onClick={() => setEditingAlumno(a)}>
              Editar
            </button>

            <button
              onClick={() => {
                setSelectedId(a.id);
                setShowModal(true);
              }}
              disabled={loadingId === a.id}
            >
              {loadingId === a.id ? <SpinnerSmall /> : "X"}
            </button>
          </li>
        ))}
      </ul>

      <ConfirmModal
        isOpen={showModal}
        message="¿Seguro que quieres eliminar este alumno?"
        onConfirm={handleConfirmDelete}
        onClose={() => {
          setShowModal(false);
          setSelectedId(null);
        }}
      />
    </>
  );
}

