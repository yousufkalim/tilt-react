import http from "./httpServices";

const apiEndPoint = "/dish";

const getAllByRestaurantById = async (body) => {
  const { data } = await http.post(
    `${apiEndPoint}/getAllByRestaurantById`,
    body
  );
  return data;
};

export { getAllByRestaurantById };
