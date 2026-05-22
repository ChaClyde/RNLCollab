
import TrashUserList from "./components/TrashUserList";
import ToastMessage from "../../components/ToastMessage/ToastMessage";
import { useToastMessage } from "../../hooks/useToastMessage";
import { useRefresh } from "../../hooks/useRefresh";


const TrashMainPage = () => {
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

            <TrashUserList
                refreshKey={refresh}
                onRestoreUser={handleRestoreSuccess}
                onPermanentDelete={handlePermanentDeleteSuccess}
            />
        </>
    );
}

export default TrashMainPage