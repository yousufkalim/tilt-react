import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../config";
axios.defaults.baseURL = baseUrl;

axios.interceptors.response.use(null, (error) => {
  const expected =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  // if (!expected) {
  //   toast.error("an unexpected error occurred");
  // }

  return Promise.reject(error);
});

export function setJwt(jwt) {
  axios.defaults.headers.common["Authorization"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
