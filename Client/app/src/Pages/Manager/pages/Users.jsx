//import Header from '../components/Header'
//import StatsCards from '../components/StatsCards'

export default function Users() {
  return (
    <div className="content">
      <h5>Dashboard Overview</h5>
      {/* <StatsCards /> */}
      <div className="card p-4">
        <h5>User Management</h5>
        <small>Manage customer accounts and permissions</small>

        <table className="table mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Balance</th>
              <th>Join Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Arjun Sharma</td>
              <td><span className="status-badge active">Active</span></td>
              <td>₹45,300</td>
              <td>2023-03-15</td>
            </tr>

            <tr>
              <td>Priya Patel</td>
              <td><span className="status-badge active">Active</span></td>
              <td>₹1,84,500</td>
              <td>2023-07-22</td>
            </tr>

            <tr>
              <td>Rohit Gupta</td>
              <td><span className="status-badge suspended">Suspended</span></td>
              <td>₹23,400</td>
              <td>2023-11-08</td>
            </tr>

            <tr>
              <td>Kavya Singh</td>
              <td><span className="status-badge pending">Pending</span></td>
              <td>₹0</td>
              <td>2024-01-14</td>
            </tr>

            <tr>
              <td>Vikram Reddy</td>
              <td><span className="status-badge active">Active</span></td>
              <td>₹76,900</td>
              <td>2022-12-03</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
