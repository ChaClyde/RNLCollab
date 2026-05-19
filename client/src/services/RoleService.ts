import AxiosInstance from "./AxiosInstance";

const RoleService = {
    loadRoles: async () => {
        try {
            const response = await AxiosInstance.get(`/role/loadRole`)
            return response;
        } catch (error) {
            throw error;
        }
    },
    storeRole: async (data: any) => {
        try {
            const response = await AxiosInstance.post("/role/storeRole", data);
            return response;
        } catch (error) {
            throw error;
        }
    },
    getRole: async (roleId: string | number) => {
        try {
            const response = await AxiosInstance.get(`/role/getRole/${roleId}`);
            return response;
        } catch (error) {
            throw error;
        }
    },
    updateRole: async (roleId: string | number, data: any) => {
        try {
            const response = await AxiosInstance.put(`/role/updateRole/${roleId}`, data);
            return response;
        } catch (error) {
            throw error;
        }
    },
    destroyRole: async (roleId: string | number) => {
        try {
            const response = await AxiosInstance.put(`/role/destroyRole/${roleId}`);
            return response;
        } catch (error) {
            throw error;
        }
    },
};

export default RoleService;