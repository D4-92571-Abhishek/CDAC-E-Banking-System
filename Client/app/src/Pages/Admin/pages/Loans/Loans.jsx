import React from 'react'

const Loans = () => {
  return (
      <div className='w-100'>
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
                      <div class="card" style={{ "height": "180px" }}>
                          <div class="card-body mh-100 d-flex flex-column justify-content-between" style={{ "height": "200px" }}>
                              <h5 class="card-title fs-4">Total Loans</h5>
                              <div>
                                  <h3 class="card-text fs-3">12</h3>
                                  <h6 class="card-subtitle text-body-secondary fs-6">Active Loan Accounts</h6>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className='col-3 mb-3'>
                      <div class="card" style={{ "height": "180px" }}>
                          <div class="card-body mh-100 d-flex flex-column justify-content-between" style={{ "height": "200px" }}>
                              <h5 class="card-title fs-4">Outstanding Balance</h5>
                              <div>
                                  <h3 class="card-text fs-4">3,12,456</h3>
                                  <h6 class="card-subtitle text-body-secondary fs-6">Total Remaining Debt</h6>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className='col-3 mb-3'>
                      <div class="card" style={{ "height": "180px" }}>
                          <div class="card-body mh-100 d-flex flex-column justify-content-between" style={{ "height": "200px" }}>
                              <h5 class="card-title fs-4">Overdue Loan Accounts</h5>
                              <div>
                                  <h3 class="card-text fs-3">3</h3>
                                  <h6 class="card-subtitle text-body-secondary fs-6">Require Immediate Action</h6>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className='col-3 mb-3'>
                      <div class="card" style={{ "height": "180px" }}>
                          <div class="card-body mh-100 d-flex flex-column justify-content-between" style={{ "height": "200px" }}>
                              <h5 class="card-title fs-4">Average Interest Rate</h5>
                              <div>
                                  <h3 class="card-text fs-3">6.6 %</h3>
                                  <h6 class="card-subtitle text-body-secondary fs-6">Portfolio Average</h6>
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
                      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                      <span>
                          <select class="form-select" aria-label="Default select example">
                              <option selected>All Status</option>
                              <option value="1">Current</option>
                              <option value="2">Overdue</option>
                              <option value="3">Default</option>
                              <option value="3">Paid Off</option>
                          </select>
                      </span>
                  </div>
                  <div className='px-3'>
                      <table class="table table-hover border border-grey mt-3">
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
                              <tr>
                                  <td>Abhishek Patel</td>
                                  <td>Mark</td>
                                  <td>Otto</td>
                                  <td>@mdo</td>
                                  <td>@mdo</td>
                                  <td>@mdo</td>
                                  <td>@mdo</td>
                                  <td>@mdo</td>
                                  <td>@mdo</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>

              </div>
          </div>
      </div>
  )
}

export default Loans
