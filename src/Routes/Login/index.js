import { useEffect } from "react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import { getPlaylist, handlePasswordChars, isEmail } from "../../component/Utils";
import { useAuthContext } from "../../Context/AuthProvider";
import { useToastContext } from "../../Context/ToastContext";
import { FormCard } from "../../component/FormCard";
import { FormField } from "../../component/FormField";
import { BsChevronRight, FcFilmReel } from "react-icons/all";
import "./Login.css";
import useDataContext from "../../Context/DataContext";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { toastListDispatch } = useToastContext();
    const navigate = useNavigate();
    const {
        authState: { isLoggedIn, current_user },
        authDispatch,
        loginUser,
    } = useAuthContext();
    const { dataDispatch } = useDataContext();
    const handleFormSubmission = async (event) => {
        event.preventDefault();
        // console.log(event.target[0].value, "form");
        // console.log(event.target[1].value, "form");

        const { toast, type, user, playlists } = await loginUser(
            event.target[0].value,
            event.target[1].value
        );
        // console.log({toast, type});
        toastListDispatch({
            type: "ADD_TOAST",
            data: {
                _id: uuid(),
                text: toast,
                type: type,
            },
        });
        if (type === "success") {
            authDispatch({
                type: "LOGIN_STATUS_UPDATE",
                data: { isLoggedIn: true },
            });
            if (user) {
                console.log("setting user");
                authDispatch({
                    type: "CURRENT_USER_UPDATE",
                    data: { current_user: user },
                });
                console.log(playlists);
                dataDispatch({
                    type: "PLAYLIST_REFRESH",
                    payload: playlists ? playlists : [],
                });
            }
            navigate("/", { replace: true });
        }
    };
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
            navigate("/", { replace: true });
        }
        // console.log(isLoggedIn);
        // console.log("user", user);
    }, [isLoggedIn]);

    return (
        <FormCard>
            <form
                className="login-card"
                onSubmit={async (event) => {
                    handleFormSubmission(event);
                }}
            >
                <div className="login-upper-part">
                    <i className={`logo-text`}>
                        <FcFilmReel className={`logo-icon`} /> <b>Good</b> Reels
                    </i>
                    <FormField
                        label={"Email"}
                        textFilter={(checkText) => {
                            return true;
                        }}
                        setFieldText={setEmail}
                        field={email}
                        type={"text"}
                        error={isEmail(email)}
                    />

                    <FormField
                        label={"Password"}
                        textFilter={(checkText) => {
                            return true;
                        }}
                        setFieldText={setPassword}
                        field={password}
                        type={"password"}
                        error={handlePasswordChars(password)}
                    />
                </div>
                <div className="login-lower-part">
                    <NavLink to="/signup">
                        <a className="">Sign up</a>
                    </NavLink>
                    <button type="submit" className="btn-block-custom br-round">
                        <BsChevronRight />
                    </button>
                </div>
            </form>
        </FormCard>
    );
}
