import AxiosInstance from "./AxiosInstance";

const DepartmentService = {
    loadDepartment: async () => {
        try {
            const response = await AxiosInstance.get(`/department/loadDepartment`)
            return response;
        } catch (error) {
            throw error;
        }
    },
    storeDepartment: async (data: any) => {
        try {
            const response = await AxiosInstance.post("/department/storeDepartment", data);
            return response;
        } catch (error) {
            throw error;
        }
    },
}

export default DepartmentService;