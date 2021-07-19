import http from "./httpServices";

const apiEndPoint = "/user";

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

export {
  getDishesForUser,
  getLoggedinUser,
  getFilteredDishes,
  getOrderHistory,
  getUserCart,
  addToCart,
};
