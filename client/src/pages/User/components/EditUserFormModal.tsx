import { useEffect, useState, type FC, type FormEvent } from "react"
import CloseButton from "../../../components/Button/CloseButton"
import SubmitButton from "../../../components/Button/SubmitButton"
import FloatingLabelInput from "../../../components/Input/FloatingLabelInput"
import Modal from "../../../components/Modal"
import FloatingLabelSelect from "../../../components/Select/FloatingLabelselect"
import type { UserColumns } from "../../../interfaces/UserColumns"
import type { RoleColumns } from "../../../interfaces/RoleColumns"
import type { DepartmentsColumns } from "../../../interfaces/DepartmentColumns"
import type { UserFieldErrors } from "../../../interfaces/UserFieldErrors"
import RoleService from "../../../services/RoleService"
import DepartmentService from "../../../services/DepartmentService"
import UserService from "../../../services/UserService"

interface EditUserFormModalProps {
    user: UserColumns | null
    onUserUpdate: (message: string) => void
    refreshKey: () => void
    isOpen: boolean
    onClose: () => void
}

const EditUserFormModal: FC<EditUserFormModalProps> = ({
    user,
    onUserUpdate,
    refreshKey,
    isOpen,
    onClose
}) => {
    const [loadingRoles, setLoadingRoles] = useState(false)
    const [roles, setRoles] = useState<RoleColumns[]>([])

    const [loadingDepartments, setLoadingDepartments] = useState(false)
    const [departments, setDepartments] = useState<DepartmentsColumns[]>([])

    const [loadingUpdate, setLoadingUpdate] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [suffixName, setSuffixName] = useState("");
    const [role, setRole] = useState("");
    const [department, setDepartment] = useState("");
    const [status, setStatus] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [errors, setErrors] = useState<UserFieldErrors>({});

    const handleUpdateUser = async (e: FormEvent) => {
        try {
            e.preventDefault()

            setLoadingUpdate(true)

            const payload = {
                first_name: firstName,
                middle_name: middleName,
                last_name: lastName,
                suffix_name: suffixName,
                role: role,
                department: department,
                status: status,
                email: email,
                username: username,
            };

            const res = await UserService.updateUser(user?.user_id!, payload)

            if (res.status === 200) {
                setFirstName(res.data.user.first_name)
                setMiddleName(res.data.user.middle_name ?? '');
                setLastName(res.data.user.last_name);
                setSuffixName(res.data.user.suffix_name ?? '');
                setRole(res.data.user.role_id);
                setDepartment(res.data.user.department_id.toString());
                setStatus(res.data.user.status);
                setEmail(res.data.user.email);
                setUsername(res.data.user.username);
                setErrors({});

                onUserUpdate(res.data.message)

                handleLoadRoles();
                handleLoadDepartments();
                refreshKey()
            } else {
                console.error('Unexpected status error occured during updating user: ', res.status)
            }
        } catch (error: any) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors)
            } else {
                console.error('Unexpected server error occured during updating user: ', error)
            }
        } finally {
            setLoadingUpdate(false)
        }
    }

    const handleLoadRoles = async () => {
        try {
            setLoadingRoles(true);

            const res = await RoleService.loadRoles();
            if (res.status === 200) {
                setRoles(res.data.roles);
            } else {
                console.error('Unexpected status error occured during load roles: ', res.status);
            }
        } catch (error) {
            console.error('Unexpected server error occured during loading roles: ', error);
        } finally {
            setLoadingRoles(false);
        }
    };

    const handleLoadDepartments = async () => {
        try {
            setLoadingDepartments(true);

            const res = await DepartmentService.loadDepartment()
            if (res.status === 200) {
                setDepartments(res.data.departments)
            } else {
                console.error('Unexpected status error occured during load department: ', res.status)
            }
        } catch (error) {
            console.error('Unexpected server error occured during loading department: ', error)
        } finally {
            setLoadingDepartments(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            handleLoadRoles();
            handleLoadDepartments();
        }
    }, [isOpen]);

    useEffect(() => {
        if (user) {
            setFirstName(user.first_name);
            setMiddleName(user.middle_name ?? '');
            setLastName(user.last_name);
            setSuffixName(user.suffix_name ?? '');
            setRole(user.role.role_id.toString());
            setDepartment(user.department.department_id.toString());
            setStatus(user.status);
            setEmail(user.email);
            setUsername(user.username);
        } else {
            console.error('Unexpected user error occured during getting user details: ', user)
        }
    }, [user]);

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} showCloseButton>
                <form onSubmit={handleUpdateUser}>
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6 px-1">
                        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                            Edit User Form
                        </h1>

                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Fill in the user information below.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 border-b border-b-gray-100 mb-4">
                        <div className="mb-4">
                            <FloatingLabelInput label="First Name" type="text" name="first_name" value={firstName} onChange={(e) => setFirstName(e.target.value)} errors={errors.first_name} required autoFocus />
                        </div>
                        <div className="mb-4">
                            <FloatingLabelInput label="Middle Name" type="text" name="middle_name" value={middleName} onChange={(e) => setMiddleName(e.target.value)} errors={errors.middle_name} />
                        </div>
                        <div className="mb-4">
                            <FloatingLabelInput label="Last Name" type="text" name="last_name" value={lastName} onChange={(e) => setLastName(e.target.value)} errors={errors.last_name} required />
                        </div>
                        <div className="mb-4">
                            <FloatingLabelInput label="Suffix Name" type="text" name="suffix_name" value={suffixName} onChange={(e) => setSuffixName(e.target.value)} errors={errors.suffix_name} />
                        </div>
                        <div className="mb-4">
                            <FloatingLabelSelect label="Role" name="role" value={role} onChange={(e) => setRole(e.target.value)} errors={errors.role} >

                                {loadingRoles ? (
                                    <option value="">Loading...</option>
                                ) : (
                                    <>
                                        <option value="">Select Role</option>
                                        {roles.map((role, index) => (
                                            <option value={role.role_id} key={index}>{role.role_name}</option>
                                        ))}
                                    </>
                                )}
                            </FloatingLabelSelect>
                        </div>
                        <div className="mb-4">
                            <FloatingLabelSelect label="Department" name="department" value={department} onChange={(e) => setDepartment(e.target.value)} errors={errors.department} >

                                {loadingDepartments ? (
                                    <option value="">Loading...</option>
                                ) : (
                                    <>
                                        <option value="">Select Department/Office</option>
                                        {departments.map((department, index) => (
                                            <option value={department.department_id} key={index}>{department.department_name}</option>
                                        ))}
                                    </>
                                )}
                            </FloatingLabelSelect>
                        </div>
                        <div className="mb-4">
                            <FloatingLabelInput label="Email" type="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} errors={errors.email} />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <div className="mb-4">
                                <FloatingLabelInput label="Username" type="text" name="username" required value={username} onChange={(e) => setUsername(e.target.value)} errors={errors.username} />
                            </div>
                        </div>
                        <div className="mb-4 col-span-2">
                            <label className="block text-sm font-medium mb-2">
                                Status
                            </label>

                            <div className="flex items-center gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="active"
                                        checked={status === "active"}
                                        onChange={(e) => setStatus(e.target.value)}
                                    />
                                    Active
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="inactive"
                                        checked={status === "inactive"}
                                        onChange={(e) => setStatus(e.target.value)}
                                    />
                                    Inactive
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-4">
                        {!loadingUpdate && (
                            <CloseButton label="Close" onClose={onClose} />
                        )}
                        <SubmitButton label="Update User" loading={loadingUpdate} loadingLabel="Saving User..." />
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default EditUserFormModal