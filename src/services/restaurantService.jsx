import http from "./httpServices";

const apiEndPoint = "/restaurant";

const getOrderHistory = async () => {
  const { data } = await http.get(`${apiEndPoint}/history`);
  return data.history;
};

const getRestaurantCart = async () => {
  const { data } = await http.get(`${apiEndPoint}/cart`);
  return data;
};

const getDishes = async () => {
  const { data } = await http.get(`${apiEndPoint}/dishes`);
  return data.dishes;
};

const createDish = async (body) => {
  const { data } = await http.post(`${apiEndPoint}/dish`, body);
  return data;
};

const updateDish = async (body) => {
  const { data } = await http.put(`${apiEndPoint}/dish`, body);
  return data;
};

const deleteDish = async (_id) => {
  const { data } = await http.delete(`${apiEndPoint}/dish/${_id}`);
  return data;
};

const getDishById = async (_id) => {
  const { data } = await http.get(`${apiEndPoint}/dish/${_id}`);
  return data.dish;
};

const editRestaurant = async (body) => {
  const { data } = await http.put(`${apiEndPoint}/edit`, body);
  return data;
};

const editRestaurantBank = async (body) => {
  const { data } = await http.put(`${apiEndPoint}/edit-bank`, body);
  return data;
};

const completeRestaurantOrder = async (_id) => {
  const { data } = await http.put(`${apiEndPoint}/cart/complete/${_id}`);
  return data;
};

export {
  getOrderHistory,
  getDishes,
  deleteDish,
  createDish,
  getDishById,
  updateDish,
  editRestaurant,
  editRestaurantBank,
  getRestaurantCart,
  completeRestaurantOrder,
};
