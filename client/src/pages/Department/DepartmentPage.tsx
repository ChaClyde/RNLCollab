
import AddDepartmentForm from "./components/AddDepartmentForm"
import DepartmentList from "./components/DepartmentList"
import ToastMessage from "../../components/ToastMessage/ToastMessage"
import { useToastMessage } from "../../hooks/useToastMessage"
import { useRefresh } from "../../hooks/useRefresh"
import { useEffect } from "react"
import { useLocation } from "react-router-dom";

const DepartmentPage = () => {
  const {
    message: toastMessage,
    isVisible: toastMessageIsVisible,
    showToastMessage,
    closeToastMessage,
  } = useToastMessage("", false);

  const { refresh, handleRefresh } = useRefresh(false);
  const location = useLocation();

    useEffect(() => {
      if (location.state?.message) {
        showToastMessage(location.state.message);
        handleRefresh();
        window.history.replaceState({}, document.title);
      }
    }, [location.state, showToastMessage]);
  return (
    <>
      <ToastMessage message={toastMessage} isVisible={toastMessageIsVisible} onClose={closeToastMessage} />
      <div className="grid-cols-2 gap-4 ">
        <div className="col-span-2 md:col-span-1">
          <AddDepartmentForm onDepartmentAdded={showToastMessage} refreshKey={handleRefresh} />
        </div>
        <div className="col-span-2 md:col-span-1">
          <DepartmentList refreshKey={refresh} />
        </div>
      </div>
    </>

  )
}

export default DepartmentPage;