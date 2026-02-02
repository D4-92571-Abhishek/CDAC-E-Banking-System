import axios from "./axios";

export const fetchPendingLoans = async () => {
  const response = await axios.get("/manager/loan/pending");
  return response.data;
};

export const approveLoan = async (loanId) => {
  return axios.put(`/manager/loan/approve/${loanId}`);
};

export const rejectLoan = async (loanId) => {
  return axios.put(`/manager/loan/reject/${loanId}`);
};