import { ChangeEvent, useState } from "react";
import styles from "@/styles/board/squad.module.scss";
import ColorBox from "./ColorBox";
import { ColorChangeHandler } from "react-color";

export default function Squad() {
    const [isColorBoxOpen, setIsColorBoxOpen] = useState(false);

    const [color, setColor] = useState("");
    const [num, setNum] = useState(0);

    const increaseNum = () => {
        setNum((pre) => pre + 1);
    };

    const decreaseNum = () => {
        setNum((pre) => (pre - 1 >= 0 ? pre - 1 : pre));
    };

    const changeNum = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.matchAll(/[0-9][0-9]*/g)) {
            setNum(Number(e.target.value));
        }
    };

    const openColorBox = () => {
        setIsColorBoxOpen(true);
    };

    const handleColorChange: ColorChangeHandler = ({ hex }) => {
        setColor(hex);
        setIsColorBoxOpen(false);
    };

    return (
        <div className={styles["squad-container"]}>
            {/* <CirclePicker colors={["black", "red"]} width={"100%"} /> */}
            <div className={styles["player-board-container"]}>
                <button
                    className={styles["preview"]}
                    style={{ backgroundColor: color }}
                    type="button"
                    onClick={openColorBox}
                />
                <input hidden />
                <ColorBox
                    isOpen={isColorBoxOpen}
                    onChange={handleColorChange}
                />
            </div>
            <div className={styles["num-board-container"]}>
                <button
                    className={`${styles["button"]} ${styles["button-left"]}`}
                    onClick={decreaseNum}
                >
                    &lt;
                </button>
                <input
                    className={styles["display"]}
                    onChange={changeNum}
                    value={num}
                />
                <button
                    className={`${styles["button"]} ${styles["button-right"]}`}
                    onClick={increaseNum}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
}
