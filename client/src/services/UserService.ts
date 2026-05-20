import AxiosInstance from "./AxiosInstance";

const UserService = {
    loadUsers: async (page: number, search: string) => {
        try {
            const response = await AxiosInstance.get("users/loadUsers");
            return response;
        } catch (error) {
            throw error;
        }
    },
    storeUser: async (data: any) => {
        try {
            const response = await AxiosInstance.post(
                "/users/storeUser", data);
            return response;
        } catch (error) {
            throw error;
        }
    },
    updateUser: async (userId: string | number, data: any) => {
        try {
            const response = await AxiosInstance.put(
                `/users/updateUser/${userId}`, data);
            return response;
        } catch (error) {
            throw error;
        }
    },

}

export default UserService;