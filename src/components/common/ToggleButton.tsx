import { useState } from "react";
import styles from "@/styles/common/togglebutton.module.scss";

interface ToggleButtonProps {
    preText?: string;
    proText?: string;
    callback?: <T>(...args: T[]) => unknown;
}

export default function ToggleButton({ preText, proText }: ToggleButtonProps) {
    const [activate, setActivate] = useState(false);

    return (
        <label
            className={styles["toggle-button"]}
            onClick={() => {
                setActivate(!activate);
            }}
        >
            <span>{preText}</span>
            <input
                className={styles["toggle-button-input"]}
                type={"checkbox"}
                checked={activate}
            />
            <span>{proText}</span>
        </label>
    );
}
