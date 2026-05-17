import { useEffect } from "react";
import AddRoleForm from "./components/AddRoleForm";
import RoleList from "./components/RoleList";

const RolePage = () => {
  useEffect(() => {
    document.title = "User Management Page";
  }, [])

  return (
    <>
      <div className="grid-cols-2 gap-4 ">
        <div className="col-span-2 md:col-span-1">
          <AddRoleForm />
        </div>
        <div className="col-span-2 md:col-span-1">
          <RoleList />
        </div>
      </div>
    </>

  )
}

export default RolePage;