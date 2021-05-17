import { NavBar } from "../../component/NavBar";
import "./Home.css";
import { SideBar } from "../../component/SideBar";
import CardCollection from "../../component/CardCollection";
import { useEffect } from "react";
import { useAuthContext } from "../../Context/AuthProvider";
import useDataContext from "../../Context/DataContext";
import { getPlaylist } from "../../component/Utils";
export default function Home({ sideBarOpen, setSideBarOpen }) {
    const {
        authState: { current_user, isLoggedIn },
        authDispatch,
    } = useAuthContext();
    const {
        dataDispatch,
        dataState: { playlistData },
    } = useDataContext();
    
    useEffect(() => {
        // console.log(current_user,"playlist");
        if (current_user._id) {
            getPlaylist(current_user, dataDispatch);
        }
    }, [isLoggedIn]);
    
    useEffect(() => {
        let userObj = localStorage.getItem("GR_LOGIN");
        if (!isLoggedIn && Boolean(userObj)) {
            console.log("inside");
            userObj = JSON.parse(userObj);
            authDispatch({
                type: "CURRENT_USER_UPDATE",
                data: { current_user: userObj },
            });
            authDispatch({
                type: "LOGIN_STATUS_UPDATE",
                data: {
                    isLoggedIn: true,
                },
            });
        }
    }, []);
    useEffect(() => {
        if (isLoggedIn) {
            if (Object.keys(current_user).length > 0) {
                localStorage.setItem("GR_LOGIN", JSON.stringify(current_user));
            }
        } else {
            console.log(isLoggedIn, current_user);
        }
    }, [isLoggedIn]);
    return (
        <>
            <SideBar
                sideBarOpen={sideBarOpen}
                setSideBarOpen={setSideBarOpen}
            />
            <div className={`home-container`}>
                <NavBar />

                <div className={`home-content`}>
                    <CardCollection title={"Recent Videos"} noOfVideos={10} />
                    <CardCollection title={"Popular Videos"} noOfVideos={10} />
                    <CardCollection
                        title={`More Videos`}
                        customClass={`container-grid`}
                    />
                </div>
            </div>
        </>
    );
}
