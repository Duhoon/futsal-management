import { CirclePicker, ColorChangeHandler } from "react-color";
import { PLAYER_COLORS } from "@/constants/squad";

import styles from "@/styles/board/colorbox.module.scss";

interface ColorBoxProps {
    isOpen: boolean;
    onChange: ColorChangeHandler;
}

export default function ColorBox({ isOpen, onChange }: ColorBoxProps) {
    return isOpen ? (
        <CirclePicker
            className={styles.colorbox}
            colors={PLAYER_COLORS}
            onChange={onChange}
        />
    ) : (
        <></>
    );
}
