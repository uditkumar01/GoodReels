import "./App.css";
import { SideBar } from "../SideBar";
import { useEffect, useState } from "react";
import { Loading } from "../Loading";
import axios from "axios";
import AllRoutes from "../Router";
import useDataContext from "../../Context/DataContext";
import useModelContext from "../../Context/ModelContext";
import Model from "../Model";
import { Toast } from "../Toast";
import { useAuthContext } from "../../Context/AuthProvider";

function App() {
    const [sideBarOpen, setSideBarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const { modelOpen, setModelOpen } = useModelContext();
    // const {} = use
    const {
        dataState: { videoData, playlistData },
        dataDispatch,
    } = useDataContext();
    const {
        authState: { current_user, isLoggedIn },
        authDispatch,
    } = useAuthContext();
    async function fetchData() {
        try {
            const res = await axios.get(
                "https://mockData.uditkumar01.repl.co/video"
            );
            // console.log(res.data.videos);
            dataDispatch({
                type: "VIDEO_UPDATE",
                payload: res.data.videos,
            });

            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }
    async function updateUserData() {
        // console.log(current_user, "id");
        if (current_user._id) {
            try {
                const res = await axios.post(
                    `https://mockdata.uditkumar01.repl.co/user/${current_user._id}`,
                    {
                        data: {
                            playlists: playlistData,
                        },
                    }
                );

                authDispatch({
                    type: "CURRENT_USER_UPDATE",
                    data: {
                        current_user: {
                            _id: res.data.user._id,
                            name: res.data.user.name,
                            email: res.data.user.email,
                        },
                    },
                });
            } catch (err) {
                console.log(err.message, current_user._id);
            }
        }
    }
    // useEffect(()=>{
    //     if(!current_user._id){
    //         const updateUser = localStorage.getItem('');
    //         authDispatch();
    //     }
    //     getPlaylist();
    // },[]);
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        updateUserData();
    }, [playlistData]);
    return (
        <div className={`App ${sideBarOpen ? "" : "side-close"}`}>
            <Model>{modelOpen.innerComponent}</Model>
            <Toast />
            <div className={`container`}></div>
            {loading && <Loading />}
            <AllRoutes
                sideBarOpen={sideBarOpen}
                setSideBarOpen={setSideBarOpen}
            />
        </div>
    );
}

export default App;
