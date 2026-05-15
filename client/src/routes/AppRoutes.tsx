import { Route, Routes } from "react-router-dom"
import AppLayout from "../layout/AppLayout"
import FloatingLabelInput from "../components/Input/FloatingLabelInput";
import FloatingLabelselect from "../components/Select/FloatingLabelselect";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../components/Table";


const SampleComponent = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [department, setDepartment] = useState("");

    const roles = [
        {
            value: "", text: "Select Role"
        },
        {
            value: 1,
            text: "Super Admin"
        },
        {
            value: 2,
            text: "Admin"
        },
        {
            value: 3,
            text: "Faculty/Staff"
        },
        {
            value: 4,
            text: "Student Republic"
        },
        {
            value: 5,
            text: "Student"
        }
    ]

    const departments = [
        {
            value: "", text: "Select Department"
        },
        {
            value: "CCS",
            text: "College of Computer Studies"
        },
        {
            value: "CS",
            text: "College of Computer Science"
        },
        {
            value: "CE",
            text: "College of Engineering"
        },
        {
            value: "CBA",
            text: "College of Business and Accountancy"
        },
        {
            value: "CCJE",
            text: "College of Criminal Justice Education"
        },
        {
            value: "GS",
            text: "Graduate School"
        },
        {
            value: "CTE",
            text: "College of Teacher's Education"
        }
    ]

    return (
        <>
            <h1 className="text-red-600 mb-4">Hello, World!</h1>
            <div className="mb-4">
                <FloatingLabelInput
                    label="Full Name"
                    type="text"
                    name="FullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    autoFocus
                />
                <p className="font-medium">FullName: {fullName}</p>
            </div>
            <div className="mb-4">
                <FloatingLabelInput
                    label="Email Address"
                    type="text"
                    name="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <p className="font-medium">Email: {email}</p>
            </div>
            <div className="mb-4">
                <FloatingLabelInput
                    label="Username"
                    type="text"
                    name="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <p className="font-medium">Username: {username}</p>
            </div>
            <div className="mb-4">
                <FloatingLabelInput
                    label="Password"
                    type="password"
                    name="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <p className="font-medium">Password: {password}</p>
            </div>
            <div className="mb-4">
                <FloatingLabelselect
                    label="Role"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    {roles.map((role, index) => (
                        <option value={role.value} key={index}>{role.text}</option>
                    ))}
                </FloatingLabelselect>
                <p className="font-medium">Role: {role}</p>
            </div>
            <div className="mb-4">
                <FloatingLabelselect
                    label="Department / Office"
                    name="department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                >
                    {departments.map((department, index) => (
                        <option value={department.value} key={index}>{department.text}</option>
                    ))}
                </FloatingLabelselect>
                <p className="font-medium">Department / Office: {department}</p>
            </div>
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                <div className="max-w-full max-h-[calc(100vh)] overflow-x-auto">
                    <Table>
                        <TableHeader className="border-b border-gray-100 bg-blue-600 text-white sticky top-0 z-30 text-xs">
                            <TableRow>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-center"
                                >
                                    No.
                                </TableCell>
                                <TableCell
                                    isHeader
                                    className="px-5 py-3 font-medium text-start"
                                >
                                    Role
                                </TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {roles.map((role, index) => (
                                <TableRow key={index}>
                                    <TableCell className="px-4 py-3 text-center">{role.value}</TableCell>
                                    <TableCell className="px-4 py-3 text-start">{role.text}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
};

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<SampleComponent />} />
                </Route>
            </Routes>
        </>
    )
}

export default AppRoutes