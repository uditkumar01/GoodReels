import "./DropdownWithButton.css";
import { useState } from "react";
import DropDown from "../DropDown";
import Model from "../Model";
import { BiChevronDown } from "react-icons/all";
import useModelContext from "../../Context/ModelContext";

export default function DropdownWithButton({ addLabel, customClass, list, dropdownOption, setDropdownOption }) {
    // const { modelOpen, setModelOpen } = useModelContext();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    return (
        <DropDown
            list={list}
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
            customClass={`filter-dropdown`}
            dropdownOption={dropdownOption}
            setDropdownOption={setDropdownOption}
        >
            <div class="select">
                {addLabel && <p className={`tag-name`}>Sort By</p>}

                <button
                    className={`select-btn ${customClass?customClass:""}`}
                    onClick={() => {
                        setDropdownOpen((dropdownOpen) => !dropdownOpen);
                    }}
                >
                    <p>{list[0].name}</p>
                    <span>
                        <BiChevronDown />
                    </span>
                </button>
            </div>
        </DropDown>
    );
}
