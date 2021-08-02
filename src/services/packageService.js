import http from "./httpServices";

const apiEndPoint = "/admin";

const getAllPackages = async () => {
  const { data } = await http.get(`${apiEndPoint}/package`);
  return data.packages;
};

export { getAllPackages };
