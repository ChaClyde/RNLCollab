import AxiosInstance from "./AxiosInstance";

const EventService = {

    loadEvent: async () => {
        try {
            const response = await AxiosInstance.get(
                "/event/loadEvent"
            );

            return response;

        } catch (error) {
            throw error;
        }
    },

    storeEvent: async (data: any) => {
        try {

            const response = await AxiosInstance.post(
                "/event/storeEvent",
                data
            );

            return response;

        } catch (error) {
            throw error;
        }
    },

    updateEvent: async (
        eventId: string | number,
        data: any
    ) => {
        try {

            const response = await AxiosInstance.put(
                `/event/updateEvent/${eventId}`,
                data
            );

            return response;

        } catch (error) {
            throw error;
        }
    },

    destroyEvent: async (
        eventId: string | number
    ) => {
        try {

            const response = await AxiosInstance.put(
                `/event/destroyEvent/${eventId}`
            );

            return response;

        } catch (error) {
            throw error;
        }
    },
}

export default EventService;