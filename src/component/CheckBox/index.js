import "./CheckBox.css";

export default function CheckBox({ label, checked, onClick }) {
    return (
        <div class="form-field primary-bg bg-inherit">
            <label class="checkbox-label">
                <input
                    type="checkbox"
                    class="input-checkbox"
                    onClick={onClick}
                    checked={checked}
                />
                <p class="tick-icon"></p>
                <small>{label}</small>
            </label>
        </div>
    );
}
