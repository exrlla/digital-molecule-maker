import { Routes, Route } from "react-router-dom";
import PasswordLock from "./PasswordLock";
import Maker from "./Maker";
import Database from "./Database";

function AppRouter() {

    return (

        <Routes>
            <Route path="/" element={<PasswordLock />} />
            <Route path="/maker" element={<Maker />} />
            <Route path="/database" element={<Database />} />
        </Routes>
       
    );
}

export default AppRouter;