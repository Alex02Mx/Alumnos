import { useState } from "react";
import { restoreAlumno } from "../../api/alumnos.api";
import SpinnerSmall from "../Spinner/SpinnerSmall";

export default function DeletedAlumnoList({ deletedAlumnos, 
                                            restoreAlumnoLocal,
                                            showMessage 
                                          }){

const [loadingId, setLoadingId] = useState(null);

const restore = async (id) => {
  try {
    setLoadingId(id);

    await restoreAlumno(id);

    restoreAlumnoLocal(id);

    showMessage("Datos de alumno recuperados", "success");

  } catch (error) {
    showMessage("Error al restaurar alumno", "error");
  } finally {
    setLoadingId(null);
  }
};

  if (!deletedAlumnos.length){
    return <p>No existen registros borrados</p>
  }
  return(
    <ul>
      {deletedAlumnos.map(a => (
        <li key={a.id}>
          {a.name} — {a.course}

          <button
            onClick={() => restore(a.id)}
            disabled={loadingId === a.id}
          >
            {loadingId === a.id ? <SpinnerSmall /> : "Restaurar"}
          </button>
        </li>
      ))}
    </ul>
  );
}

