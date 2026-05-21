
import { useEffect, useState, type FC } from "react";
import Spinner from "../../../components/Spinner/Spinner";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../../components/Table"
import DepartmentService from "../../../services/DepartmentService";
import { Link } from "react-router-dom";
import type { DepartmentsColumns } from "../../../interfaces/DepartmentInterface";

interface DepartmentListProps {
    refreshKey: boolean
}

const DepartmentList: FC<DepartmentListProps> = ({refreshKey}) => {
    const [loadingDepartments, setLoadingDepartments] = useState(false)
    const [departments, setDepartments] = useState<DepartmentsColumns[]>([])

    const handleLoadDepartments = async () => {
        try {
            setLoadingDepartments(true)

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
        handleLoadDepartments();
    }, [refreshKey]);
    return (
        <>
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                <div className="max-w-full max-h-[calc(100vh)] overflow-x-auto divide-y">
                    <Table>
                        <TableHeader className="border-b border-gray-200 bg-gray-950 sticky top-0 text-white text-xs">
                            <TableCell isHeader className="px-5 py-3 font-medium text-center">N0.</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-center">DEPARTMENT</TableCell>
                            {/* <TableCell isHeader className="px-5 py-3 font-medium text-center">USERS</TableCell> */}
                            <TableCell isHeader className="px-5 py-3 font-medium text-center">STATUS</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-start">ACTIONS</TableCell>
                        </TableHeader>
                        <TableBody className="diveide-y divide-gray-100 text-gray-500 text-sm">
                            {loadingDepartments ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="px-4 py-3 text-center">
                                        <Spinner size="md" />
                                    </TableCell>
                                </TableRow>
                            ) : departments.map((department, index) => (
                                <TableRow className="hover:bg-gray-100" key={index}>
                                    <TableCell className="px-4 py-3 text-center">{index + 1}</TableCell>
                                    <TableCell className="px-4 py-3 text-center">{department.department_name}</TableCell>
                                    <TableCell className="px-4 py-3 text-center">{department.status}</TableCell>
                                    <TableCell className="px-4 py-3 text-center">
                                        <div className="flex justify-start text-start items-start gap-4">
                                            <Link to={`/departments/edit/${department.department_id}`} className="text-green-600 font-medium hover:underline">
                                                Edit
                                            </Link>
                                            <Link to={`/departments/delete/${department.department_id}`} className="text-red-600 hover:underline font-medium">
                                               Delete
                                           </Link>
                                        </div>
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

export default DepartmentList;