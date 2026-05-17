import AddDepartmentForm from "./components/AddDepartmentForm"
import DepartmentList from "./components/DepartmentList"

const DepartmentPage = () => {
  return (
    <>
          <div className="grid-cols-2 gap-4 ">
              <div className="col-span-2 md:col-span-1">
                  <AddDepartmentForm />
              </div>
              <div className="col-span-2 md:col-span-1">
                  <DepartmentList />
              </div>
          </div>
    </>
    
  )
}

export default DepartmentPage;