import http from "./httpServices";
import jwtDecode from "jwt-decode";

const apiEndPoint = "/auth";
const token = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data } = await http.post(`${apiEndPoint}/login`, {
    email,
    password,
  });

  return data;
}

export async function suggestCompany(email, name) {
  const { data } = await http.post(`${apiEndPoint}/suggestCompany`, {
    email,
    name,
  });
  return data;
}

export function getJwt() {
  return localStorage.getItem(token);
}

export function getUserFromJwt() {
  try {
    const jwt = localStorage.getItem(token);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function logout() {
  return localStorage.removeItem(token);
}

export default { login, getJwt, getUserFromJwt, logout, suggestCompany };
