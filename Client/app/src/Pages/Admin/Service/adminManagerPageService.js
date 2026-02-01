import api from "../../../Pages/Admin/Service/api";

const getAdminManagerDataInfo= async ()=>{
    try{
        const response = await api.get('/admin/adminActiveManagers');
        return response.data;
    }catch(error){
        console.error("Error fetching manager data:", error);
        throw error;
    }   
}

const getAdminManagersList= async ()=>{
    try{
        const response = await api.get('/admin/adminManagerList');
        return response.data;
    }catch(error){
        console.error("Error fetching managers list:", error);
        throw error;
    }
}

const addManagerViaAdmin= async (body)=>{
    try {
        const response = await api.post('/admin/adminAddManager', body);
        return response.data;
    } catch (error) {
        console.error("Add manager failed:", error);
        throw error;
    }
}

const activateDeactivateManager = async (id, status) => {
    try {
        await api.put(`/admin/adminDeactivateManager/${id}/${status}`);
    } catch (error) {
        console.error("Activate/Deactivate manager failed:", error);
        throw error;
    }
}

export { getAdminManagerDataInfo, getAdminManagersList, addManagerViaAdmin, activateDeactivateManager };