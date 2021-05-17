import { Routes, Route } from "react-router-dom";
import WatchVideo from "../../Routes/WatchVideo";
import Home from "../../Routes/Home";
import { Login } from "../../Routes/Login";
import { SignUp } from "../../Routes/SignUp";
import Library from "../../Routes/Library";
export default function AllRoutes({ sideBarOpen, setSideBarOpen }) {
    return (
        <Routes>
            <Route
                path={`/`}
                element={
                    <Home
                        sideBarOpen={sideBarOpen}
                        setSideBarOpen={setSideBarOpen}
                    />
                }
            />
            <Route path={`/video/:videoId`} element={<WatchVideo />} />
            <Route path={`/login`} element={<Login />} />
            <Route path={`/signup`} element={<SignUp />} />
            <Route
                path={`/playlist`}
                element={
                    <Library
                        sideBarOpen={sideBarOpen}
                        setSideBarOpen={setSideBarOpen}
                    />
                }
            />
            <Route
                path={`/library`}
                element={
                    <Library
                        sideBarOpen={sideBarOpen}
                        setSideBarOpen={setSideBarOpen}
                        heading={'library'}
                    />
                }
            />
        </Routes>
    );
}
