import { useState } from "react";
import { IoEllipsisVertical } from "react-icons/all";
import DropDown from "../DropDown";
import { getThumbnail, IntToIndianStringFormat } from "../Utils";
import "./VideoListItem.css";
export default function VideoListItem({
    _id,
    title,
    views,
    type,
}) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    return (
        <div
            className={`video-card ${
                type && type === "grid" ? "" : "set-width"
            }`}
        >
            <div className={`video-thumbnail`}>
                <div
                    className={`video-card-img`}
                    style={{
                        backgroundImage: `url(${getThumbnail(_id)})`,
                    }}
                ></div>
            </div>
            <div className={`video-card-details`}>
                <div className={`video-card-title`}>
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
                </div>
                <div className={`video-card-about`}>
                    <span className={`video-views`}>{IntToIndianStringFormat(views)} views</span>
                </div>
            </div>
        </div>
    );
}
