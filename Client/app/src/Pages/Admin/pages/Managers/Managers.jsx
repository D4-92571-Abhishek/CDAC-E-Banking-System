import React from 'react'

const Managers = () => {
  return (
      <div className='w-100'>
          <div className="navbar navbar-expand-lg bg-body-tertiary px-2">

              <span className='fs-5'>Managers</span>
          </div>

          <div className='container'>
              <div className='px-3 pt-3 d-flex justify-content-between'>
                <div>
                  <p className='fs-4 fw-bold mt-2 mb-0'>Manager Management</p>
                  <p className='text-muted'>Manager bank staff and their profiles</p>
                  </div>
                  <div className='px-3 pt-3'>
                      <button className='btn btn-dark' data-bs-toggle="modal" data-bs-target="#exampleModal">Add Manager</button>
                

                      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div className="modal-dialog d-flex align-items-center h-100 mt-0">
                              <div className="modal-content ">
                                  <div className="modal-header">
                                      <h1 className="modal-title fs-5" id="exampleModalLabel">Create Manager Profile</h1>
                                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>
                                  <div className="modal-body">
                                      <div class="mb-3">
                                          <label for="exampleFormControlInput1" class="form-label">Full Name</label>
                                          <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Full Name" />
                                      </div>
                                      <div class="mb-3">
                                          <label for="exampleFormControlInput1" class="form-label">E-mail</label>
                                          <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                                      </div>
                                      <div class="mb-3">
                                          <label for="exampleFormControlInput1" class="form-label">Employee ID</label>
                                          <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Employee ID" />
                                      </div>
                                      <div class="mb-3">
                                          <label for="exampleFormControlInput1" class="form-label">Employee Phone Number</label>
                                          <div class="input-group input-group-sm mb-3">
                                              <span class="input-group-text" id="inputGroup-sizing-sm">+91-</span>
                                              <input type="tel" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                                          </div>
                                      </div>
                                      
                                  </div>
                                  <div className="modal-footer">
                                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                      <button type="button" className="btn btn-dark">Add Manager</button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className='row mt-4 px-3'>
                  <div className='col mb-3'>
                      <div className="card" style={{ "height": "180px" }}>
                          <div className="card-body mh-100 d-flex flex-column justify-content-between" style={{ "height": "200px" }}>
                              <h5 className="card-title fs-3">Total Managers</h5>
                              <div>
                                  <h3 className="card-text fs-3">4</h3>
                                  <h6 className="card-subtitle text-body-secondary fs-6">Active Bank Managers</h6>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              <div>
                  <div className='px-3 pt-3'>
                      <p className='fs-4 fw-bold mt-2 mb-0'>Manager Profiles</p>
                      <p className='text-muted'>View and manage all Bank Manager Profiles</p>
                  </div>
                  <div className='d-flex px-3 pt-3'>
                      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                  </div>
                  <div className='px-3'>
                      <table className="table table-hover border border-grey mt-3">
                          <thead>
                              <tr>
                                  <th scope="col">Manager</th>
                                  <th scope="col">Employee ID</th>
                                  <th scope="col">Hire Date</th>
                                  <th scope="col">Actions</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td>Shubhang Tiwari</td>
                                  <td>Mark</td>
                                  <td>Otto</td>
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

export default Managers
