import SubmitButton from "../../../components/Button/SubmitButton"
import FloatingLabelInput from "../../../components/Input/FloatingLabelInput"


const AddDepartmentForm = () => {
  return (
    <>
          <form>
              <div className="mb-4">
                  <FloatingLabelInput label="Department" type="text" name="department" />
              </div>
              <div className="mb-4">
                  <FloatingLabelInput label="Description" type="text" name="description" />
              </div>
              <div className="mb-4">
                  <SubmitButton label="Save Department" />
              </div>
          </form>
    </>
  )
}

export default AddDepartmentForm;