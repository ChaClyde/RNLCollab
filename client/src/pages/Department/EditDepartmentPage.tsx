import ToastMessage from "../../components/ToastMessage/ToastMessage";
import { useToastMessage } from "../../hooks/useToastMessage";
import EditDepartmentForm from "./components/EditDepartmentForm"

const EditDepartmentPage = () => {

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
    <EditDepartmentForm onDepartmentUpdated={showToastMessage} />
    </>
  )
}

export default EditDepartmentPage