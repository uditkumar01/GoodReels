import { useToastContext } from "../../Context/ToastContext";
import { ToastItem } from "../ToastItem";
import "./Toast.css";

export function Toast() {
    const {
        toastListState: { toastList },
    } = useToastContext();
    // console.log(toastList);
    return (
        <div className="alert-container">
            {toastList.map((item) => {
                return <ToastItem key={item.id} {...item} />;
            })}
        </div>
    );
}
