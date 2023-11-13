import { Routes, Route } from "react-router-dom";
import PasswordLock from "./PasswordLock";
import Maker from "./Maker";
import Database from "./Database";

function AppRouter({socket}) {

    return (

        <Routes>
            <Route path="/" element={<PasswordLock />} />
            <Route path="/maker" element={<Maker socket={socket}/>} />
            <Route path="/database" element={<Database socket={socket}/>} />
        </Routes>
       
    );
}

export default AppRouter;