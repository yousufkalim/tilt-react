import http from "./httpServices";

const apiEndPoint = "/admin";

const getAllPackages = async () => {
  const { data } = await http.get(`${apiEndPoint}/package`);
  return data.packages;
};

const buyPackage = async (data) => {
  const response = await http.post(`/user/package/payment`, data);
  return response.data;
};

export { getAllPackages, buyPackage };
