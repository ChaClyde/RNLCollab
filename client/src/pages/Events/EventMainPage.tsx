import ToastMessage from "../../components/ToastMessage/ToastMessage";
import { useModal } from "../../hooks/useModal";
import { useRefresh } from "../../hooks/useRefresh";
import { useToastMessage } from "../../hooks/useToastMessage";
import type { EventColumns } from "../../interfaces/EventInterface";

import AddEventFormModal from "./components/AddEventFormModal";
import EditEventFormModal from "./components/EditEventFormModal";
import DeleteEventFormModal from "./components/DeleteEventFormModal";
import EventList from "./components/EventList";

const EventMainPage = () => {

    const {
        isOpen: isAddEventFormModal,
        openModal: openAddEventFormModal,
        closeModal: closeAddEventFormModal
    } = useModal(false);

    const {
        isOpen: isEditEventFormModal,
        selectedItem: selectedEventForEdit,
        openModal: openEditEventFormModal,
        closeModal: closeEditEventFormModal
    } = useModal<EventColumns>(false);

    const {
        isOpen: isDeleteEventFormModalOpen,
        selectedItem: selectedEventForDelete,
        openModal: openDeleteEventFormModal,
        closeModal: closeDeleteEventFormModal
    } = useModal<EventColumns>(false);

    const {
        message: toastMessage,
        isVisible: toastMessageIsVisible,
        showToastMessage,
        closeToastMessage
    } = useToastMessage("", false, false);

    const {
        refresh,
        handleRefresh
    } = useRefresh(false);

    return (
        <>
            <ToastMessage
                message={toastMessage}
                isVisible={toastMessageIsVisible}
                onClose={closeToastMessage}
            />

            <AddEventFormModal
                onEventAdded={showToastMessage}
                refreshKey={handleRefresh}
                isOpen={isAddEventFormModal}
                onClose={closeAddEventFormModal}
            />

            <EditEventFormModal
                event={selectedEventForEdit}
                onEventUpdated={showToastMessage}
                refreshKey={handleRefresh}
                isOpen={isEditEventFormModal}
                onClose={closeEditEventFormModal}
            />

            <DeleteEventFormModal
                event={selectedEventForDelete}
                onDeleteEvent={showToastMessage}
                refreshKey={handleRefresh}
                isOpen={isDeleteEventFormModalOpen}
                onClose={closeDeleteEventFormModal}
            />

            <EventList
                onAddEvent={openAddEventFormModal}
                onEditEvent={(event) => openEditEventFormModal(event)}
                onDeleteEvent={(event) => openDeleteEventFormModal(event)}
                refreshKey={refresh}
            />
        </>
    );
};

export default EventMainPage;