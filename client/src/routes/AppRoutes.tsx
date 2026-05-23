import { Route, Routes } from "react-router-dom"
import AppLayout from "../layout/AppLayout"
import RolePage from "../pages/Role/RolePage"
import EditRolePage from "../pages/Role/EditRolePage"
import DeleteRolePage from "../pages/Role/DeleteRolePage"
import DepartmentPage from "../pages/Department/DepartmentPage"
import EditDepartmentPage from "../pages/Department/EditDepartmentPage"
import DeleteDepartmentPage from "../pages/Department/DeleteDepartmentPage"
import UserMainPage from "../pages/User/UserMainPage"
import TrashMainPage from "../pages/Trash/TrashMainPage"
import VenuePage from "../pages/Venue/VenuePage"
import EditVenuePage from "../pages/Venue/EditVenuePage"
import DeleteVenuePage from "../pages/Venue/DeleteVenuePage"


const AppRoutes = () => {
    return (
        <>

            <Routes>
                <Route element={<AppLayout />}>
                    {/* Dashboard */}
                    
                
                    {/* Roles-Permissions */}
                    <Route path="/roles-permissions" element={<RolePage />} />
                    <Route path="/roles-permissions/edit/:role_id" element={<EditRolePage />} />
                    <Route path="/roles-permissions/delete/:role_id" element={<DeleteRolePage />} />

                    {/* Department */}
                    <Route path="/departments" element={<DepartmentPage />} />
                    <Route path="/departments/edit/:department_id" element={<EditDepartmentPage />} />
                    <Route path="/departments/delete/:department_id" element={<DeleteDepartmentPage />} />

                    {/* Users */}
                    <Route path="/users" element={<UserMainPage />} />

                    {/* Venues */}
                    <Route path="/venue" element={<VenuePage />} />
                    <Route path="/venue/edit/:venue_id" element={<EditVenuePage />} />
                    <Route path="/venue/delete/:venue_id" element={<DeleteVenuePage />} />

                    {/* Events */}
                    {/* <Route path="/event-venue" element={<EventMainPage />} />
                    <Route path="/event-edit" element={<EditEventVenuePage />} />
                    <Route path="/event-delete" element={<DeleteEventVenuePage />} /> */}

                    {/* Activity Logs */}
                    

                    {/* Trash */}
                    <Route path="/user-trash" element={<TrashMainPage />} />
                </Route>
            </Routes>
        </>
    )
}

export default AppRoutes;