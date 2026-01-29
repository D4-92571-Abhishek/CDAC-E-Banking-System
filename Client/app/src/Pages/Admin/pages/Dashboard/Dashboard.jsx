import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Dashboard = () => {

    const [responseData, setResponseData] = useState();
    const dashboardData = async () => {
        const response = await axios.get('http://localhost:8080/bankify/admin/adminDashboard',{headers: {Authorization: `Bearer ${sessionStorage.getItem("token")}`}});
        setResponseData(response.data);
    }

    useEffect(() => {
        dashboardData();
    }, []);

    // console.log(responseData);

    return (

        <div className="w-100"
            style={{
                marginLeft: "300px",
                minHeight: "100vh",
                overflowY: "auto"
            }}>
            <div className="navbar navbar-expand-lg bg-body-tertiary px-2">
                
                    <span className='fs-5'>Dashboard</span>
                
            </div>

            <div className='container'>

            <div className='px-3 pt-3'>
                <p className='fs-4 fw-bold mt-2 mb-0'>Dashboard Overview</p>
                <p className='text-muted'>Welcome to the Bankify Admin Management Portal</p>
            </div>
            <div className='row mt-4 px-3'>
                <div className='col-4 mb-3'>
                        <div className="card" style={{"height": "180px"}}>
                            <div className="card-body mh-100 d-flex flex-column justify-content-between" style={{ "height": "200px" }}>
                                <h5 className="card-title fs-3">Total Customers</h5>
                                <div>
                                <h3 className="card-text fs-3">{responseData?.totalCustomers}</h3>
                                <h6 className="card-subtitle text-body-secondary fs-6">Active Customer Accounts</h6>
                                </div>
                                
                            </div>
                        </div>
                </div>
                <div className='col-4 mb-3'>
                        <div className="card" style={{"height": "180px"}}>
                            <div className="card-body mh-100 d-flex flex-column justify-content-between" style={{ "height": "200px" }}>
                                <h5 className="card-title fs-3">Total Bank Assets</h5>
                                <div>
                                <h3 className="card-text fs-3">{responseData?.totalBankAssets}</h3>
                                <h6 className="card-subtitle text-body-secondary fs-6">Combined Customer Deposits</h6>
                                </div>
                                
                            </div>
                        </div>
                </div>
                <div className='col-4 mb-3'>
                        <div className="card" style={{"height": "180px"}}>
                            <div className="card-body mh-100 d-flex flex-column justify-content-between" style={{ "height": "200px" }}>
                                <h5 className="card-title fs-3">Monthly Cash Flow</h5>
                                <div>
                                <h3 className="card-text fs-3">{responseData?.monthlyCashFlow}</h3>
                                <h6 className="card-subtitle text-body-secondary fs-6">Rise from Last Month</h6>
                                </div>  
                            </div>
                        </div>
                </div>

                <div className='col-4 mb-3'>
                        <div className="card" style={{"height": "180px"}}>
                            <div className="card-body mh-100 d-flex flex-column justify-content-between" style={{ "height": "200px" }}>
                                <h5 className="card-title fs-3">Active Bank Managers</h5>
                                <div>
                                <h3 className="card-text fs-3">{responseData?.activeBankManagers}</h3>
                                <h6 className="card-subtitle text-body-secondary fs-6">Active Bank Managers</h6>
                                </div>   
                            </div>
                        </div>
                </div>
                <div className='col-4 mb-3'>
                        <div className="card" style={{"height": "180px"}}>
                            <div className="card-body mh-100 d-flex flex-column justify-content-between" style={{ "height": "200px" }}>
                                <h5 className="card-title fs-3">Outstanding Loans</h5>
                                <div>
                                <h3 className="card-text fs-3">{responseData?.outstandingLoans}</h3>
                                <h6 className="card-subtitle text-body-secondary fs-6">Active Loan Accounts</h6>
                                </div>
                            </div>
                        </div>
                </div>
                <div className='col-4 mb-3'>
                        <div className="card" style={{"height": "180px"}}>
                            <div className="card-body mh-100 d-flex flex-column justify-content-between" style={{ "height": "200px" }}>
                                <h5 className="card-title fs-3">Performance</h5>
                                <div>
                                <h3 className="card-text fs-3">{responseData?.performance}</h3>
                                <h6 className="card-subtitle text-body-secondary fs-6">All System Operational</h6>
                                </div>
                                
                            </div>
                        </div>
                </div>
            </div>

            </div>
        </div>

    )
}

export default Dashboard
