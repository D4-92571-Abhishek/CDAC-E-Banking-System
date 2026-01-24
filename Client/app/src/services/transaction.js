import axios from "./axios";

export const getActiveCustomers = () => {
  return axios.get("/customers/active-customers");
};


export const getCustomerTransactions = (userId) => {
  return axios.get(`/customers/transactions/${userId}`);
};
