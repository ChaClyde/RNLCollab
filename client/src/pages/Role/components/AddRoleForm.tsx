import { useState, type FC, type FormEvent } from "react";
import SubmitButton from "../../../components/Button/SubmitButton"
import FloatingLabelInput from "../../../components/Input/FloatingLabelInput"
import RoleService from "../../../services/RoleService";
import type { RoleFieldErrors } from "../../../interfaces/RoleInterface";

interface AddRoleFormProps {
    onRoleAdded: (message: string) => void
    refreshKey: () => void

}

const AddRoleForm: FC<AddRoleFormProps> = ({
    onRoleAdded,
    refreshKey,
}) => {
    const [loadingStore, setLoadingStore] = useState(false)
    const [roleName, setRoleName] = useState('')
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState<RoleFieldErrors>({});

    const handleStoreRole = async (e: FormEvent) => {
        try {
            e.preventDefault()

            setLoadingStore(true)

            const res = await RoleService.storeRole({ role_name: roleName, role_description: description })

            if (res.status === 200) {
                setRoleName("");
                setDescription("");
                setErrors({});

                onRoleAdded(res.data.message)
                refreshKey()
            } else {
                console.error('Unexpected error occured during store role: ', res.data)
            }
        } catch (error: any) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors)
            } else {
                console.error('Unexpected server error during store role: ',
                    error
                );
            }
        }
        finally {
            setLoadingStore(false);
        }
    }

    return (
        <>
            <form onSubmit={handleStoreRole}>
                <div className="mb-4">
                    <FloatingLabelInput label="Role" type="text" name="role_name" value={roleName} onChange={(e) => setRoleName(e.target.value)}
                        required autoFocus errors={errors.role_name} />
                </div>
                <div className="mb-4">
                    <FloatingLabelInput label="Description" type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="mb-4">
                    <SubmitButton label="Save Role" loading={loadingStore} loadingLabel="Saving Role" />
                </div>
            </form>
        </>
    );
};

export default AddRoleForm;