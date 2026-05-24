import TrashEventList from "./components/TrashEventList";
import ToastMessage from "../../components/ToastMessage/ToastMessage";
import { useToastMessage } from "../../hooks/useToastMessage";
import { useRefresh } from "../../hooks/useRefresh";

const TrashEventPage = () => {
    const {
        message,
        isVisible,
        showToastMessage,
        closeToastMessage
    } = useToastMessage("", false, false);

    const {
        refresh,
        handleRefresh,
    } = useRefresh(false);

    const handleRestoreSuccess = (message: string) => {
        showToastMessage(message, true);
        handleRefresh();
    };

    const handlePermanentDeleteSuccess = (message: string) => {
        showToastMessage(message, true);
        handleRefresh();
    };

    return (
        <>
            <ToastMessage
                message={message}
                isVisible={isVisible}
                onClose={closeToastMessage}
            />

            <TrashEventList
                refreshKey={refresh}
                onRestoreEvent={handleRestoreSuccess}
                onPermanentDelete={handlePermanentDeleteSuccess}
            />
        </>
    );
};

export default TrashEventPage;