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
    getVenue: async (venueId: string | number) => {
        try {
            const response = await AxiosInstance.get(`/venue/getVenue/${venueId}`);
            return response;
        } catch (error) {
            throw error;
        }
    },
    updateVenue: async (venueId: string | number, data: any) => {
        try {
            const response = await AxiosInstance.put(`/venue/updateVenue/${venueId}`, data);
            return response;
        } catch (error) {
            throw error;
        }
    },
    destroyVenue: async (venueId: string | number) => {
            try {
                const response = await AxiosInstance.put(`/venue/destroyVenue/${venueId}`);
                return response;
            } catch (error) {
                throw error;
            }
        },
};

export default VenueService;