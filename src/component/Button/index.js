import "./Button.css";

export default function Button({ name, href, customClass, onClick }) {
    return (
        <>
            {href ? (
                <a
                    className={`btn ${customClass ? customClass : ""}`}
                    href={href}
                    onClick={onClick}
                >
                    {name}
                </a>
            ) : (
                <button
                    className={`btn ${customClass ? customClass : ""}`}
                    onClick={onClick}
                >
                    {name}
                </button>
            )}
        </>
    );
}
