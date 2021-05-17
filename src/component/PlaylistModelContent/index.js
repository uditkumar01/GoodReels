import { RiFolderAddLine } from "react-icons/all";
import useDataContext from "../../Context/DataContext";
import CheckBox from "../CheckBox";
import Collapsible from "../Collapsible";

export default function PlaylistModelContent({ _id }) {
    const {
        dataState: { playlistData },
        dataDispatch,
    } = useDataContext();
    // console.log("inside", playlistData);
    return (
        <>
            {/* <CheckBox label={"watch later"} /> */}
            {playlistData.map(({ name, videoIds }) => {
                const isVideoInPlayist = videoIds.includes(_id);
                const getType = () => {
                    return isVideoInPlayist ? "REMOVE_VIDEO" : "ADD_VIDEO";
                };
                return (
                    <div
                        key={name}
                        class="form-field primary-bg bg-inherit"
                        onClick={(event) => {
                            event.preventDefault();
                            // console.log("going");
                            dataDispatch({
                                type: getType(),
                                payload: { _id, name },
                            });
                        }}
                    >
                        <label class="checkbox-label">
                            <input
                                type="checkbox"
                                class="input-checkbox"
                                checked={isVideoInPlayist}
                            />
                            <p class="tick-icon"></p>
                            <small>{name}</small>
                        </label>
                    </div>
                );
            })}
            <Collapsible
                label={`add playlist`}
                icon={<RiFolderAddLine />}
                videoId={_id}
            />
        </>
    );
}
