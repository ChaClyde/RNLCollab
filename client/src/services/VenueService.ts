import AxiosInstance from "./AxiosInstance";

const VenueService = {
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