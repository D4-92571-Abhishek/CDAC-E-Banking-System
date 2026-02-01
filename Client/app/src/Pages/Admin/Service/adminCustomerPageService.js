import api from "../../../Pages/Admin/Service/api";

const getAdminCustomerDataInfo= async ()=>{
    try{
        const response = await api.get('/admin/adminCustomerInfo');
        return response.data;
    }catch(error){
        console.error("Error fetching customer data:", error);
        throw error;
    }   
}

const getAdminCustomersList= async ()=>{
    try{
        const response = await api.get('/admin/adminCustomerList');
        return response.data;
    }catch(error){
        console.error("Error fetching customers list:", error);
        throw error;
    }
}

const activateDeactivateCustomer= async (id, status)=>{
    try {
        await api.put(`/admin/adminDeactivateCustomer/${id}/${status}`);
    } catch (error) {
        console.error("Activate/Deactivate customer failed:", error);
        throw error;
    }
}

export { getAdminCustomerDataInfo, getAdminCustomersList, activateDeactivateCustomer };