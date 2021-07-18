import http from "./httpServices";

const apiEndPoint = "/restaurant";

const getOrderHistory = async () => {
  const { data } = await http.get(`${apiEndPoint}/history`);
  return data.history;
};

export { getOrderHistory };
