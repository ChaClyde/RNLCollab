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
    getDepartment: async (departmentId: string | number) => {
        try {
            const response = await AxiosInstance.get(`/department/getDepartment/${departmentId}`);
            return response;
        } catch (error) {
            throw error;
        }
    },
    updateDepartment: async (departmentId: string | number, data: any) => {
        try {
            const response = await AxiosInstance.put(`/department/updateDepartment/${departmentId}`, data);
            return response;
        } catch (error) {
            throw error;
        }
    },
    destroyDepartment: async (departmentId: string | number) => {
        try {
            const response = await AxiosInstance.put(`/department/destroyDepartment/${departmentId}`);
            return response;
        } catch (error) {
            throw error;
        }
    },
}

export default DepartmentService;