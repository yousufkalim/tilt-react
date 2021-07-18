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

export {
  getDishesForUser,
  getLoggedinUser,
  getFilteredDishes,
  getOrderHistory,
};
