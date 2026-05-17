import AxiosInstance from "./AxiosInstance";

const DepartmentService = {
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