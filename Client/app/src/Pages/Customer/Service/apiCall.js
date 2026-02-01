import axios from "axios";

const customerDetails = async () => {
  const data = await axios.get(
    `http://localhost:8080/bankify/customers/get-customer/${sessionStorage.getItem("userId")}`,
    {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
    },
  );

  return data;
};

const customerDetailsEdit = async (body) => {
  const responseEdit = await axios.put(
    `http://localhost:8080/bankify/customers/edit-customer/${sessionStorage.getItem("userId")}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    },
  );
  return responseEdit;
};



export { customerDetails, customerDetailsEdit };
