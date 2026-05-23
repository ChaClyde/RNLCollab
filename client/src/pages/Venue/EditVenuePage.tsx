import ToastMessage from "../../components/ToastMessage/ToastMessage"
import { useToastMessage } from "../../hooks/useToastMessage";
import EditvenueForm from "./components/EditvenueForm"

const EditVenuePage = () => {
    const {
      message:
      toastMessage,
      isVisible:
      toastMessageIsVisible,
      showToastMessage,
      closeToastMessage
    } = useToastMessage("", false);

  return (
    <>
    <ToastMessage message={toastMessage} isVisible={toastMessageIsVisible} onClose={closeToastMessage} />
    <EditvenueForm onVenueUpdated={showToastMessage} />
    </>
  )
}

export default EditVenuePage