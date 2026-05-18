import { Route, Routes } from "react-router-dom"
import AppLayout from "../layout/AppLayout"
import RolePage from "../pages/Role/RolePage"
import EditRolePage from "../pages/Role/EditRolePage"
import DeleteRolePage from "../pages/Role/DeleteRolePage"
import DepartmentPage from "../pages/Department/DepartmentPage"
import EditDepartmentPage from "../pages/Department/EditDepartmentPage"
import DeleteDepartmentPage from "../pages/Department/DeleteDepartmentPage"
import UserMainPage from "../pages/User/UserMainPage"


const AppRoutes = () => {
    return (
        <>
                     {/* Roles-Permissions */}
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/roles-permissions" element={<RolePage />} />
                    <Route path="/roles-permissions/edit/:role_id" element={<EditRolePage />} />
                    <Route path="/roles-permissions/delete" element={<DeleteRolePage />} />

                    {/* Department */}
                    <Route path="/departments" element={<DepartmentPage />} />
                    <Route path="/departments/edit/:department_id" element={<EditDepartmentPage />} />
                    <Route path="/departments/delete" element={<DeleteDepartmentPage />} />

                    {/* Users */}
                    <Route path="/users" element={<UserMainPage />} />
                </Route>
            </Routes>
        </>
    )
}

export default AppRoutes;