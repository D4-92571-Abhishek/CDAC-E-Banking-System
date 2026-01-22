import Header from "../components/Header";
import StatsCards from "../components/StatsCards";


export default function ApproveReject() {
  return (
    <div className="content">
      <Header />
      <h5>Dashboard Overview</h5>
      <StatsCards />

      <div className="card p-4">
        <h6>Account Approval & Rejection</h6>

        <table className="table mt-3">
          <thead>
            <tr>
              <th>Application No</th>
              <th>Customer</th>
              <th>Deposit</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>BBA202401</td>
              <td>Priya Sharma</td>
              <td>₹5,000</td>
              <td><span className="status-badge pending">KYC Pending</span></td>
              <td>2024-01-15</td>
              <td>
                <button className="btn btn-sm btn-success">Approve</button>
                <button className="btn btn-sm btn-danger ms-2">Reject</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
