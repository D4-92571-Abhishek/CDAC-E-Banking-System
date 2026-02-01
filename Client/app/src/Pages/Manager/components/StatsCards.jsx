import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/dashboard";

export default function StatsCards() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getDashboardStats().then((res) => setStats(res.data));
  }, []);

  if (!stats) {
    return <p className="text-center py-4 text-muted">Loading stats...</p>;
  }

  const cardData = [
    {
      title: "Total Accounts",
      value: stats.totalAccounts,
      subtitle: "Live data",
    },
    {
      title: "Daily Transactions",
      value: stats.dailyTransactions,
      subtitle: "Today",
    },
    {
      title: "Total Revenue",
      value: `₹ ${stats.totalRevenue}`,
      subtitle: "Overall",
    },
  ];

  return (
    <div className="row g-3 mb-4">
      {cardData.map((card, idx) => (
        <div key={idx} className="col-md-4">
          <div className="card border shadow-sm h-100">
            <div className="card-body">
              <h6 className="text-muted mb-1">{card.title}</h6>
              <h3 className="fw-bold mb-0">{card.value}</h3>
              <small className="text-muted">{card.subtitle}</small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
