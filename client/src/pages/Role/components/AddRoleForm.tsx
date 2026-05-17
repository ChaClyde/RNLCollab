import SubmitButton from "../../../components/Button/SubmitButton"
import FloatingLabelInput from "../../../components/Input/FloatingLabelInput"

const AddRoleForm = () => {
    return (
        <>
            <form>
                <div className="mb-4">
                    <FloatingLabelInput label="Role" type="text" name="role" />
                </div>
                <div className="mb-4">
                    <FloatingLabelInput label="Description" type="text" name="description" />
                </div>
                <div className="mb-4">
                    <SubmitButton label="Save Role" />
                </div>
            </form>
        </>
    );
};

export default AddRoleForm;