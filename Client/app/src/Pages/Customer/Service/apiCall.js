import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// console.log(API_BASE_URL)

const userId = sessionStorage.getItem("userId");
const token = sessionStorage.getItem("token");

const customerDetails = async () => {
  const data = await axios.get(
    `${API_BASE_URL}/customers/get-customer/${sessionStorage.getItem("userId")}`,
    {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
    },
  );

  return data;
};

const customerDetailsEdit = async (body) => {
  const responseEdit = await axios.put(
    `${API_BASE_URL}/customers/edit-customer/${sessionStorage.getItem("userId")}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    },
  );
  return responseEdit;
};

const updatePasswordApi = async (body) => {
  console.log(body);
  const responseData = await axios.put(
    `${API_BASE_URL}/customers/update-password/${sessionStorage.getItem("userId")}`,
    body,
    {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
    },
  );
  return responseData;
};

const fetchTransactionSanpleData = async () => {
  const data = await axios.get(
    `${API_BASE_URL}/customers/get-transaction-details/${sessionStorage.getItem("userId")}`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    },
  );
  return data;
};

const fetchTransactionHistory = async () => {
  const data = await axios.get(
    `${API_BASE_URL}/customers/transactions/${sessionStorage.getItem("userId")}`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    },
  );
  return data;
};

const fetchCustomerSampleDetails = async () => {
  const data = await axios.get(
    `${API_BASE_URL}/customers/${sessionStorage.getItem("userId")}`,
    { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` } },
  );
  return data;
};

const customerAccountDetails = async () => {
  const data = await axios.get(
    `${API_BASE_URL}/customers/get-account-nos/${sessionStorage.getItem("userId")}`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    },
  );
  return data;
};

const customerSendOtp = async (body) => {
  const response = await axios.post(
    `${API_BASE_URL}/customers/transfer/send-otp/${sessionStorage.getItem("userId")}`,
    body,
    {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
    },
  );
  return response;
};

const customerValidateOtpApi = async (body) => {
  const response = await axios.post(
    `${API_BASE_URL}/customers/transfer/validate-otp/${sessionStorage.getItem("userId")}`,
    body,
    {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
    },
  );
  return response;
};

const fetchTransferHistoryDebited = async () => {
  const data = await axios.get(
    `${API_BASE_URL}/customers/transaction-history-debited/${sessionStorage.getItem("userId")}`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    },
  );
  return data;
};

const cancelFundstransferApi = async (body) => {
  const response = await axios.post(
    `${API_BASE_URL}/customers/transfer/validate-otp/${sessionStorage.getItem("userId")}`,
    body,
    {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
    },
  );

  return response;
};

const requestNewLoanApi = async (body) => {
  const response = await axios.post(
    `${API_BASE_URL}/customers/loan/request-new-loan/${sessionStorage.getItem("userId")}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    },
  );
  return response;
};

const fetchAllLoansApi = async () => {
  const data = await axios.get(
    `${API_BASE_URL}/customers/loan/all-loans/${sessionStorage.getItem("userId")}`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    },
  );
  return data;
};

const payLoanEmi = async (loanId) => {
  const data = await axios.get(
    `${API_BASE_URL}/customers/loan/pay-loan-amount/${sessionStorage.getItem("userId")}/${loanId}`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    },
  );

  return data;
};

const addFundsToAccount = async(incomingAmount) =>{
   const data = await axios.post(
    `${API_BASE_URL}/customers/add-funds/${sessionStorage.getItem("userId")}`,{amount:incomingAmount},
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    },
  );

  return data;
}

export {
  customerDetails,
  customerDetailsEdit,
  updatePasswordApi,
  fetchTransactionSanpleData,
  fetchTransactionHistory,
  fetchCustomerSampleDetails,
  customerAccountDetails,
  customerSendOtp,
  customerValidateOtpApi,
  fetchTransferHistoryDebited,
  cancelFundstransferApi,
  fetchAllLoansApi,
  requestNewLoanApi,
  payLoanEmi,
  addFundsToAccount
};
