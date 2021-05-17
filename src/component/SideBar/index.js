import Image from "../Image";
import StackedList from "../StackedList";
import "./SideBar.css";
import {
    BsClockHistory,
    RiPlayList2Line,
    IoTimerOutline,
    BsGraphUp,
    VscLibrary,
    IoSettingsOutline,
    IoIosArrowBack,
    AiOutlineBars,
    AiOutlineLogin,
    AiOutlineLogout,
} from "react-icons/all";
import { NavLink } from "react-router-dom";
import { v4 as uuid } from "uuid";
import useDataContext from "../../Context/DataContext";
import { useAuthContext } from "../../Context/AuthProvider";
import { useToastContext } from "../../Context/ToastContext";
import { useEffect, useState } from "react";

export function SideBar({ sideBarOpen, setSideBarOpen }) {
    const {
        dataState: { videoData },
        dataDispatch,
    } = useDataContext();
    const {
        authDispatch,
        authState: { isLoggedIn },
    } = useAuthContext();
    const { toastListDispatch } = useToastContext();
    const [logMeOut, setLogMeOut] = useState(false);
    useEffect(() => {
        if (logMeOut) {
            localStorage.removeItem("GR_LOGIN");
        }
    }, [logMeOut]);
    return (
        <div className={`sidebar-container ${sideBarOpen ? "" : "close"}`}>
            <div className={`sidebar-footer`}>
                <div className={`footer-item`}>
                    <p className={`my-brand`}>
                        <b>Good </b>Reels
                    </p>
                    <button
                        className={"social-btn ham"}
                        onClick={() => {
                            setSideBarOpen((sideBarOpen) => !sideBarOpen);
                        }}
                    >
                        {sideBarOpen ? <IoIosArrowBack /> : <AiOutlineBars />}
                    </button>
                </div>
            </div>
            <div className={`sidebar-header`}>
                <Image
                    src={`https://i.pinimg.com/originals/fb/dc/c6/fbdcc6e2bde05d5a61ff419b7bfe30f5.jpg`}
                    height={sideBarOpen ? 55 : 40}
                    width={sideBarOpen ? 55 : 40}
                    customClass={`round`}
                />
                <div className={`user-details`}>
                    <b>Udit Kumar</b>
                    <span>India</span>
                </div>
            </div>
            <div className={`sidebar-content`}>
                <StackedList
                    title={`MEDIA`}
                    list={
                        !isLoggedIn
                            ? [
                                  {
                                      name: "Recent releases",
                                      icon: (
                                          <BsClockHistory
                                              style={{
                                                  fontSize: sideBarOpen
                                                      ? "1rem"
                                                      : "1rem",
                                              }}
                                          />
                                      ),
                                  },
                              ]
                            : [
                                  {
                                      name: "Recent releases",
                                      icon: (
                                          <BsClockHistory
                                              style={{
                                                  fontSize: sideBarOpen
                                                      ? "1rem"
                                                      : "1rem",
                                              }}
                                          />
                                      ),
                                  },
                                  {
                                      name: "Playlists",
                                      icon: (
                                          <RiPlayList2Line
                                              style={{
                                                  fontSize: sideBarOpen
                                                      ? "1.1rem"
                                                      : "1.1rem",
                                              }}
                                          />
                                      ),
                                      href: "playlist",
                                  },
                              ]
                    }
                />
                {isLoggedIn ? (
                    <StackedList
                        title={`ACCOUNT`}
                        list={[
                            {
                                name: "Library",
                                icon: (
                                    <VscLibrary
                                        style={{
                                            fontSize: sideBarOpen
                                                ? "1.2rem"
                                                : "1.2rem",
                                        }}
                                    />
                                ),
                                href: "library",
                            },
                            {
                                name: "Analytics",
                                icon: (
                                    <BsGraphUp
                                        style={{
                                            fontSize: sideBarOpen
                                                ? "1rem"
                                                : "1rem",
                                        }}
                                    />
                                ),
                            },
                            {
                                name: "Settings",
                                icon: (
                                    <IoSettingsOutline
                                        style={{
                                            fontSize: sideBarOpen
                                                ? "1.2rem"
                                                : "1.2rem",
                                        }}
                                    />
                                ),
                            },
                        ]}
                    />
                ) : (
                    ""
                )}
            </div>
            <div className={`sidebar-footer`}>
                <div className={`footer-item`}>
                    {isLoggedIn ? (
                        <button
                            className={"social-btn ham"}
                            onClick={() => {
                                // console.log("hello");
                                authDispatch({
                                    type: "LOGIN_STATUS_UPDATE",
                                    data: {
                                        isLoggedIn: false,
                                    },
                                });
                                toastListDispatch({
                                    type: "ADD_TOAST",
                                    data: {
                                        _id: uuid(),
                                        text: `You were logged out successfully!!!`,
                                        type: "success",
                                    },
                                });
                                setLogMeOut(true);
                            }}
                        >
                            {sideBarOpen ? (
                                <AiOutlineLogout />
                            ) : (
                                <AiOutlineLogout />
                            )}
                        </button>
                    ) : (
                        <NavLink to={`/login`}>
                            <button className={"social-btn ham"}>
                                {sideBarOpen ? (
                                    <AiOutlineLogin />
                                ) : (
                                    <AiOutlineLogin />
                                )}
                            </button>
                        </NavLink>
                    )}
                </div>
            </div>
        </div>
    );
}
