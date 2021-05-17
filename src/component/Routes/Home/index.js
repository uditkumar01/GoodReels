import { NavBar } from "../../component/NavBar";
import "./Home.css";
import CardCollection from "../../component/CardCollection";
import { SideBar } from "../../component/SideBar";
export default function Home({ sideBarOpen, setSideBarOpen }) {
    return (
        <>
            <SideBar
                sideBarOpen={sideBarOpen}
                setSideBarOpen={setSideBarOpen}
            />
            <div className={`home-container`}>
                <NavBar />

                <div className={`home-content`}>
                    <CardCollection title={"Recent Videos"} noOfVideos={10} />
                    <CardCollection title={"Popular Videos"} noOfVideos={10} />
                    <CardCollection
                        title={`More Videos`}
                        customClass={`container-grid`}
                    />
                </div>
            </div>
        </>
    );
}
