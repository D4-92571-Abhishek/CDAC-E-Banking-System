import axios from "./axios";

export const createCustomer = (data) => {
  return axios.post("/manager/create-customer", data);
};


// fetch pending (DEACTIVATED) customers
export const getPendingCustomers = () =>
  axios.get("/manager/pending");

// verify customer
export const verifyCustomer = (userId) =>
  axios.put(`/manager/verify-customer/${userId}`);

// verify address
export const verifyAddress = (userId) =>
  axios.put(`/manager/verify-address/${userId}`);

// approve customer
export const approveCustomer = (userId) =>
  axios.put(`/manager/approve/${userId}`);

// reject customer
export const rejectCustomer = (userId) =>
  axios.put(`/manager/reject/${userId}`);