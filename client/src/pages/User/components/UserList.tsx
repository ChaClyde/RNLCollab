import type { FC } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../../components/Table";

interface UserListProps {
    onAddUser: () => void;
}

const UserList: FC<UserListProps> = ({onAddUser}) => {
    const users = [
        {
            user_id: 1,
            first_name: "John",
            middle_name: "",
            last_name: "Doe",
            suffix_name: "Jr.",
            role: "Admin",
            department: "CCS",
            email: "admin@gmail.com",
            username: "John123",
            action: (
                <>
                <div className="flex gap-4">
                        <button className="text-green-600 hover:underline font-medium cursor-pointer">Edit</button>
                        <button className="text-red-600 hover:underline font-medium cursor-pointer">Delete</button>
                </div>
                </>
            ),
        },
        {
            user_id: 2,
            first_name: "Mikha",
            middle_name: "Bini",
            last_name: "Lim",
            suffix_name: "",
            role: "Admin",
            department: "CCS",
            email: "admin@gmail.com",
            username: "RedFlag",
            action: (
                <>
                    <div className="flex gap-4">
                        <button className="text-green-600 hover:underline font-medium cursor-pointer">Edit</button>
                        <button className="text-red-600 hover:underline font-medium cursor-pointer">Delete</button>
                    </div>
                </>
            ),
        },
        {
            user_id: 3,
            first_name: "Joanna",
            middle_name: "Bini",
            last_name: "Robles",
            suffix_name: "Jr.",
            role: "Admin",
            department: "CCS",
            email: "admin@gmail.com",
            username: "Jowanaaa",
            action: (
                <>
                    <div className="flex gap-4">
                        <button className="text-green-600 hover:underline font-medium cursor-pointer">Edit</button>
                        <button className="text-red-600 hover:underline font-medium cursor-pointer">Delete</button>
                    </div>
                </>
            ),
        },
    ];

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
                            <TableCell isHeader className="px-5 py-3 font-medium text-center">FIRST NAME</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-center">MIDDLE NAME</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-center">LAST NAME</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-center">SUFFIX NAME</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-center">ROLE</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-center">DEPARTMENT</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-center">EMAIL</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-center">USERNAME</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-start">ACTIONS</TableCell>
                        </TableHeader>
                        <TableBody className="divide-y divide-gray-100 text-gray-500 text-sm">
                            {users.map((user, index) => (
                                <TableRow className="hover:bg-gray-100" key={index}>
                                    <TableCell className="px-4 py-3 text-center">
                                        {user.user_id}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-center">
                                        {user.first_name}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-center">
                                        {user.middle_name}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-center">
                                        {user.last_name}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-center">
                                        {user.suffix_name}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-center">
                                        {user.role}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-center">
                                        {user.department}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-center">
                                        {user.email}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-center">
                                        {user.username}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-center">
                                        {user.action}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
};

export default UserList;