import FloatingLabelInput from "../../../components/Input/FloatingLabelInput"
import Modal from "../../../components/Modal"
import FloatingLabelSelect from "../../../components/Select/FloatingLabelselect"
import SubmitButton from "../../../components/Button/SubmitButton";
import CloseButton from "../../../components/Button/CloseButton";
import { useEffect, useState, type FC, type FormEvent } from "react";
import RoleService from "../../../services/RoleService";
import type { RoleColumns } from "../../../interfaces/RoleColumns";
import type { DepartmentsColumns } from "../../../interfaces/DepartmentColumns";
import DepartmentService from "../../../services/DepartmentService";
import type { UserFieldErrors } from "../../../interfaces/UserFieldErrors";
import UserService from "../../../services/UserService";

interface AddUserFormModalProps {
    onUserAdded: (message: string) => void
    isOpen: boolean;
    onClose: () => void;
    refreshKey: () => void;
}

const AddUserFormModal: FC<AddUserFormModalProps> = ({ onUserAdded, isOpen, onClose, refreshKey }) => {
    const [loadingRoles, setLoadingRoles] = useState(false);
    const [roles, setRoles] = useState<RoleColumns[]>([]);

    const [loadingDepartments, setLoadingDepartments] = useState(false);
    const [departments, setDepartments] = useState<DepartmentsColumns[]>([]);

    const [loadingStore, setLoadingStore] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [suffixName, setSuffixName] = useState("");
    const [role, setRole] = useState("");
    const [department, setDepartment] = useState("");
    const [status, setStatus] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [errors, setErrors] = useState<UserFieldErrors>({});

    const handleStoreUser = async (e: FormEvent) => {
        try {
            e.preventDefault()

            setLoadingStore(true)

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
                password: password,
                password_confirmation: passwordConfirmation
            }
            const res = await UserService.storeUser(payload)

            if (res.status === 200) {
                onUserAdded(res.data.message)

                setFirstName('')
                setMiddleName('')
                setLastName('')
                setSuffixName('')
                setRole('')
                setDepartment('')
                setStatus('')
                setEmail('')
                setUsername('')
                setPassword('')
                setPasswordConfirmation('')
                setErrors({})

                handleLoadRoles();
                refreshKey()
            } else {
                console.error('Unexpected error occured during adding user: ', res.status)
            }
        } catch (error: any) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors)
            } else {
                console.log('Unexpected server error occured during adding user: ', error)
            }
        } finally {
            setLoadingStore(false);
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

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} showCloseButton>
                <form onSubmit={handleStoreUser}>
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6 px-1">
                        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                            Add User
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
                        <div className="col-span-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FloatingLabelInput label="Password" type="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} errors={errors.password} />
                                <FloatingLabelInput label="Password Confirmation" type="password" name="password_confirmation" required value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} errors={errors.password_confirmation} />
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
                        {!loadingStore && (
                            <CloseButton label="Close" onClose={onClose} />
                        )}
                        <SubmitButton label="Save User" loading={loadingStore} loadingLabel="Saving User..." />
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default AddUserFormModal

// import FloatingLabelInput from "../../../components/Input/FloatingLabelInput";
// import Modal from "../../../components/Modal";
// import FloatingLabelSelect from "../../../components/Select/FloatingLabelselect";
// import SubmitButton from "../../../components/Button/SubmitButton";
// import CloseButton from "../../../components/Button/CloseButton";
// import { useEffect, useState, type FC } from "react";

// import RoleService from "../../../services/RoleService";
// import DepartmentService from "../../../services/DepartmentService";

// import type { RoleColumns } from "../../../interfaces/RoleColumns";
// import type { DepartmentsColumns } from "../../../interfaces/DepartmentColumns";
// import type { UserFieldErrors } from "../../../interfaces/UserFieldErrors";

// interface AddUserFormModalProps {
//     isOpen: boolean;
//     onClose: () => void;
// }

// const AddUserFormModal: FC<AddUserFormModalProps> = ({
//     isOpen,
//     onClose,
// }) => {
//     const [loadingRoles, setLoadingRoles] = useState(false);
//     const [roles, setRoles] = useState<RoleColumns[]>([]);

//     const [loadingDepartments, setLoadingDepartments] = useState(false);
//     const [departments, setDepartments] = useState<DepartmentsColumns[]>([]);

//     const [firstName, setFirstName] = useState("");
//     const [middleName, setMiddleName] = useState("");
//     const [lastName, setLastName] = useState("");
//     const [suffixName, setSuffixName] = useState("");

//     const [role, setRole] = useState("");
//     const [department, setDepartment] = useState("");

//     const [status, setStatus] = useState("");

//     const [email, setEmail] = useState("");
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [passwordConfirmation, setPasswordConfirmation] = useState("");

//     const [errors, setErrors] = useState<UserFieldErrors>({});

//     const handleLoadRoles = async () => {
//         try {
//             setLoadingRoles(true);

//             const res = await RoleService.loadRoles();

//             if (res.status === 200) {
//                 setRoles(res.data.roles);
//             }
//         } catch (error) {
//             console.error(error);
//         } finally {
//             setLoadingRoles(false);
//         }
//     };

//     const handleLoadDepartments = async () => {
//         try {
//             setLoadingDepartments(true);

