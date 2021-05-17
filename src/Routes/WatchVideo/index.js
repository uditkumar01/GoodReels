import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { NavBar } from "../../component/NavBar";
import { getPlaylist, randomize } from "../../component/Utils";
import VideoIframe from "../../component/VideoIframe";
import VideoListItem from "../../component/VideoListItem";
import "./WatchVideo.css";
import useDataContext from "../../Context/DataContext";
import useModelContext from "../../Context/ModelContext";
import { useAuthContext } from "../../Context/AuthProvider";
export default function WatchVideo() {
    const [showDescription, setShowDescription] = useState(false);
    const {
        dataState: { videoData },
    } = useDataContext();
    const { videoId } = useParams();
    const { modelOpen, setModelOpen } = useModelContext();
    const randomDays = Math.floor(Math.random() * 10) + 1;
    const videoObj = videoData.find((item) => item._id === videoId);
    const {
        authState: { current_user, isLoggedIn },
        authDispatch,
    } = useAuthContext();
    const { dataDispatch } = useDataContext();
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
        <div className={`watch-video-container`}>
            <NavBar fullWidth={true} fixed={true} leftPadSearchlist={true} />
            <br className={`nav-void`} />
            {videoData.length > 0 ? (
                <div className={`video-container`}>
                    <div className={`test-container`}>
                        <div className={`video`}>
                            <VideoIframe
                                {...videoObj}
                                setModelOpen={setModelOpen}
                                showDescription={showDescription}
                                setShowDescription={setShowDescription}
                                randomDays={randomDays}
                                subscribers={
                                    [`993k`, `110k`, `1.2m`, `1.5m`, `10m`][
                                        Math.floor(Math.random() * 3) + 1
                                    ]
                                }
                            />
                        </div>
                    </div>
                    <div className={`suggestion-list`}>
                        {randomize(videoData, 20).map((videoItem) => {
                            if (videoItem._id !== videoId) {
                                return (
                                    <VideoListItem
                                        {...videoItem}
                                        type={"grid"}
                                    />
                                );
                            }
                        })}
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}
