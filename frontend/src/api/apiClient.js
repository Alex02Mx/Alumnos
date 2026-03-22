const host = window.location.hostname;
const BASE_URL = `http://${host}:3000/api`;

export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    }
  });
  // por si el backend devuelve 204 No Content:
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  
  if (!res.ok) {
    throw new Error(data.error || "Error en request");
  }

  return data;
};