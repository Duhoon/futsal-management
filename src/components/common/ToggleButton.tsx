import { useState } from "react";
import styles from "@/styles/common/togglebutton.module.scss";

interface ToggleButtonProps {
    preText?: string;
    proText?: string;
    callback?: <T>(...args: T[]) => unknown;
}

export default function ToggleButton({
    preText,
    proText,
    callback,
}: ToggleButtonProps) {
    const [activate, setActivate] = useState(true);

    return (
        <label
            className={styles["toggle-button"]}
            onClick={() => {
                callback && callback();
                setActivate(!activate);
            }}
        >
            <span>{preText}</span>
            <input
                className={styles["toggle-button-input"]}
                type={"checkbox"}
                value={`${activate}`}
            />
            <span>{proText}</span>
        </label>
    );
}
