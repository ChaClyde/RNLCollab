import { useState, type FC } from "react";
import FloatingLabelInput from "../../../components/Input/FloatingLabelInput"
import Modal from "../../../components/Modal"
import FloatingLabelSelect from "../../../components/Select/FloatingLabelselect"
import SubmitButton from "../../../components/Button/SubmitButton";
import CloseButton from "../../../components/Button/CloseButton";

interface AddUserFormModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddUserFormModal: FC<AddUserFormModalProps> = ({
    isOpen,
    onClose
}) => {
    const [status, setStatus] = useState("Active");

    const roles = [
        {
            role_id: "",
            role_name: "Select Role",
            user_count: 5,
            status: "Active",
        },
        {
            role_id: "1",
            role_name: "Super Admin",
            user_count: 2,
            status: "Active",
        },
        {
            role_id: "2",
            role_name: "Event Coordinator",
            user_count: 2,
            status: "Active",
        },
        {
            role_id: "3",
            role_name: "Vehicle Coordinator",
            user_count: 2,
            status: "Active",
        },
        {
            role_id: "4",
            role_name: "Faculty / Staff",
            user_count: 10,
            status: "Active",
        },
        {
            role_id: "5",
            role_name: "Student Republic",
            user_count: 5,
            status: "Active",
        },
    ]

    const departments = [
        {
            department_id: "",
            department_name: "Select Department",
            user_count: 5,
            status: "Active",
        },
        {
            department_id: "1",
            department_name: "CCS",
            user_count: 2,
            status: "Active",
        },
        {
            department_id: "2",
            department_name: "COE",
            user_count: 2,
            status: "Active",
        },
        {
            department_id: "3",
            department_name: "CTE",
            user_count: 2,
            status: "Active",
        },
        {
            department_id: "4",
            department_name: "CAS",
            user_count: 10,
            status: "Active",
        },
        {
            department_id: "5",
            department_name: "CN",
            user_count: 5,
            status: "Active",
        },
    ]


    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} showCloseButton>
                <form>
                    <h1 className="text-2xl border-b border-gray-100 p-4 font-semibold mb-4">
                        Add User Form
                    </h1>
                    <div className="grid grid-cols-2 gap-4 border-b border-b-gray-100 mb-4">
                        <div className="mb-4">
                            <FloatingLabelInput label="First Name" type="text" name="first_name" required autoFocus />
                        </div>
                        <div className="mb-4">
                            <FloatingLabelInput label="Middle Name" type="text" name="middle_name" required />
                        </div>
                        <div className="mb-4">
                            <FloatingLabelInput label="Last Name" type="text" name="last_name" required />
                        </div>
                        <div className="mb-4">
                            <FloatingLabelInput label="Suffix Name" type="text" name="suffix_name" required />
                        </div>
                        <div className="mb-4">
                            <FloatingLabelSelect label="Role" name="role" >
                                {roles.map((role, index) => (
                                    <option value={role.role_id} key={index}>{role.role_name}</option>
                                ))}
                            </FloatingLabelSelect>
                        </div>
                        <div className="mb-4">
                            <FloatingLabelSelect label="Department" name="department" >
                                {departments.map((department, index) => (
                                    <option value={department.department_id} key={index}>{department.department_name}</option>
                                ))}
                            </FloatingLabelSelect>
                        </div>
                        <div className="mb-4">
                            <FloatingLabelInput label="Email" type="text" name="email" required />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <div className="mb-4">
                                <FloatingLabelInput label="Username" type="text" name="username" required />
                            </div>
                            <div className="mb-4">
                                <FloatingLabelInput label="Password" type="text" name="password" required />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <FloatingLabelInput label="Password Confirmation" type="text" name="password_confirmation" required />
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
                                        value="Active"
                                        checked={status === "Active"}
                                        onChange={(e) => setStatus(e.target.value)}
                                    />
                                    Active
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="Inactive"
                                        checked={status === "Inactive"}
                                        onChange={(e) => setStatus(e.target.value)}
                                    />
                                    Inactive
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-4">
                        <CloseButton label="Close" onClose={onClose} />
                        <SubmitButton label="Save User" />
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default AddUserFormModal