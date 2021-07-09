import http from "./httpServices";

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

export default { login, getJwt };
