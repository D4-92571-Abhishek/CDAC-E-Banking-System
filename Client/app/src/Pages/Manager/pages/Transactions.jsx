import Header from '../components/Header'
import StatsCards from '../components/StatsCards'

export default function Transactions() {
  return (
    <div className="content">
      <Header />
      <h5>Dashboard Overview</h5>
      <StatsCards />
      <div className="card p-4">
        <h5>Recent Transactions</h5>
        <small>Monitor and review all banking transactions</small>

        <table className="table mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Account</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Timestamp</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>TXN001</td>
              <td>ACC-4789</td>
              <td><span className="badge bg-warning">Withdraw</span></td>
              <td>₹25,000</td>
              <td><span className="status-badge completed">Completed</span></td>
              <td>2024-01-15 10:30</td>
            </tr>

            <tr>
              <td>TXN002</td>
              <td>ACC-5678</td>
              <td><span className="badge bg-success">Deposit</span></td>
              <td>₹50,000</td>
              <td><span className="status-badge completed">Completed</span></td>
              <td>2024-01-15 09:15</td>
            </tr>

            <tr>
              <td>TXN003</td>
              <td>ACC-4567</td>
              <td><span className="badge bg-warning">Withdraw</span></td>
              <td>₹12,000</td>
              <td><span className="status-badge completed">Completed</span></td>
              <td>2024-01-15 08:45</td>
            </tr>

            <tr>
              <td>TXN004</td>
              <td>ACC-2345</td>
              <td><span className="badge bg-success">Deposit</span></td>
              <td>₹85,000</td>
              <td><span className="status-badge pending">Pending</span></td>
              <td>2024-01-15 08:20</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
