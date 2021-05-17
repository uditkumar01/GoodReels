import useDataContext from "../../Context/DataContext";
import VideoCard from "../VideoCard";
import "./CardCollection.css";
import { randomize } from "../Utils";

export default function CardCollection({
    title,
    customClass,
    noOfVideos,
    onlyIds,
    closeBtn,
    playlistName,
}) {
    const {
        dataState: { videoData },
    } = useDataContext();
    // console.log(videoData);
    return (
        <div className={`card-container`}>
            <h1 className={`card-container-title`}>{title}</h1>
            <div
                className={`card-collection ${customClass ? customClass : ""}`}
            >
                {customClass !== "container-grid" && (
                    <div className={`blur-left`}></div>
                )}
                {randomize(videoData, noOfVideos).map((videoItem) => {
                    if (
                        !onlyIds ||
                        (videoItem && onlyIds.includes(videoItem._id))
                    ) {
                        return (
                            <VideoCard
                                {...videoItem}
                                type={
                                    customClass === `container-grid`
                                        ? `grid`
                                        : ``
                                }
                                closeBtn={closeBtn ? playlistName : undefined}
                            />
                        );
                    }
                })}
            </div>
        </div>
    );
}
