import  { useEffect, useState } from 'react'
import axios from 'axios';

const Customers = () => {

    const[responseData, setResponseData] = useState();
    const[customersListData, setCustomersListData] = useState([]);

    const customersDataInfo = async () => {
        const response = await axios.get('http://localhost:8080/bankify/admin/adminCustomerInfo',{headers: {Authorization: `Bearer ${sessionStorage.getItem("token")}`}});
        setResponseData(response.data);
    }

    const customersList = async () => {
        const response = await axios.get('http://localhost:8080/bankify/admin/adminCustomerList',{headers: {Authorization: `Bearer ${sessionStorage.getItem("token")}`}});
        setCustomersListData(response.data);
    }

    useEffect(() => {
        customersDataInfo();
        customersList();
    }, []);

    console.log(customersListData);

    

    return (
        <div className="w-100"
            style={{
                marginLeft: "300px",
                minHeight: "100vh",
                overflowY: "auto"
            }}>
            <div className="navbar navbar-expand-lg bg-body-tertiary px-2">

                <span className='fs-5'>Customers</span>
            </div>

            <div className='container'>
                <div className='px-3 pt-3'>
                    <p className='fs-4 fw-bold mt-2 mb-0'>Customers Management</p>
                    <p className='text-muted'>Manage all customers accounts and view their details</p>
                </div>
                <div className='row mt-4 px-3'>
                    <div className='col-4 mb-3'>
                        <div className="card" style={{ "height": "180px" }}>
                            <div className="card-body mh-100 d-flex flex-column justify-content-between" style={{ "height": "200px" }}>
                                <h5 className="card-title fs-3">Total Customers</h5>
                                <div>
                                    <h3 className="card-text fs-3">{responseData?.totalCustomers}</h3>
                                    <h6 className="card-subtitle text-body-secondary fs-6">Active Accounts</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-4 mb-3'>
                        <div className="card" style={{ "height": "180px" }}>
                            <div className="card-body mh-100 d-flex flex-column justify-content-between" style={{ "height": "200px" }}>
                                <h5 className="card-title fs-3">Total Balance</h5>
                                <div>
                                    <h3 className="card-text fs-3">₹ {responseData?.totalBalance}</h3>
                                    <h6 className="card-subtitle text-body-secondary fs-6">Combined Customer funds</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-4 mb-3'>
                        <div className="card" style={{ "height": "180px" }}>
                            <div className="card-body mh-100 d-flex flex-column justify-content-between" style={{ "height": "200px" }}>
                                <h5 className="card-title fs-3">Average Balance</h5>
                                <div>
                                    <h3 className="card-text fs-3">₹ {responseData?.averageBalance?.toFixed(2)}</h3>
                                    <h6 className="card-subtitle text-body-secondary fs-6">Per Customer Account</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='px-3 pt-3'>
                        <p className='fs-4 fw-bold mt-2 mb-0'>Customers Lists</p>
                        <p className='text-muted'>View and manage all customer accounts</p>
                    </div>
                    <div className='d-flex px-3 pt-3'>
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <span>
                            <select className="form-select" aria-label="Default select example">
                                <option selected>All Status</option>
                                <option value="1">Active</option>
                                <option value="2">Inactive</option>
                                <option value="3">Suspended</option>
                            </select>
                        </span>
                    </div>
                    <div className='px-3'>
                        <table className="table table-hover border border-grey mt-3">
                            <thead>
                                <tr>
                                    <th scope="col">Customers</th>
                                    <th scope="col">Account Number</th>
                                    <th scope="col">Balance</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Join Date</th>
                                    <th scope="col">Last Transaction</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customersListData.map((customer, index) => (
                                    <tr key={index}>
                                        <td>{customer.customerName}</td>
                                        <td>{customer.accountNumber}</td>
                                        <td>{customer.balance}</td>
                                        <td>{customer.status}</td>
                                        <td>{customer.joinDate}</td>
                                        <td>{customer.lastTransactionTime}</td>
                                        <td><button className="btn btn-warning">View</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Customers
