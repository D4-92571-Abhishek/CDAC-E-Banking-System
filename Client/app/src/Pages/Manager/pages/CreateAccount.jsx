import Header from '../components/Header'
import StatsCards from '../components/StatsCards'

export default function CreateAccount() {
  return (
    <div className="content">
      <Header />
      <h5>Dashboard Overview</h5>
      <StatsCards />
      <div className="card p-4">
        <h5>Create New Account</h5>
        <small>Create a new customer account with complete KYC</small>

        <hr />

        <h6>Personal Information</h6>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label>Full Name</label>
            <input className="form-control" placeholder="Full Name" />
          </div>

          <div className="col-md-4 mb-3">
            <label>Father’s Name</label>
            <input className="form-control" />
          </div>

          <div className="col-md-4 mb-3">
            <label>Date of Birth</label>
            <input type="date" className="form-control" />
          </div>

          <div className="col-md-4 mb-3">
            <label>Gender</label>
            <select className="form-select">
              <option>Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <div className="col-md-4 mb-3">
            <label>Mobile Number</label>
            <input className="form-control" />
          </div>
        </div>

        <h6>Contact & Identity</h6>
        <div className="row">
          <div className="col-md-4">
            <label>Email</label>
            <input className="form-control" />
          </div>
          <div className="col-md-4">
            <label>Aadhar Number</label>
            <input className="form-control" />
          </div>
          <div className="col-md-4">
            <label>Pan Number</label>
            <input className="form-control" />
          </div>
        </div>

        <h6 className="mt-3">Address</h6>
        <div className="row">
          <div className="col-md-12 mb-2">
            <label>Complete Address</label>
            <input className="form-control" />
          </div>

          <div className="col-md-4">
            <label>City</label>
            <input className="form-control" />
          </div>
          <div className="col-md-4">
            <label>State</label>
            <input className="form-control" />
          </div>
          <div className="col-md-4">
            <label>Pin Code</label>
            <input className="form-control" />
          </div>
        </div>

        <div className="mt-4 text-end">
          <button className="btn btn-secondary">Reset</button>
          <button className="btn btn-dark ms-2">Create Account</button>
        </div>
      </div>
    </div>
  )
}
