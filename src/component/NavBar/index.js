import "./NavBar.css";
import {
    BsBell,
    GoPrimitiveDot,
    BsSearch,
    GoNote,
    AiOutlineLogin,
    FcFilmReel,
    BiChevronDown,
    AiOutlineLogout,
} from "react-icons/all";
import useModelContext from "../../Context/ModelContext";
import DropdownWithButton from "../DropdownWithButton";
import useDataContext from "../../Context/DataContext";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useToastContext } from "../../Context/ToastContext";
import { v4 as uuid } from "uuid";
import { useAuthContext } from "../../Context/AuthProvider";
export function NavBar({ fullWidth, fixed, leftPadSearchlist }) {
    // const [dropdownOpen, setDropdownOpen] = useState(false);
    const { modelOpen, setModelOpen } = useModelContext();
    const [searchText, setSearchText] = useState("");
    const [logMeOut, setLogMeOut] = useState(false);
    const {
        dataState: { videoData },
        dataDispatch,
    } = useDataContext();
    const {
        authDispatch,
        authState: { isLoggedIn },
    } = useAuthContext();
    const { toastListDispatch } = useToastContext();
    useEffect(() => {
        if (logMeOut) {
            localStorage.removeItem("GR_LOGIN");
        }
    }, [logMeOut]);
    return (
        <>
            <nav
                className={`navbar-container ${fullWidth ? "fullWidth" : ""} ${
                    fixed ? "nav-fixed" : ""
                }`}
            >
                <div className={`left-nav`}>
                    {fullWidth && (
                        <p className={`my-brand nav-brand`}>
                            <b>
                                <FcFilmReel />
                            </b>
                        </p>
                    )}
                    <input
                        type="text"
                        className={`form-text-field`}
                        placeholder={`search your query...`}
                        value={searchText}
                        onChange={(event) => {
                            setSearchText(event.target.value);
                        }}
                    />
                    <label>
                        <BsSearch />
                    </label>
                    <ul className={`search-list ${leftPadSearchlist?"left-3":""}`}>
                        {videoData.map(({ _id, title, description }) => {
                            if (
                                searchText &&
                                (searchText.includes(_id) ||
                                    _id.includes(searchText) ||
                                    searchText.includes(title) ||
                                    title.includes(searchText) ||
                                    searchText.includes(description) ||
                                    description.includes(searchText))
                            ) {
                                return (
                                    <NavLink
                                        to={`/video/${_id}`}
                                        onClick={() => {
                                            setSearchText("");
                                        }}
                                    >
                                        <li className={`search-item`}>
                                            <p className={`search-text`}>
                                                {title}
                                            </p>
                                        </li>
                                    </NavLink>
                                );
                            }
                        })}
                    </ul>
                </div>
                <div className={`right-nav`}>
                    {/* <div className={`drop-down`}>
                    <button className={`dropdown-btn`}>
                        Sort By
                        <RiArrowDropDownLine style={{marginLeft:"0.2rem", fontSize:"1.3rem"}} />
                    </button>
                </div>
                <div className={`drop-down`}>
                    <button className={`dropdown-btn`}>
                        Type <RiArrowDropDownLine style={{marginLeft:"0.2rem", fontSize:"1.3rem"}} />{" "}
                    </button>
                </div> */}
                    {/* <button
                        className={"nav-icon social-btn"}
                        onClick={() => {
                            setModelOpen((modelOpen) => ({
                                ...modelOpen,
                                innerComponent: (
                                    <DropdownWithButton
                                        list={[
                                            { name: "Upload Date" },
                                            { name: "Views Count" },
                                            { name: "Likes Count" },
                                        ]}
                                    />
                                ),
                                state: !modelOpen.state,
                                title: "Search Filters",
                            }));
                        }}
                    >
                        <GoNote />
                        <i><GoPrimitiveDot /></i>
                    </button> */}
                    {/* <button className={"nav-icon social-btn"}>
                    <BsBell />
                    <i><GoPrimitiveDot /></i>
                </button> */}
                    {isLoggedIn ? (
                        <button
                            className={"nav-icon social-btn sign-in"}
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
                            <AiOutlineLogout />
                        </button>
                    ) : (
                        <NavLink to={`/login`}>
                            <button className={"nav-icon social-btn sign-in"}>
                                <AiOutlineLogin />
                            </button>
                        </NavLink>
                    )}
                </div>
            </nav>
        </>
    );
}
