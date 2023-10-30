import { Routes, Route } from "react-router-dom";
import PasswordLock from "./PasswordLock";

function AppRouter() {
    return (

        <Routes>
            <Route path="/" element={<PasswordLock />} />
        </Routes>
       
    );
}

export default AppRouter;