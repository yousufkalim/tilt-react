import http from "./httpServices";

const apiEndPoint = "/restaurant";

const getRestaurantOrderHistory = async () => {
  const { data } = await http.get(`${apiEndPoint}/history`);
  return data;
};

export { getRestaurantOrderHistory };
