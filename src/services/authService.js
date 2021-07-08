import http from "./httpServices";

const apiEndPoint = "/auth";
const token = "token";

export async function login(email, password) {
  const { data } = await http.post(`${apiEndPoint}/login`, {
    email,
    password,
  });

  return data;
}

export default { login };