//             const res = await DepartmentService.loadDepartment();

//             if (res.status === 200) {
//                 setDepartments(res.data.departments);
//             }
//         } catch (error) {
//             console.error(error);
//         } finally {
//             setLoadingDepartments(false);
//         }
//     };

//     useEffect(() => {
//         handleLoadRoles();
//         handleLoadDepartments();
//     }, []);

//     return (
//         <Modal isOpen={isOpen} onClose={onClose} showCloseButton>
//             <div className="w-full max-w-4xl">
//                 <form>
//                     {/* Header */}
//                     <div className="border-b border-gray-200 pb-4 mb-6">
//                         <h1 className="text-2xl font-semibold text-gray-800">
//                             Add User
//                         </h1>
//                         <p className="text-sm text-gray-500 mt-1">
//                             Fill in the user information below.
//                         </p>
//                     </div>

//                     {/* Form Grid */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                         <FloatingLabelInput
//                             label="First Name"
//                             type="text"
//                             name="first_name"
//                             value={firstName}
//                             onChange={(e) => setFirstName(e.target.value)}
//                             required
//                             errors={errors.first_name}
//                             autoFocus
//                         />

//                         <FloatingLabelInput
//                             label="Middle Name"
//                             type="text"
//                             name="middle_name"
//                             value={middleName}
//                             onChange={(e) => setMiddleName(e.target.value)}
//                             errors={errors.middle_name}
//                         />

//                         <FloatingLabelInput
//                             label="Last Name"
//                             type="text"
//                             name="last_name"
//                             value={lastName}
//                             onChange={(e) => setLastName(e.target.value)}
//                             required
//                             errors={errors.last_name}
//                         />

//                         <FloatingLabelInput
//                             label="Suffix Name"
//                             type="text"
//                             name="suffix_name"
//                             value={suffixName}
//                             onChange={(e) => setSuffixName(e.target.value)}
//                             errors={errors.suffix_name}
//                         />

//                         <FloatingLabelSelect
//                             label="Role"
//                             name="role"
//                             value={role}
//                             onChange={(e) => setRole(e.target.value)}
//                             errors={errors.role}
//                         >
//                             <option value="">Select Role</option>

//                             {loadingRoles ? (
//                                 <option>Loading...</option>
//                             ) : (
//                                 roles.map((role, index) => (
//                                     <option
//                                         value={role.role_id}
//                                         key={index}
//                                     >
//                                         {role.role_name}
//                                     </option>
//                                 ))
//                             )}
//                         </FloatingLabelSelect>

//                         <FloatingLabelSelect
//                             label="Department"
//                             name="department"
//                             value={department}
//                             onChange={(e) => setDepartment(e.target.value)}
//                             errors={errors.department}
//                         >
//                             <option value="">
//                                 Select Department/Office
//                             </option>

//                             {loadingDepartments ? (
//                                 <option>Loading...</option>
//                             ) : (
//                                 departments.map((department, index) => (
//                                     <option
//                                         value={department.department_id}
//                                         key={index}
//                                     >
//                                         {department.department_name}
//                                     </option>
//                                 ))
//                             )}
//                         </FloatingLabelSelect>

//                         <FloatingLabelInput
//                             label="Email"
//                             type="email"
//                             name="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             errors={errors.email}
//                             required
//                         />

//                         <FloatingLabelInput
//                             label="Username"
//                             type="text"
//                             name="username"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             errors={errors.username}
//                             required
//                         />

//                         <FloatingLabelInput
//                             label="Password"
//                             type="password"
//                             name="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             errors={errors.password}
//                             required
//                         />

//                         <FloatingLabelInput
//                             label="Confirm Password"
//                             type="password"
//                             name="password_confirmation"
//                             value={passwordConfirmation}
//                             onChange={(e) =>
//                                 setPasswordConfirmation(e.target.value)
//                             }
//                             errors={errors.password_confirmation}
//                             required
//                         />

//                         {/* Status */}
//                         <div className="md:col-span-2">
//                             <label className="block text-sm font-medium text-gray-700 mb-3">
//                                 Status
//                             </label>

//                             <div className="flex items-center gap-6">
//                                 <label className="flex items-center gap-2 cursor-pointer">
//                                     <input
//                                         type="radio"
//                                         name="status"
//                                         value="Active"
//                                         checked={status === "Active"}
//                                         onChange={(e) =>
//                                             setStatus(e.target.value)
//                                         }
//                                     />
//                                     <span>Active</span>
//                                 </label>

//                                 <label className="flex items-center gap-2 cursor-pointer">
//                                     <input
//                                         type="radio"
//                                         name="status"
//                                         value="Inactive"
//                                         checked={status === "Inactive"}
//                                         onChange={(e) =>
//                                             setStatus(e.target.value)
//                                         }
//                                     />
//                                     <span>Inactive</span>
//                                 </label>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Footer Buttons */}
//                     <div className="flex justify-end gap-3 border-t border-gray-200 mt-8 pt-5">
//                         <CloseButton
//                             label="Cancel"
//                             onClose={onClose}
//                         />

//                         <SubmitButton label="Save User" />
//                     </div>
//                 </form>
//             </div>
//         </Modal>
//     );
// };

// export default AddUserFormModal;