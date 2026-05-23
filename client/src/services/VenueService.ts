import AxiosInstance from "./AxiosInstance";

const VenueService = {
    loadVenue: async () => {
        try {
            const response = await AxiosInstance.get('/venue/loadVenue');
            return response;
        } catch (error) {
            throw error;
        }
    },
    storeVenue: async (data: any) => {
        try {
            const response = await AxiosInstance.post('/venue/storeVenue', data);
            return response;
        } catch (error) {
            throw error;
        }
    },
};

export default VenueService;