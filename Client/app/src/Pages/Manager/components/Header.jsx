export default function Header() {
  return (
    <div className="header-box d-flex justify-content-between align-items-center">
      <div>
        <h6>Rajesh Kumar Singh</h6>
        <small>Manager ID: MGR001</small><br/>
        <small>Branch: Delhi Central Branch</small>
      </div>
      <div className="text-end">
        📞 +91 98765 43210<br/>
        ✉️ rajesh.singh@bankify.in
      </div>
    </div>
  )
}
