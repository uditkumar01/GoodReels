import "./DropDown.css";

export default function DropDown({
    children,
    list,
    dropdownOpen,
    setDropdownOpen,
    customClass,
    dropdownOption,
    setDropdownOption,
}) {
    return (
        <>
            <div
                className={`dropdown`}
                onBlur={() => {
                    setDropdownOpen(false);
                }}
                tabIndex={"0"}
            >
                {children}
                <ul
                    className={`dropdown-list ${dropdownOpen ? "" : "close"} ${
                        customClass ? customClass : ""
                    }`}
                >
                    {list.map(({ name, onClick }) => {
                        return (
                            <li
                                className={`dropdown-list-item`}
                                onClick={() => {
                                    setDropdownOpen(false);
                                    if (onClick) {onClick();}
                                    if(setDropdownOption) {
                                        setDropdownOption(name);
                                    }
                                }}
                            >
                                {name}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}
