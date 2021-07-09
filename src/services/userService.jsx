import http from "./httpServices";

const apiEndPoint = "/user";

const getDishesForUser = async () => {
  const { data: dishes } = await http.get(`${apiEndPoint}/dishes`);
  return dishes.dishesArray;
};

export { getDishesForUser };
