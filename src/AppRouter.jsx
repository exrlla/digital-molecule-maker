import { Routes, Route } from "react-router-dom";
import PasswordLock from "./PasswordLock";
import Maker from "./Maker";

function AppRouter() {
    return (

        <Routes>
            <Route path="/" element={<PasswordLock />} />
            <Route path="/maker" element={<Maker />} />
        </Routes>
       
    );
}

export default AppRouter;