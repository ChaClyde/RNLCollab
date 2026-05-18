import { useEffect, useState } from "react";
import BackButton from "../../../components/Button/BackButton";
import SubmitButton from "../../../components/Button/SubmitButton"
import FloatingLabelInput from "../../../components/Input/FloatingLabelInput"
import type { RoleFieldErrors } from "../../../interfaces/RoleFieldErrors";
import RoleService from "../../../services/RoleService";
import { useParams } from "react-router-dom";

const EditRoleForm = () => {
    const [loadingGet, setLoadingGet] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [role, setRole] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState<RoleFieldErrors>({});

    const { role_id } = useParams()

    const handleGetRole = async (role_id: string | number) => {
        try {
            setLoadingGet(true)

            const res = await RoleService.getRole(role_id)

            if (res.status === 200) {
                setRole(res.data.role.role_name)
                setDescription(res.data.role.role_description || "");
            } else {
                console.error('Unexpected status error occured during getting role: ', res.status)
            }
        } catch (error) {
            console.log('Unexpected server error occured during getting role ', error)
        } finally {
            setLoadingGet(false)
        }
    }

    useEffect(() => {
        if (role_id) {
            const parsedRoleId = parseInt(role_id)
            handleGetRole(parsedRoleId)
        } else {
            console.error('Unexpected parameter error occured during getting: ', role_id)
        }
    }, [role_id]);

    return (
        <>
            <form>
                <div className="mb-4">
                    <FloatingLabelInput label="Role" type="text" name="role" value={role} onChange={(e) => setRole(e.target.value)} />
                </div>
                <div className="mb-4">
                    <FloatingLabelInput label="Description" type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="flex justify-end gap-4">
                    <BackButton label="Back" path="/roles-permissions" />
                    <SubmitButton label="Save Role" />
                </div>
            </form>
        </>
    )
}

export default EditRoleForm; 