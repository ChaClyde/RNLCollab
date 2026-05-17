import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../../components/Table"

const RoleList = () => {
    const roles = [
        {
            role_id: 1,
            role_name: "Super Admin",
            description: "Has access to all features and settings.",
            users_count: 5,
            status: "Active",
            action: (
                <>
                    <div className="flex gap-4">
                        <div>
                            <Link to="/roles-permissions/edit" className="text-green-800 hover:underline font-medium" >
                                Edit
                            </Link>
                        </div>
                        <div>
                            <Link to="/roles-permissions/delete" className="text-red-800 hover:underline font-medium" >
                                Delete
                            </Link>
                        </div>
                    </div>
                </>
            ),
        },
        {
            role_id: 1,
            role_name: "Super Admin",
            description: "Has access to all features and settings.",
            users_count: 5,
            status: "Active",
            action: (
                <>
                    <div className="flex gap-4">
                        <div>
                            <Link to="/roles-permissions/edit" className="text-green-800 hover:underline font-medium" >
                                Edit
                            </Link>
                        </div>
                        <div>
                            <Link to="/roles-permissions/delete" className="text-red-800 hover:underline font-medium" >
                                Delete
                            </Link>
                        </div>
                    </div>
                </>
            ),
        },
        {
            role_id: 1,
            role_name: "Super Admin",
            description: "Has access to all features and settings.",
            users_count: 5,
            status: "Active",
            action: (
                <>
                    <div className="flex gap-4">
                        <div>
                            <Link to="/roles-permissions/edit" className="text-green-800 hover:underline font-medium" >
                                Edit
                            </Link>
                        </div>
                        <div>
                            <Link to="/roles-permissions/delete" className="text-red-800 hover:underline font-medium" >
                                Delete
                            </Link>
                        </div>
                    </div>
                </>
            ),
        },
    ];

    return (
        <>
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                <div className="max-w-full max-h[calc(100vh)] overflow-x-autouto">
                    <Table>
                        <TableHeader className="border-b border-gray-200 bg-gray-950 sticky top-0 text-white text-xs">
                            <TableCell isHeader className="px-5 py-3 font-medium text-center">N0.</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-center">ROLE</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-center">USERS</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-center">STATUS</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-start">ACTIONS</TableCell>
                        </TableHeader>
                        <TableBody className="diveide-y divide-gray-100 text-gray-500 text-sm">
                            {roles.map((role, index) => (
                                <TableRow className="hover:bg-gray-100" key={index}>
                                    <TableCell className="px-4 py-3 text-center">
                                        {role.role_id}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-center">
                                        {role.role_name}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-center">
                                        {role.users_count}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-center">
                                        {role.status}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-center">
                                        {role.action}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default RoleList;