import api from "../../../Pages/Admin/Service/api";

export const getAdminDashboardData= async ()=>{
    try{
        const response=await api.get('/admin/adminDashboard');
        return response.data;
    }catch(error){
        console.error("Error fetching dashboard data:", error);
    }
}


