import { apiFetch } from "./apiClient";

export const loginRequest = (credentials) =>
  apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials)
  });

export const meRequest = () =>
  apiFetch("/auth/me");