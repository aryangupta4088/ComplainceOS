export const TOKEN_KEY = "complyos_access_token";
export const ROLE_KEY = "complyos_role";
export const USER_ID_KEY = "complyos_user_id";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(USER_ID_KEY);
}

export function getRole() {
  return localStorage.getItem(ROLE_KEY) || "business_owner";
}

export function setRole(role) {
  localStorage.setItem(ROLE_KEY, role);
}

export function getUserId() {
  return localStorage.getItem(USER_ID_KEY) || "demo-user";
}

export function setUserId(id) {
  localStorage.setItem(USER_ID_KEY, id);
}
