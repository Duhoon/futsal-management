import styles from "@/styles/board.module.scss";
import { FaX } from "react-icons/fa6";

interface BoardProps {
    isOpen: boolean;
}

export default function Board({ isOpen }: BoardProps) {
    return (
        <aside
            className={`${styles.board} ${isOpen ? "" : styles["board-collapsed"]} `}
        >
            <div className={styles.head}>
                <button className={styles["icon-button"]}>
                    <FaX className={styles["x-icon"]} />
                </button>
            </div>
            <div className={styles.body}>
                <div>
                    <input type="number" />
                </div>
                <div>
                    <input type="number" />
                </div>
            </div>
        </aside>
    );
}
