import "./Image.css";
export default function Image({ src, height, width, customClass }) {
    return (
        <>
            <div
                className={`img ${customClass ? customClass : ""}`}
                style={{
                    minHeight: `${height}px`,
                    minWidth: `${width}px`,
                    maxHeight: `${height}px`,
                    maxWidth: `${width}px`,
                    backgroundImage: `url(${src})`,
                }}
            ></div>
        </>
    );
}
