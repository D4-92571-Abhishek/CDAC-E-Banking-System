export default function StatsCards() {
  return (
    <div className="row mb-4">
      {[
        { title: "Total Accounts", value: "-", change: "" },
        { title: "Daily Transactions", value: "-", change: "" },
        { title: "Total Revenue", value: "-", change: "" },
      ].map((item, i) => (
        <div className="col-md-4" key={i}>
          <div className="card p-3">
            <h6>{item.title}</h6>
            <h4>{item.value}</h4>
            <small className="text-success">{item.change} from last month</small>
          </div>
        </div>
      ))}
    </div>
  )
}
