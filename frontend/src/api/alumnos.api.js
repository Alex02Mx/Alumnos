import { apiFetch } from "./apiClient";

// export const getAlumnos = () =>
//   apiFetch("/alumnos");

export const getAlumnos = ({ search = "", page = 1, limit = 5 } = {}) =>
  apiFetch(`/alumnos?search=${search}&page=${page}&limit=${limit}`);

export const getAlumno = (id) =>
  apiFetch(`/alumnos/${id}`);

export const createAlumno = (data) =>
  apiFetch("/alumnos", {
    method: "POST",
    body: JSON.stringify(data)
  });

export const updateAlumno = (id, data) =>
  apiFetch(`/alumnos/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });

export const patchAlumno = (id, data) =>
  apiFetch(`/alumnos/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data)
  });

export const deleteAlumno = (id) =>
    apiFetch(`/alumnos/${id}`, {
    method: "DELETE"
  });

export const restoreAlumno = (id) =>
    apiFetch(`/alumnos/${id}/restore`, {
    method: "PATCH"
  });

export const getDeletedAlumnos = () =>
  apiFetch("/alumnos/deleted");








