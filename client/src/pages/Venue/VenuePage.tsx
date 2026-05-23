import { useEffect} from "react"
import ToastMessage from "../../components/ToastMessage/ToastMessage"
import AddVenueForm from "./components/AddVenueForm"
import VenueList from "./components/VenueList"
import { useToastMessage } from "../../hooks/useToastMessage"
import { useRefresh } from "../../hooks/useRefresh"

const VenuePage = () => {
      const {
        message: toastMessage,
        isVisible: toastMessageIsVisible,
        showToastMessage,
        closeToastMessage,
      } = useToastMessage("", false);

      const { refresh, handleRefresh } = useRefresh(false);

    useEffect(() => {
        document.title = "Venue Page";
    }, []);
    return (
        <>
            <ToastMessage message={toastMessage} isVisible={toastMessageIsVisible} onClose={closeToastMessage} />
            <div className="flex flex-col gap-4">
                <div className="col-span-2 md:col-span-1">
                    <AddVenueForm onVenueAdded={showToastMessage} refreshKey={handleRefresh}/>
                </div>
                <div className="col-span-2 md:col-span-1">
                    <VenueList refreshKey={refresh} />
                </div>
            </div>
        </>
    )
}

export default VenuePage;