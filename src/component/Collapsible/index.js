import { useState } from "react";
import useDataContext from "../../Context/DataContext";
import Button from "../Button";
import DropDown from "../DropDown";
import DropdownWithButton from "../DropdownWithButton";
import "./Collapsible.css";

export default function Collapsible({ label, icon, videoId }) {
    const [playlistOpen, setPlaylistOpen] = useState(false);
    const [dropdownOption, setDropdownOption] = useState("Public");
    const [fieldText, setFieldText] = useState("");
    const [error, setError] = useState("");
    const {
        dataState: { playlistData },
        dataDispatch,
    } = useDataContext();
    // console.log(playlistData);
    return (
        <div className={`collapsible`}>
            <p
                className={`collapsible-btn`}
                onClick={() => {
                    setPlaylistOpen((playlistOpen) => !playlistOpen);
                }}
            >
                <i>{icon}</i> <p>{label}</p>
            </p>
            <ul className={`fields ${playlistOpen ? "" : "close"}`}>
                <li className={`text-field`}>
                    <div
                        class={`form-field ${
                            !error ? "primary-bg" : "danger-bg"
                        } bg-transparent`}
                    >
                        <input
                            class="input-field"
                            type="text"
                            onChange={(event) => {
                                setFieldText(event.target.value);
                            }}
                            value={fieldText}
                            required
                        />
                        <span
                            title="1-3 words at max"
                            class="fas fa-info info-bg bg-inherit icon"
                        ></span>
                        <label for="input" class="form-label">
                            Playlist Name
                        </label>
                        {error && <p class="form-help danger-bg">{error}</p>}
                        <hr />
                        <hr />
                    </div>
                </li>
                <li className={`text-field mt-05`}>
                    <DropdownWithButton
                        addLabel={false}
                        customClass={`set-min-width`}
                        dropdownOption={dropdownOption}
                        setDropdownOption={setDropdownOption}
                        list={[{ name: "Public" }, { name: "Private" }]}
                    />
                </li>
                <li className={`text-field mt-05`}>
                    <Button
                        name={`create new`}
                        onClick={() => {
                            // console.log("clicked");
                            const isAlreadyPresent = playlistData.find(
                                (item) => item.name === fieldText
                            );
                            if (!fieldText) {
                                setError("Field Empty");
                            } else if (!isAlreadyPresent) {
                                dataDispatch({
                                    type: "PLAYLIST_UPDATE",
                                    payload: [
                                        {
                                            name: fieldText,
                                            videoIds: [videoId],
                                        },
                                    ],
                                });
                            } else {
                                setError("Already Exists");
                            }
                        }}
                    />
                </li>
            </ul>
        </div>
    );
}
