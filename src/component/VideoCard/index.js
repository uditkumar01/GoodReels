import { useState } from "react";
import { IoEllipsisVertical } from "react-icons/all";
import { NavLink } from "react-router-dom";
import useDataContext from "../../Context/DataContext";
import DropDown from "../DropDown";
import Image from "../Image";
import { getThumbnail, IntToIndianStringFormat } from "../Utils";
import "./VideoCard.css";

export default function VideoCard({
    _id,
    title,
    channelName,
    channelImage,
    views,
    type,
    closeBtn,
}) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const {
        dataDispatch,
        dataState: { playlistData },
    } = useDataContext();
    return (
        <div
            className={`video-card ${
                type && type === "grid" ? "" : "set-width"
            }`}
        >
            <NavLink to={`/video/${_id}`} className={`video-thumbnail`}>
                <div
                    className={`video-card-img`}
                    style={{
                        backgroundImage: `url(${getThumbnail(_id)})`,
                    }}
                ></div>
            </NavLink>
            {closeBtn && (
                <span
                    className={`close-btn2`}
                    onClick={() => {
                        dataDispatch({
                            type: "PLAYLIST_REFRESH",
                            payload: playlistData.map((item) => {
                                if (item.name === closeBtn) {
                                    return {
                                        ...item,
                                        videoIds: item.videoIds.filter(
                                            (itemId) => itemId !== _id
                                        ),
                                    };
                                }
                                return { ...item };
                            }),
                        });
                    }}
                >
                    &times;
                </span>
            )}
            <div className={`video-card-details`}>
                <NavLink to={`/video/${_id}`} className={`video-card-title`}>
                    <p>{title}</p>
                    <DropDown
                        list={[
                            { name: "Save to Playlist" },
                            { name: "Copy link" },
                        ]}
                        dropdownOpen={dropdownOpen}
                        setDropdownOpen={setDropdownOpen}
                    >
                        <i
                            onClick={() =>
                                setDropdownOpen((dropdownOpen) => !dropdownOpen)
                            }
                        >
                            <IoEllipsisVertical />
                        </i>
                    </DropDown>
                </NavLink>
                <div className={`video-card-about`}>
                    <NavLink
                        to={`/video/${_id}`}
                        className={`channel channel-sm`}
                    >
                        <Image
                            src={channelImage}
                            height={40}
                            width={40}
                            customClass={`round`}
                        />
                        <span className={`name`}>{channelName}</span>
                    </NavLink>
                    <span className={`video-views`}>
                        {IntToIndianStringFormat(views || 0)} views
                    </span>
                </div>
            </div>
        </div>
    );
}
