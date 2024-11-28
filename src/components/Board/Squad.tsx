import { ChangeEvent, useState } from "react";
import styles from "@/styles/board/squad.module.scss";
import { CirclePicker } from "react-color";

export default function Squad() {
    const [color, setColor] = useState();
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

    return (
        <div className={styles["squad-container"]}>
            {/* <CirclePicker colors={["black", "red"]} width={"100%"} /> */}
            <div className={styles["player-board-container"]}>
                <button className={styles["preview"]} type="button" />
                <input hidden />
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
                    type="number"
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
