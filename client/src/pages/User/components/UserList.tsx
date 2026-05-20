import { useEffect, useState, type FC } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../../components/Table";
import type { UserColumns } from "../../../interfaces/UserColumns";
import UserService from "../../../services/UserService";
import Spinner from "../../../components/Spinner/Spinner";

interface UserListProps {
    onAddUser: () => void;
    onEditUser: (user: UserColumns | null) => void
    refreshKey: boolean;
}

const UserList: FC<UserListProps> = ({ onAddUser, onEditUser, refreshKey }) => {
    const [loadingUsers, setLoadingUsers] = useState(false)
    const [users, setUsers] = useState<UserColumns[]>([])

    const handleLoadUsers = async () => {
        try {
            setLoadingUsers(true)

            const res = await UserService.loadUsers();
            if (res.status === 200) {
                setUsers(res.data.users);
            } else {
                console.error('Unexpected status occured during loading users: ', res.status);
            }
        } catch (error) {
            console.error('Unexpected server error occured during load users: ', error);
        } finally {
            setLoadingUsers(false);
        }
    };

    const handleUserFullNameFormat = (user: UserColumns) => {
        let fullName = ""

        if (user.middle_name) {
            fullName = `${user.last_name}, ${user.first_name} ${user.middle_name.charAt(0)}.`
        } else {
            fullName = `${user.last_name}, ${user.first_name}`
        }
        if (user.suffix_name) {
            fullName += ` ${user.suffix_name}`;
        }

        return fullName;
    }; 

    useEffect(() => {
        handleLoadUsers();
    }, [refreshKey]);

    return (
        <>
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                <div className="max-w-full max-h-[calc(100vh)] overflow-x-auto">
                    <Table>
                        <caption className="mb-4">
                            <div className="border-b border-gray-100 p-4 flex justify-end">
                                <div className="py-2 flex justify-end">
                                    <button type="button" onClick={onAddUser} className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white font-medium rounded-lg shadow-lg transition cursor-pointer">
                                        Add User
                                    </button>
                                </div>
                            </div>
                        </caption>
                        <TableHeader className="border-b border-gray-200 bg-gray-950 sticky top-0 text-white text-xs">
                            <TableCell isHeader className="px-5 py-3 font-medium text-center">N0.</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-center">FULL NAME</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-center">ROLE</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-center">DEPARTMENT</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-center">EMAIL</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-center">STATUS</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-start">ACTIONS</TableCell>
                        </TableHeader>
                        <TableBody className="divide-y divide-gray-100 text-gray-500 text-sm">
                            {loadingUsers ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="px-4 py-3 text-center ">
                                        <Spinner size="md" />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                users.map((user, index) => (
                                    <TableRow className="hover:bg-gray-100" key={index}>
                                        <TableCell px-4 py-3 text-center items-center>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-start" >
                                            {handleUserFullNameFormat(user)}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-start">
                                            {user.role.role_name}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-start">
                                            {user.department.department_name}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-start">
                                            {user.email}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-start">
                                            {user.status}
                                        </TableCell>
                                        <TableCell px-4 py-3 text-center>
                                            <div className="flex text-center gap-4">
                                                <button type="button" className="text-green-600 hover:underline font-medium cursor-pointer" onClick={() =>onEditUser(user)}>Edit</button>
                                                <button type="button" className="text-red-600 hover:underline font-medium cursor-pointer">Delete</button>
                                            </div>
                                            
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
};

export default UserList;