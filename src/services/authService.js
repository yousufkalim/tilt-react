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

export default { login, getJwt, getUserFromJwt };
