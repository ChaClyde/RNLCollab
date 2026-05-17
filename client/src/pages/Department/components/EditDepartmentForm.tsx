import BackButton from "../../../components/Button/BackButton"
import SubmitButton from "../../../components/Button/SubmitButton"
import FloatingLabelInput from "../../../components/Input/FloatingLabelInput"

const EditDepartmentForm = () => {
    return (
        <>
            <form>
                <div className="mb-4">
                    <FloatingLabelInput label="Department" type="text" name="department" />
                </div>
                <div className="mb-4">
                    <FloatingLabelInput label="Description" type="text" name="description" />
                </div>
                <div className="flex justify-end gap-4">
                    <BackButton label="Back" path="/departments" />
                    <SubmitButton label="Save Department" />
                </div>
            </form>
        </>
    )
}

export default EditDepartmentForm;