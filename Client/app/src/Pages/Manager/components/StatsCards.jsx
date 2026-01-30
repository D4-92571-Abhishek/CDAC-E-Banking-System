import { useEffect, useState, memo } from "react";
import { getDashboardStats } from "../../../services/dashboard";

function StatsCards() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getDashboardStats().then((res) => setStats(res.data));
  }, []);

  if (!stats) return null; // prevents loading flash

  return (
    <div className="row mb-4">
      <div className="col-md-4">
        <div className="card p-3">
          <h6>Total Accounts</h6>
          <h4>{stats.totalAccounts}</h4>
          <small className="text-success">Live data</small>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card p-3">
          <h6>Daily Transactions</h6>
          <h4>{stats.dailyTransactions}</h4>
          <small className="text-success">Today</small>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card p-3">
          <h6>Total Revenue</h6>
          <h4>₹{stats.totalRevenue}</h4>
          <small className="text-success">Overall</small>
        </div>
      </div>
    </div>
  );
}

export default memo(StatsCards);


