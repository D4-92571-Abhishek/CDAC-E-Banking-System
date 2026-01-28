import axios from "./axios";

export const getActiveCustomers = () => {
  return axios.get("/manager/active-customers");
};


export const getCustomerTransactions = (userId) => {
  return axios.get(`/manager/transactions/${userId}`);
};
