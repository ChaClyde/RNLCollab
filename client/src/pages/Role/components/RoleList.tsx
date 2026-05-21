import { useEffect, useState, type FC } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../../components/Table"
import RoleService from "../../../services/RoleService";
import Spinner from "../../../components/Spinner/Spinner";
import { Link } from "react-router-dom";
import type { RoleColumns } from "../../../interfaces/RoleInterface";

interface RoleListProps {
    refreshKey: boolean
}

const RoleList:FC<RoleListProps> = ({refreshKey}) => {
    const [loadingRoles, setLoadingRoles] = useState(false)
    const [roles, setRoles] = useState<RoleColumns[]>([])

    const handleLoadRoles = async () => {
        try {
            setLoadingRoles(true)

            const res = await RoleService.loadRoles()
            if(res.status === 200) {
                setRoles(res.data.roles)
            } else {
                console.error('Unexpected status error occured during load roles: ', res.status)
            }
        } catch(error) {
            console.error('Unexpected server error occured during loading roles: ', error)
        } finally {
            setLoadingRoles(false);
        }
    };

    useEffect(() => {
        handleLoadRoles();
    }, [refreshKey]);

    return (
        <>
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                <div className="max-w-full max-h-[calc(100vh)] overflow-x-auto divide-y">
                    <Table>
                        <TableHeader className="border-b border-gray-200 bg-gray-950 sticky top-0 text-white text-xs">
                            <TableCell isHeader className="px-5 py-3 font-medium text-center">N0.</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-start">ROLE</TableCell>
                            {/* <TableCell isHeader className="px-5 py-3 font-medium text-center">USERS</TableCell> */}
                            <TableCell isHeader className="px-5 py-3 font-medium text-center">STATUS</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-start">ACTIONS</TableCell>
                        </TableHeader>
                        <TableBody className="diveide-y divide-gray-100 text-gray-500 text-sm">
                           {loadingRoles ? (
                            <TableRow>
                                <TableCell colSpan={5} className="px-4 py-3 text-center">
                                    <Spinner size="md" />
                                </TableCell>
                            </TableRow>
                           ) : roles.map((role, index) => (
                                <TableRow className="hover:bg-gray-100" key={index}>
                                    <TableCell className="px-4 py-3 text-center">{index + 1}</TableCell>
                                   <TableCell className="px-4 py-3 text-start">{role.role_name}</TableCell>
                                   <TableCell className="px-4 py-3 text-center">{role.status}</TableCell>
                                   <TableCell className="px-4 py-3 text-center">
                                    <div className="flex justify-start text-start items-start gap-4">
                                           <Link to={`/roles-permissions/edit/${role.role_id}`} className="text-green-600 font-medium hover:underline">
                                           Edit
                                           </Link>
                                           <Link to={`/roles-permissions/delete/${role.role_id}`} className="text-red-600 hover:underline font-medium">
                                               Delete
                                           </Link>
                                    </div>
                                   </TableCell>
                                </TableRow>
                           )) }
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default RoleList;