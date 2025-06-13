import AdminDashboard from "./AdminDashboard";
import Dashboard from "./Dashboard";
import RegisterForm from "./Form";
import LoginForm from "./Loginform";
import { BrowserRouter, Router,Routes, Route } from "react-router-dom";
export default function Formroutes(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/register" element={<RegisterForm/>}/>
            <Route path="/login" element={<LoginForm/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
        </Routes>
        </BrowserRouter>
    )
}
