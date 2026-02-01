import api from "../../../Pages/Admin/Service/api";

const getAdminLoanDataInfo= async ()=>{
    try{
        const response = await api.get('/admin/adminLoanInfo');
        return response.data;
    }catch(error){
        console.error("Error fetching loan data:", error);
        throw error;
    }   
}

const getAdminLoansList= async ()=>{
    try{
        const response = await api.get('/admin/adminLoanList');
        return response.data;
    }catch(error){
        console.error("Error fetching loans list:", error);
        throw error;
    }
}

export { getAdminLoanDataInfo, getAdminLoansList };