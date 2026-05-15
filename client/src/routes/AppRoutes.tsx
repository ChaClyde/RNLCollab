import { Route, Routes } from "react-router-dom"
import AppLayout from "../layout/AppLayout"
import FloatingLabelInput from "../components/Input/FloatingLabelInput";


const SampleComponent = () => {
    return (
        <>
            <h1 className="text-red-600 mb-4">Hello, World!</h1>
            <div className="mb-4">
                <FloatingLabelInput
                    label="Role"
                    type="text"
                    name="Role"
                    required
                    autoFocus
                />
            </div>
            <div className="mb-4">
                <FloatingLabelInput
                    label="Description"
                    type="text"
                    name="Description"
                    required
                />
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