import { useEffect, useState, type FC, type FormEvent } from "react"
import CloseButton from "../../../components/Button/CloseButton"
import SubmitButton from "../../../components/Button/SubmitButton"
import Modal from "../../../components/Modal"
import type { UserColumns } from "../../../interfaces/UserInterface"
import UserService from "../../../services/UserService"

interface DeleteUserFormModalProps {
    user: UserColumns | null
    onDeleteUser: (message: string) => void
    refreshKey: () => void
    isOpen: boolean
    onClose: () => void
}

const DeleteUserFormModal: FC<DeleteUserFormModalProps> = ({
    user,
    onDeleteUser,
    refreshKey,
    isOpen,
    onClose,
}) => {
    const [loadingDestroy, setLoadingDestroy] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [suffixName, setSuffixName] = useState("");
    const [role, setRole] = useState("");
    const [department, setDepartment] = useState("");
    const [status, setStatus] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    const handleDestroyUser = async (e: FormEvent) => {
        try {
            e.preventDefault();

            setLoadingDestroy(true)

            const res = await UserService.destroyUser(user?.user_id!)

            if(res.status === 200) {
                onDeleteUser(res.data.message);
                refreshKey()
                onClose()
            } else {
                console.error('Unexpected error occured during deleting user: ', res.status)
            }
        } catch(error) {
            console.error('Unexpected server error occured during deleting user: ', error)
        } finally {
            setLoadingDestroy(false)
        }
    }

    useEffect(() => {
        if (user) {
            setFirstName(user.first_name);
            setMiddleName(user.middle_name ?? '');
            setLastName(user.last_name);
            setSuffixName(user.suffix_name ?? '');
            setRole(user.role.role_name);
            setDepartment(user.department.department_name);
            setStatus(user.status);
            setEmail(user.email);
            setUsername(user.username);
        } else {
            console.error('Unexpected user error occured during getting user details: ', user)
        }
    }, [user]);

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} showCloseButton >
                <form onSubmit={handleDestroyUser}>
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6 px-1">
                        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                            Delete User Form
                        </h1>
                    </div>
                    <div className="grid grid-cols-2 gap-4 border-b border-b-gray-100 mb-4">
                        <div className="mb-4">
                            <label htmlFor="first_name" className="text-black font-medium mb-2">First Name</label>
                            <p className="text-gray-500 font-medium">{firstName}</p>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="middle_name" className="text-black font-medium mb-2">Middle Name</label>
                            <p className="text-gray-500 font-medium">{middleName || 'N/A'}</p>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="last_name" className="text-black font-medium mb-2">Last Name</label>
                            <p className="text-gray-500 font-medium">{lastName}</p>
                            <div className="mb-4">
                                <label htmlFor="suffix_name" className="text-black font-medium mb-2">Suffix Name</label>
                                <p className="text-gray-500 font-medium">{suffixName || 'N/A'}</p>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="role_name" className="text-black font-medium mb-2">Role Name</label>
                                <p className="text-gray-500 font-medium">{role}</p>
                                <div className="mb-4">
                                    <label htmlFor="department_name" className="text-black font-medium mb-2">Department Name</label>
                                    <p className="text-gray-500 font-medium">{department}</p>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="text-black font-medium mb-2">Email</label>
                                    <p className="text-gray-500 font-medium">{email}</p>
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <div className="mb-4">
                                        <label htmlFor="username" className="text-black font-medium mb-2">Username</label>
                                        <p className="text-gray-500 font-medium">{username}</p>
                                    </div>
                                </div>
                                <div className="mb-4 col-span-2">
                                    <label htmlFor="status_name" className="text-black font-medium mb-2">Status</label>
                                    <p className="text-gray-500 font-medium">{status}</p>
                                </div>
                            </div>
                            <div className="flex justify-end gap-4">
                                {!loadingDestroy && (
                                    <CloseButton label="Close" onClose={onClose} />
                                )}
                                <SubmitButton className="bg-red-600 hover:bg-red-700" label="Delete User" loading={loadingDestroy} loadingLabel="Deleting User..." />
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default DeleteUserFormModal;