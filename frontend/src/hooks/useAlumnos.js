import { useState, useEffect } from "react";
import { getAlumnos, getDeletedAlumnos } from "../api/alumnos.api";

export function useAlumnos(){
  // === useState Arrays for Alunmos y DeletedAlumnos === //
  const [alumnos, setAlumnos] = useState([]);
  const [deletedAlumnos, setDeletedAlumnos] = useState([]);

  // === useState boolean for Spinner === //
  const [initialLoading, setInitialLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  // === useState strings for Search Debaunce === // 
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);


  const load = async () => {
    try {
      setFetching(true);

      const res = await getAlumnos({
        search,
        page,
        limit: 5
      });

      setAlumnos(res.data.data);

    } catch (error) {
      console.error(error);
    } finally {
      setFetching(false);
      setInitialLoading(false);
    }
  };
  // --- Load Delete ---
  const loadDeleted = async () => {
    try{
      const res = await getDeletedAlumnos();
      setDeletedAlumnos(res.data.data);
    } catch (error){
      console.error("Error cargando eliminados", error);
    }
  };

  // --- Funcion Refresh ---
  // const refresh = async () => {
  //   try {
  //     await Promise.all([
  //       load(),
  //       loadDeleted()
  //     ]);
  //   } finally {

  //   }
  // };

  // --- Hook ---
  useEffect(() => {
    loadDeleted();
  }, []);

  useEffect(() => {
    load();
  }, [search, page]);

// agregar alumno 
const addAlumno = async (alumno) => {
    await load();
};

// actualizar alumno localmente
const updateAlumnoLocal = (updatedAlumno) => {
  setAlumnos(prev =>
    prev.map(a =>
      a.id === updatedAlumno.id
        ? { ...a, ...updatedAlumno }
        : a
    )
  );
};

// eliminar alumno localmente
const deleteAlumnoLocal = (id) => {
  let alumnoEliminado = null;

  setAlumnos(prev => {
    alumnoEliminado = prev.find(a => a.id === id);
    return prev.filter(a => a.id !== id);
  });

  if (alumnoEliminado) {
    setDeletedAlumnos(prev => [
      { ...alumnoEliminado, deleted: 1 },
      ...prev
    ]);
  }
};

// restaurar alumno localmente
const restoreAlumnoLocal = (id) => {
  let alumnoRestaurado = null;

  setDeletedAlumnos(prev => {
    alumnoRestaurado = prev.find(a => a.id === id);
    return prev.filter(a => a.id !== id);
  });

  if (alumnoRestaurado) {
    setAlumnos(prev => [
      { ...alumnoRestaurado, deleted: 0 },
      ...prev
    ]);
  }
};

  return {
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
  };
}

