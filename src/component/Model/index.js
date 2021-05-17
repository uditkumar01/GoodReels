import useModelContext from "../../Context/ModelContext";
import "./Model.css";

export default function Model({ children }) {
    const { modelOpen, setModelOpen } = useModelContext();
    return (
        <div className={`model-container ${modelOpen.state ? "" : "close"}`}>
            <div className={`model`}>
                <span
                    className={`close-btn`}
                    onClick={() => {
                        if (modelOpen.state)
                            setModelOpen({ ...modelOpen, state: false });
                    }}
                >
                    &times;
                </span>
                <div className={`model-header`}>{modelOpen.title}</div>
                <div className={`model-content`}>{children}</div>
                <div className={`model-footer`}></div>
            </div>
        </div>
    );
}
