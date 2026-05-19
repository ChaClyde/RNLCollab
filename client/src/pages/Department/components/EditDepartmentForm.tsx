import { useEffect, useState, type FC, type FormEvent } from "react";
import BackButton from "../../../components/Button/BackButton"
import SubmitButton from "../../../components/Button/SubmitButton"
import FloatingLabelInput from "../../../components/Input/FloatingLabelInput"
import type { DepartmentFieldErrors } from "../../../interfaces/DepartmentFieldsErrors";
import { useParams } from "react-router-dom";
import DepartmentService from "../../../services/DepartmentService";
import Spinner from "../../../components/Spinner/Spinner";

interface EditDepartmentFormProps {
    onDepartmentUpdated: (message: string) => void;
}

const EditDepartmentForm: FC<EditDepartmentFormProps> = ({ onDepartmentUpdated }) => {
    const [loadingGet, setLoadingGet] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [department, setDepartment] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState<DepartmentFieldErrors>({});

    const { department_id } = useParams()

    const handleGetDepartment = async (department_id: string | number) => {
        try {
            setLoadingGet(true)

            const res = await DepartmentService.getDepartment(department_id)

            if (res.status === 200) {
                setDepartment(res.data.department.department_name)
                setDescription(res.data.department.department_description || "");
            } else {
                console.error('Unexpected status error occured during getting department: ', res.status)
            }
        } catch (error) {
            console.log('Unexpected server error occured during getting department: ', error)
        } finally {
            setLoadingGet(false)
        }
    }

    const handleUpdateDepartment = async (e: FormEvent) => {
        try {
            e.preventDefault()

            setLoadingUpdate(true)

            const res = await DepartmentService.updateDepartment(department_id!, {
                department_name: department,
                department_description: description
            })

            if (res.status === 200) {
                setErrors({})
                setDepartment(res.data.department.department_name)
                onDepartmentUpdated(res.data.message)
            } else {
                console.error('Unexpected status error occured during updating department: ', res.status)
            }
        } catch (error: any) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors)
            } else {
                console.error('Unexpected server error occured during updating department: ', error)
            }
        } finally {
            setLoadingUpdate(false)
        }
    };

    useEffect(() => {
        if (department_id) {
            const parsedDepartmentId = parseInt(department_id)
            handleGetDepartment(parsedDepartmentId)
        } else {
            console.error('Unexpected parameter error occured during getting: ', department_id)
        }
    }, [department_id]);
    return (
        <>
            {loadingGet ? (
                <div className="flex justify-center items-center mt-52">
                    <Spinner size="lg" />
                </div>
            ) : (
                <form onSubmit={handleUpdateDepartment}>
                    <div className="mb-4">
                        <FloatingLabelInput label="Department" type="text" name="department" value={department} onChange={(e) => setDepartment(e.target.value)} required autoFocus errors={errors.department_name} />
                    </div>
                    <div className="mb-4">
                        <FloatingLabelInput label="Description" type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="flex justify-end gap-4">
                        {!loadingUpdate && <BackButton label="Back" path="/departments" />}
                        <SubmitButton label="Update Department" loading={loadingUpdate} loadingLabel="Updating Department..." />
                    </div>
                </form>
            )}

        </>
    )
}

export default EditDepartmentForm;