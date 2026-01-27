import { useEffect, useState } from 'react'
import axios from 'axios';

const Loans = () => {

    const[responseData, setResponseData] = useState();
    const[loansListData, setLoansListData] = useState([]);

    const loanDataInfo = async () => {
        const response = await axios.get('http://localhost:8080/bankify/admin/adminLoanInfo',{headers: {Authorization: `Bearer ${sessionStorage.getItem("token")}`}});
        setResponseData(response.data);
    };

    const loansList = async () => {
        const response = await axios.get('http://localhost:8080/bankify/admin/adminLoanList',{headers: {Authorization: `Bearer ${sessionStorage.getItem("token")}`}});
        setLoansListData(response.data);
    }

    useEffect(() => {
        loanDataInfo();
        loansList();
    }, []);

    console.log(loansListData);

  return (
      <div className="w-100"
          style={{
              marginLeft: "300px",
              minHeight: "100vh",
              overflowY: "auto"
          }}>
          <div className="navbar navbar-expand-lg bg-body-tertiary px-2">

              <span className='fs-5'>Loan Accounts</span>
          </div>

          <div className='container'>
              <div className='px-3 pt-3'>
                  <p className='fs-4 fw-bold mt-2 mb-0'>Loan Account Management</p>
                  <p className='text-muted'>Monitor and manage all loan accounts and their payment status</p>
              </div>
              <div className='row mt-4 px-3'>
                  <div className='col-3 mb-3'>
                      <div className="card" style={{ "height": "180px" }}>
                          <div className="card-body mh-100 d-flex flex-column justify-content-between" style={{ "height": "200px" }}>
                              <h5 className="card-title fs-4">Total Loans</h5>
                              <div>
                                  <h3 className="card-text fs-3">{responseData?.totalLoanAccounts }</h3>
                                  <h6 className="card-subtitle text-body-secondary fs-6">Active Loan Accounts</h6>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className='col-3 mb-3'>
                      <div className="card" style={{ "height": "180px" }}>
                          <div className="card-body mh-100 d-flex flex-column justify-content-between" style={{ "height": "200px" }}>
                              <h5 className="card-title fs-4">Outstanding Balance</h5>
                              <div>
                                  <h3 className="card-text fs-4">{responseData?.outstandingBalance}</h3>
                                  <h6 className="card-subtitle text-body-secondary fs-6">Total Remaining Debt</h6>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className='col-3 mb-3'>
                      <div className="card" style={{ "height": "180px" }}>
                          <div className="card-body mh-100 d-flex flex-column justify-content-between" style={{ "height": "200px" }}>
                              <h5 className="card-title fs-4">Overdue Loan Accounts</h5>
                              <div>
                                  <h3 className="card-text fs-3">{responseData?.overdueLoanAccounts}</h3>
                                  <h6 className="card-subtitle text-body-secondary fs-6">Require Immediate Action</h6>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className='col-3 mb-3'>
                      <div className="card" style={{ "height": "180px" }}>
                          <div className="card-body mh-100 d-flex flex-column justify-content-between" style={{ "height": "200px" }}>
                              <h5 className="card-title fs-4">Average Interest Rate</h5>
                              <div>
                                  <h3 className="card-text fs-3">{responseData?.averageInterest }</h3>
                                  <h6 className="card-subtitle text-body-secondary fs-6">Portfolio Average</h6>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div>
                  <div className='px-3 pt-3'>
                      <p className='fs-4 fw-bold mt-2 mb-0'>Loan Accounts</p>
                      <p className='text-muted'>View and manage all customer loan accounts</p>
                  </div>
                  <div className='d-flex px-3 pt-3'>
                      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                      <span>
                          <select className="form-select" aria-label="Default select example">
                              <option selected>All Status</option>
                              <option value="1">Current</option>
                              <option value="2">Overdue</option>
                              <option value="3">Default</option>
                              <option value="3">Paid Off</option>
                          </select>
                      </span>
                  </div>
                  <div className='px-3'>
                      <table className="table table-hover border border-grey mt-3">
                          <thead>
                              <tr>
                                  <th scope="col">Customer</th>
                                  <th scope="col">Loan Type</th>
                                  <th scope="col">Principle</th>
                                  <th scope="col">Remaining</th>
                                  <th scope="col">Rate</th>
                                  <th scope="col">Progress</th>
                                  <th scope="col">Payment</th>
                                  <th scope="col">Status</th>
                                  <th scope="col">Next Due</th>
                              </tr>
                          </thead>
                          <tbody>
                                {loansListData.map((loan,index) => (
                                    <tr key={index}>
                                        <td>{loan.customerName}</td>
                                        <td>{loan.loanType}</td>
                                        <td>{loan.principle}</td>
                                        <td>{-loan.remaining}</td>
                                        <td>{loan.rate}%</td>
                                        <td><div className="progress">
                                            <div className="progress-bar bg-dark" role="progressbar" style={{width: `${((-loan.remaining)/loan.principle)*100}%`}}></div>
                                        </div></td>
                                        <td>{loan.payment}</td>
                                        <td>{loan.status}</td>
                                        <td>{loan.nextDue}</td>
                                    </tr>))}
                          </tbody>
                      </table>
                  </div>

              </div>
          </div>
      </div>
  )
}

export default Loans
