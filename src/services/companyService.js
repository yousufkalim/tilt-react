import http from "./httpServices";

const apiEndPoint = "/admin";

const getAllCompanies = async () => {
  const { data } = await http.get(`${apiEndPoint}/company`);
  return data.companies;
};

export { getAllCompanies };
