import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import Login from "./pages/Login"
import AdminDashboard from "./pages/AdminDashboard"
import EmployeeDashboard from "./pages/EmployeeDashboard"
import PrivateRoutes from "./utils/PrivateRoutes"
import RoleBaseRoutes from "./utils/RoleBaseRoutes"
import AdminSummary from "./components/AdminSummary"
import DepartmentList from "./components/department/DepartmentList"

function App() {

  return (
    <BrowserRouter >
        <Routes>
            <Route path="/" element={<Navigate to="/admin-dashboard"  />} />
            <Route path="/login" element={<Login  />}  />
            <Route path="/admin-dashboard" element={
              <PrivateRoutes>
                  <RoleBaseRoutes requiredRole={["admin"]}>
                      <AdminDashboard  />
                  </RoleBaseRoutes>
              </PrivateRoutes>
              }>
                <Route index element={<AdminSummary  />}></Route>
                <Route path="/admin-dashboard/departments" element={<DepartmentList  />}></Route>
              </Route>

            <Route path="/employee-dashboard" element={<EmployeeDashboard  />}  />
        </Routes>
    </BrowserRouter>
  )
}

export default App
