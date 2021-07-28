import http from "./httpServices";

const apiEndPoint = "/user";

const register = async (body) => {
  const { data } = await http.post(apiEndPoint, body);
  return data;
};

const getDishesForUser = async () => {
  const { data: dishes } = await http.get(`${apiEndPoint}/dishes`);
  return dishes.dishesArray;
};

const getFilteredDishes = async (filter) => {
  const { data: dishes } = await http.get(
    `${apiEndPoint}/filtered-dishes?filter=${filter}`
  );
  return dishes.dishesArray;
};

const getLoggedinUser = async () => {
  try {
    const user = await http.get(`${apiEndPoint}/get`);
    return user;
  } catch (ex) {
    return null;
  }
};

const getOrderHistory = async () => {
  const { data: orders } = await http.get(`${apiEndPoint}/orders`);
  return orders.history.orderHistory;
};

const addToCart = async (body) => {
  const { data } = await http.post(`${apiEndPoint}/cart`, body);
  return data.cart;
};

const getUserCart = async () => {
  try {
    const { data } = await http.get(`${apiEndPoint}/cart`);
    return data.cart;
  } catch (err) {
    return { userCarts: [] };
  }
};

const getUserDiscounts = async () => {
  const { data } = await http.get(`${apiEndPoint}/dishes`);
  return data.discounts;
};

const userOrderPayment = async (body) => {
  const { data } = await http.post(`${apiEndPoint}/payment`, body);
  return data;
};

const getUserOrder = async () => {
  const { data } = await http.get(`${apiEndPoint}/order`);
  return data;
};

const removeDishFromCart = async (body) => {
  const { data } = await http.put(`${apiEndPoint}/cart`, body);
  return data;
};

const editUserCompany = async (_id) => {
  const { data } = await http.put(`${apiEndPoint}/company/${_id}`);
  return data;
};

const editUserDetails = async (_id, body) => {
  const { data } = await http.put(`${apiEndPoint}/edit/${_id}`, body);
  return data;
};

const editUserPassword = async (body) => {
  const { data } = await http.put(`${apiEndPoint}/editpassword`, body);
  return data;
};

const deleteProfile = async (_id) => {
  const { data } = await http.delete(`${apiEndPoint}/delete/${_id}`);
  return data;
};

export {
  getDishesForUser,
  getLoggedinUser,
  getFilteredDishes,
  getOrderHistory,
  getUserOrder,
  getUserCart,
  getUserDiscounts,
  userOrderPayment,
  removeDishFromCart,
  editUserCompany,
  editUserDetails,
  editUserPassword,
  addToCart,
  register,
  deleteProfile,
};
