import BackButton from "../../../components/Button/BackButton"
import SubmitButton from "../../../components/Button/SubmitButton"
import FloatingLabelInput from "../../../components/Input/FloatingLabelInput"
import Spinner from "../../../components/Spinner/Spinner"

const EditvenueForm = () => {
  return (
    <>
          {loadingGet ? (
              <div className="flex justify-center items-center mt-52">
                  <Spinner size="lg" />
              </div>

          ) : (
              <form onSubmit={handleUpdateRole}>
                  <div className="mb-4">
                      <FloatingLabelInput label="Role" type="text" name="role" value={role} onChange={(e) => setRole(e.target.value)} required autoFocus errors={errors.role_name} />
                  </div>
                  <div className="mb-4">
                      <FloatingLabelInput label="Description" type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                  </div>
                  <div className="flex justify-end gap-4">
                      {!loadingUpdate && <BackButton label="Back" path="/roles-permissions" />}
                      <SubmitButton label="Update Role" loading={loadingUpdate} loadingLabel="Updating Role..." />
                  </div>
              </form>
          )}

    </>
  )
}

export default EditvenueForm