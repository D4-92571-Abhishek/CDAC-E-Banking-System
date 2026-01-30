import { useEffect, useState } from "react";
import { Services } from './../../Public/Services';
import { getDashboardStats } from "../../../services/dashboard";

export default function StatsCards() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getDashboardStats().then((res) => setStats(res.data));
  }, []);

  if (!stats) return <p className="text-center py-5">Loading stats...</p>;

  const cardData = [
    {
      title: "Total Accounts",
      value: stats.totalAccounts,
      subtitle: "Live data",
      color: "bg-primary",
    },
    {
      title: "Daily Transactions",
      value: stats.dailyTransactions,
      subtitle: "Today",
      color: "bg-success",
    },
    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue}`,
      subtitle: "Overall",
      color: "bg-warning text-dark",
    },
  ];

  return (
    <div className="row g-3 mb-4">
      {cardData.map((card, idx) => (
        <div key={idx} className="col-md-4">
          <div className={`card shadow-sm border-0 ${card.color} text-white p-4 h-100`}>
            <h6 className="mb-2">{card.title}</h6>
            <h3 className="fw-bold">{card.value}</h3>
            <small className="opacity-75">{card.subtitle}</small>
          </div>
        </div>
      ))}
    </div>
  );
}
