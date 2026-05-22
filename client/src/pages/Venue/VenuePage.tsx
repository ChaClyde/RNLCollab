import { useEffect, useState } from "react"
import ToastMessage from "../../components/ToastMessage/ToastMessage"
import AddVenueForm from "./components/AddVenueForm"
import VenueList from "./components/VenueList"

const VenuePage = () => {
    const [toastMessage, setToastMessage] = useState('')
    const [toastMessageIsVisible, setToastMessageIsVisible] = useState(false)

    const handleShowToastMessage = (mesage: string) => {
        setToastMessage(mesage)
        setToastMessageIsVisible(true)
    }

    const handleCloseToastMessage = () => {
        setToastMessage('')
        setToastMessageIsVisible(false)
    }

    useEffect(() => {
        document.title = "Venue Page";
    }, []);
    return (
        <>
            <ToastMessage message={toastMessage} isVisible={toastMessageIsVisible} onClose={handleCloseToastMessage} />
            <div className="flex flex-col gap-4">
                <div className="col-span-2 md:col-span-1">
                    <AddVenueForm onVenueAdded={(message) => {
                        handleShowToastMessage(message)
                    }} />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <VenueList />
                </div>
            </div>
        </>
    )
}

export default VenuePage;