import { useEffect, useState } from "react";
import {
    AiOutlineDislike,
    AiOutlineLike,
    FaRegEye,
    FiRadio,
    IoEllipsisVertical,
    MdKeyboardArrowDown,
} from "react-icons/all";
import Image from "../Image";
import "./VideoIframe.css";
import Button from "../Button/index";
import DropDown from "../DropDown";
import { IntToIndianStringFormat } from "../Utils";
import useModelContext from "../../Context/ModelContext";
import PlaylistModelContent from "../PlaylistModelContent";
import axios from "axios";
import { useAuthContext } from "../../Context/AuthProvider";

export default function VideoIframe({
    _id,
    title,
    channelName,
    channelImage,
    views,
    likes,
    dislikes,
    channelLink,
    description,
    showDescription,
    setShowDescription,
    subscribers,
    randomDays,
}) {
    const { modelOpen, setModelOpen } = useModelContext();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [videoLike, setVideoLike] = useState(false);
    const [videoDislike, setVideoDislike] = useState(false);
    const {
        authState: { isLoggedIn },
    } = useAuthContext();
    async function updateVideoData(data) {
        try {
            const res = await axios.post(
                `https://mockdata.uditkumar01.repl.co/video/${_id}`,
                {
                    data,
                }
            );
        } catch (err) {
            console.log(err.message);
        }
    }
    useEffect(() => {
        updateVideoData({
            views: views + 1,
        });
    }, []);
    return (
        <>
            <iframe
                className="video-one"
                src={`https://www.youtube.com/embed/${_id}`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowfullscreen="allowfullscreen"
                mozallowfullscreen="mozallowfullscreen"
                msallowfullscreen="msallowfullscreen"
                oallowfullscreen="oallowfullscreen"
                webkitallowfullscreen="webkitallowfullscreen"
            ></iframe>
            <div className={`video-content`}>
                <div className={`about-video`}>
                    <span>{randomDays} days ago</span>
                    <p>
                        <b>
                            <FaRegEye className={`mr-05`} />
                            {IntToIndianStringFormat(views || 0)}
                        </b>
                        <i>
                            <DropDown
                                list={
                                    !isLoggedIn
                                        ? [
                                              {
                                                  name: "Copy link",
                                                  onClick: () => {
                                                      navigator.clipboard.writeText(
                                                          `https://goodreels.netlify.app/video/${_id}`
                                                      );
                                                  },
                                              },
                                          ]
                                        : [
                                              {
                                                  name: "Save to Playlist",
                                                  onClick: () => {
                                                      setModelOpen(
                                                          (modelOpen) => ({
                                                              ...modelOpen,
                                                              state: true,
                                                              innerComponent: (
                                                                  <>
                                                                      <PlaylistModelContent
                                                                          _id={
                                                                              _id
                                                                          }
                                                                      />
                                                                  </>
                                                              ),
                                                              title: "Add to Options",
                                                          })
                                                      );
                                                  },
                                              },
                                              {
                                                  name: "Copy link",
                                                  onClick: () => {
                                                      navigator.clipboard.writeText(
                                                          `https://goodreels.netlify.app/video/${_id}`
                                                      );
                                                  },
                                              },
                                          ]
                                }
                                dropdownOpen={dropdownOpen}
                                setDropdownOpen={setDropdownOpen}
                            >
                                <i
                                    className={`ellipses-btn`}
                                    onClick={() =>
                                        setDropdownOpen(
                                            (dropdownOpen) => !dropdownOpen
                                        )
                                    }
                                >
                                    <IoEllipsisVertical />
                                </i>
                            </DropDown>
                        </i>
                    </p>
                </div>
                <div className={`video-title`}>
                    <h1>{title}</h1>
                </div>
                <div className={`btns-container`}>
                    <i>
                        <button
                            className={"like-btn"}
                            onClick={() => {
                                if (isLoggedIn && !videoLike) {
                                    updateVideoData({ likes: likes + 1 });
                                }
                                setVideoLike((videoLike) => !videoLike);
                            }}
                        >
                            <AiOutlineLike />
                        </button>
                        <p>
                            {IntToIndianStringFormat(
                                videoLike ? likes + 1 : likes
                            )}
                        </p>
                    </i>

                    <i>
                        <button
                            className={"like-btn"}
                            onClick={() => {
                                if (isLoggedIn && videoDislike) {
                                    updateVideoData({ dislikes: dislikes + 1 });
                                }
                                setVideoDislike(
                                    (videoDislike) => !videoDislike
                                );
                            }}
                        >
                            <AiOutlineDislike />
                        </button>

                        <p>
                            {IntToIndianStringFormat(
                                videoDislike ? dislikes + 1 : dislikes
                            )}
                        </p>
                    </i>

                    {/* <i>
                        <button className={"like-btn"}>
                            <BiMessageSquareAdd />
                        </button>
                    </i>

                    <i>
                        <button className={"like-btn"}>
                            <AiOutlineShareAlt />
                        </button>
                    </i> */}
                </div>
                <div className={`channel`}>
                    <div className={`channel-info`}>
                        <Image
                            src={channelImage}
                            height={55}
                            width={55}
                            customClass={`round`}
                        />
                        <div className={"channel-name"}>
                            <p>{channelName}</p>
                            <span>{subscribers} subscribers</span>
                        </div>
                    </div>
                    <Button
                        customClass={"btn-lg"}
                        name={`Visit Channel`}
                        href={`https://www.youtube.com${channelLink}`}
                    />
                    <Button
                        customClass={"btn-sm"}
                        name={<FiRadio style={{ fontSize: "1.2rem" }} />}
                        href={`https://www.youtube.com${channelLink}`}
                    />
                </div>
                <div className={`video-collapsible`}>
                    <h4
                        onClick={() => {
                            setShowDescription(
                                (showDescription) => !showDescription
                            );
                        }}
                    >
                        {`more info`}
                        <MdKeyboardArrowDown />
                    </h4>
                    <ul
                        className={`info-list ${
                            showDescription ? "" : "close"
                        }`}
                    >
                        <li className={"description"}>
                            {description.split("\n").map(function (item, id) {
                                return (
                                    <span key={id}>
                                        {item}
                                        <br />
                                    </span>
                                );
                            })}
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
