import  { useEffect, useState } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'



const Managers = () => {

    const [responseData, setResponseData] = useState();
    const [managersListData, setManagersListData] = useState([]);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        dob: "",
        phone: ""
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [showData, setShowData] = useState();

    const managersDataInfo = async () => {
        const response = await axios.get('http://localhost:8080/bankify/admin/adminActiveManagers',{headers: {Authorization: `Bearer ${sessionStorage.getItem("token")}`}});
        setResponseData(response.data);
    };

    const managersList = async () => {
        const response = await axios.get('http://localhost:8080/bankify/admin/adminManagerList',{headers: {Authorization: `Bearer ${sessionStorage.getItem("token")}`}});
        setManagersListData(response.data);
        setShowData(response.data);
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const addManager = async () => {
        console.log(formData)
        try {
            await axios.post(
                "http://localhost:8080/bankify/admin/adminAddManager",
                {
                    name: formData.fullName,
                    email: formData.email,
                    dob: formData.dob,
                    contactNo: formData.phone
                },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            managersList();
            managersDataInfo();

            setFormData({
                fullName: "",
                email: "",
                dob: "",
                phone: ""
            });

            alert("Manager Added Successfully!");

            // const modal = window.bootstrap.Modal.getInstance(
            //     document.getElementById("exampleModal")
            // );
            // modal.hide();

        } catch (err) {
            console.error("Add Manager Failed:", err);
            alert("Failed to add manager. Check console.");
        }
    };

    const onDeactivate = async (employeeId) => {
        try {
            await axios.put(
                `http://localhost:8080/bankify/admin/adminDeactivateManager/${employeeId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            managersList();
            managersDataInfo();

        } catch (err) {
            console.error("Deactivate Manager Failed:", err);
            alert("Failed to deactivate manager. Check console.");
        }
    };

//    const searchManagers = (text = "") => {
//         const query = text.toLowerCase();

//         const filteredData = managersListData.filter((item) =>
//             item.name.toLowerCase().includes(query) ||
//             item.employeeId.includes(text)
//         );
//         setShowData(filteredData);
//     };

    const searchManagers = (text = "") => {
        const query = text.toLowerCase();

        const filteredData = managersListData.filter((item) => {
            const name = (item.managerName || "").toLowerCase();
            const empId = String(item.employeeId || ""); 

            return (
                name.includes(query) ||
                empId.includes(text)
            );
        });

        setShowData(filteredData);
    };



    useEffect(() => {
        managersDataInfo();
        managersList();
    }, []);

    useEffect(() => {
        searchManagers(searchQuery);
    }, [searchQuery]);

    console.log(managersListData);

  return (
      <div className="w-100"
          style={{
              marginLeft: "300px",
              minHeight: "100vh",
              overflowY: "auto"
          }}>
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
                                      <div className="mb-3">
                                          <label for="exampleFormControlInput1" className="form-label">Full Name</label>
                                          <input type="text" name='fullName' className="form-control" id="exampleFormControlInput1" placeholder="Enter Full Name" onChange={(e)=>{handleChange(e)}} />
                                      </div>
                                      <div className="mb-3">
                                          <label for="exampleFormControlInput1" className="form-label">E-mail</label>
                                          <input type="email" name='email' className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" onChange={(e)=>{handleChange(e)}} />
                                      </div>
                                      {/* <div className="mb-3">
                                          <label for="exampleFormControlInput1" className="form-label">Employee ID</label>
                                          <input type="text" name='employeeId' className="form-control" id="exampleFormControlInput1" placeholder="Enter Employee ID" onChange={(e)=>{handleChange(e)}} />
                                      </div> */}
                                      <div className="mb-3">
                                          <label for="exampleFormControlInput1" className="form-label">Date Of Birth</label>
                                          <input type="date" name='dob' className="form-control" id="exampleFormControlInput1" placeholder="Enter Employee DOB" onChange={(e)=>{handleChange(e)}} />
                                      </div>
                                      <div className="mb-3">
                                          <label for="exampleFormControlInput1" className="form-label">Employee Phone Number</label>
                                          <div className="input-group input-group-sm mb-3">
                                              <span className="input-group-text" id="inputGroup-sizing-sm">+91-</span>
                                              <input type="tel" name='phone' className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={(e)=>{handleChange(e)}} />
                                          </div>
                                      </div>
                                      
                                  </div>
                                  <div className="modal-footer">
                                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                      <button type="button" className="btn btn-dark" onClick={addManager}>Add Manager</button>
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
                                  <h3 className="card-text fs-3">{responseData}</h3>
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
                      <input
                          className="form-control me-2"
                          type="search"
                          placeholder="Search by Manager Name or Employee ID"
                          value={searchQuery}
                          onChange={(e) => {
                              setSearchQuery(e.target.value);
                              if (e.target.value.trim() === "") {
                                  managersList();
                              } else {
                                  searchManagers(e.target.value);
                              }
                          }}
                      />
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
                              {/* {managersListData.map((manager,index) => ( */}
                                {showData?.map((manager, index) => (
                                  <tr key={index}>
                                      <td>{manager.managerName}</td>
                                      <td>{manager.employeeId}</td>
                                      <td>{manager.hireDate}</td>
                                      <td>
                                          <button className="btn btn-danger" onClick={()=>{onDeactivate(manager.employeeId)}}>Deactivate</button>
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>

              </div>
          </div>
      </div>
  )
}

export default Managers
