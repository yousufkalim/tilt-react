import http from "./httpServices";

const apiEndPoint = "/restaurant";

const getOrderHistory = async () => {
  const { data } = await http.get(`${apiEndPoint}/history`);
  return data.history;
};

const getDishes = async () => {
  const { data } = await http.get(`${apiEndPoint}/dishes`);
  return data.dishes;
};

const createDish = async (body) => {
  const { data } = await http.post(`${apiEndPoint}/dish`, body);
  return data;
};

export { getOrderHistory, getDishes, createDish };
