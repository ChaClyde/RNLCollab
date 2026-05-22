import BackButton from "../../../components/Button/BackButton"
import SubmitButton from "../../../components/Button/SubmitButton"
import FloatingLabelInput from "../../../components/Input/FloatingLabelInput"
import Spinner from "../../../components/Spinner/Spinner"

const DeleteVenueForm = () => {
  return (
    <>
          {loadingGet ? (
              <div className="flex justify-center items-center mt-52">
                  <Spinner size="lg" />
              </div>
          ) : (
              <form onSubmit={handleDestroyRole}>
                  <div className="mb-4">
                      <FloatingLabelInput label="Role" type="text" name="role" value={role} readOnly />
                  </div>
                  <div className="mb-4">
                      <FloatingLabelInput label="Description" type="text" name="description" value={description} readOnly />
                  </div>
                  <div className="flex justify-end gap-4">
                      {!loadingDestroy && <BackButton label="Back" path="/roles-permissions" />}
                      <SubmitButton label="Delete Role" className="bg-red-600 hover:bg-red-700" loading={loadingDestroy} loadingLabel="Deleting Role..." />
                  </div>
              </form>
          )}
    </>
  )
}

export default DeleteVenueForm