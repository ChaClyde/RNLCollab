import BackButton from "../../../components/Button/BackButton"
import SubmitButton from "../../../components/Button/SubmitButton"
import FloatingLabelInput from "../../../components/Input/FloatingLabelInput"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState, type FormEvent } from "react"
import Spinner from "../../../components/Spinner/Spinner"
import DepartmentService from "../../../services/DepartmentService"


const DeleteDepartmentForm = () => {
    const [loadingGet, setLoadingGet] = useState(false)
    const [loadingDestroy, setLoadingDestroy] = useState(false)
    const [department, setdepartment] = useState("")
    const [description, setDescription] = useState("");

    const { department_id } = useParams()
    const navigate = useNavigate()

    const handleGetDepartment = async (department_id: string | number) => {
        try {
            setLoadingGet(true);

            const res = await DepartmentService.getDepartment(department_id);

            if (res.status === 200) {
                setdepartment(res.data.department.department_name)
                setDescription(res.data.department.department_description || "")
            } else {
                console.error('Unexpected status error occured during deleting department: ', res.status)
            }
        } catch (error) {
            {
                console.error('Unexpected server error occured during deleting department: ', error)
            };
        } finally {
            setLoadingGet(false)
        }
    };

    const handleDestroyDepartment = async (e: FormEvent) => {
        try {
            e.preventDefault()

            setLoadingDestroy(true)

            const res = await DepartmentService.destroyDepartment(department_id!)

            if (res.status === 200) {
                navigate('/departments', { state: { message: res.data.message } })
            } else {
                console.error('Unexpected status error occured during deleting department: ', res.status);
            };
        } catch (error) {
            console.error('Unexpected server error occured during deleting department: ', error);
        } finally {
            setLoadingDestroy(false);
        }
    }

    useEffect(() => {
        if (department_id) {
            const parsedDepartmentId = parseInt(department_id);
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
                <form onSubmit={handleDestroyDepartment}>
                    <div className="mb-4">
                        <FloatingLabelInput label="Department" type="text" name="department" value={department} readOnly />
                    </div>
                    <div className="mb-4">
                        <FloatingLabelInput label="Description" type="text" name="description" value={description} readOnly />
                    </div>
                    <div className="flex justify-end gap-4">
                            {!loadingDestroy && <BackButton label="Back" path="/departments" /> }
                        <SubmitButton label="Delete Department" className="bg-red-600 hover:bg-red-700" loading={loadingDestroy} loadingLabel="Deleting Department..." />
                    </div>
                </form>
            )}

        </>
    );
};

export default DeleteDepartmentForm;