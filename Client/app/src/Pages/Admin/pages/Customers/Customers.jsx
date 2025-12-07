import React from 'react'

const Customers = () => {
    return (
        <div className='w-100'>
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
                        <div class="card" style={{ "height": "180px" }}>
                            <div class="card-body mh-100 d-flex flex-column justify-content-between" style={{ "height": "200px" }}>
                                <h5 class="card-title fs-3">Total Customers</h5>
                                <div>
                                    <h3 class="card-text fs-3">1200</h3>
                                    <h6 class="card-subtitle text-body-secondary fs-6">1200 Active Accounts</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-4 mb-3'>
                        <div class="card" style={{ "height": "180px" }}>
                            <div class="card-body mh-100 d-flex flex-column justify-content-between" style={{ "height": "200px" }}>
                                <h5 class="card-title fs-3">Total Balance</h5>
                                <div>
                                    <h3 class="card-text fs-3">3,12,456</h3>
                                    <h6 class="card-subtitle text-body-secondary fs-6">Combined Customer funds</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-4 mb-3'>
                        <div class="card" style={{ "height": "180px" }}>
                            <div class="card-body mh-100 d-flex flex-column justify-content-between" style={{ "height": "200px" }}>
                                <h5 class="card-title fs-3">Average Balance</h5>
                                <div>
                                    <h3 class="card-text fs-3">18,456</h3>
                                    <h6 class="card-subtitle text-body-secondary fs-6">Per Customer Account</h6>
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
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <span>
                            <select class="form-select" aria-label="Default select example">
                                <option selected>All Status</option>
                                <option value="1">Active</option>
                                <option value="2">Inactive</option>
                                <option value="3">Suspended</option>
                            </select>
                        </span>
                    </div>
                    <div className='px-3'>
                        <table class="table table-hover border border-grey mt-3">
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
                                <tr>
                                    <td>Abhishek Patel</td> 
                                    <td>Mark</td>
                                    <td>Otto</td>
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

export default Customers
