import { useState } from "react"
import AddDepartmentForm from "./components/AddDepartmentForm"
import DepartmentList from "./components/DepartmentList"
import ToastMessage from "../../components/ToastMessage/ToastMessage"

const DepartmentPage = () => {
  const [toastMessage, setToastMessage] = useState('')
  const [toastMessageIsVisible, setToastMessageIsVisible] = useState(false)

  const handleShowToastMessage = (message: string) => {
    setToastMessage(message)
    setToastMessageIsVisible(true)
  }

  const handleCloseToastMessage = () => {
    setToastMessage('')
    setToastMessageIsVisible(false)
  }
  return (
    <>
      <ToastMessage message={toastMessage} isVisible={toastMessageIsVisible} onClose={handleCloseToastMessage} />
      <div className="grid-cols-2 gap-4 ">
        <div className="col-span-2 md:col-span-1">
          <AddDepartmentForm onDepartmentAdded={(message) => {
            handleShowToastMessage(message)
          }} />
        </div>
        <div className="col-span-2 md:col-span-1">
          <DepartmentList />
        </div>
      </div>
    </>

  )
}

export default DepartmentPage;