import { NavLink } from "react-router-dom";
import "./StackedList.css";

export default function StackedList({ title, list }) {
    return (
        <ul className={`stacked-list`}>
            <li className={`list-head`}>{title}</li>
            {list.map(({ name, icon, href }) => {
                if (href) {
                    return (
                        <NavLink to={`/${href}`}>
                            <li className={`list-item`}>
                                <i>{icon}</i>
                                <p>{name}</p>
                            </li>
                        </NavLink>
                    );
                } else {
                    return (
                        <li className={`list-item`}>
                            <i>{icon}</i>
                            <p>{name}</p>
                        </li>
                    );
                }
            })}
        </ul>
    );
}
