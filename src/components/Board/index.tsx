import styles from "@/styles/board/board.module.scss";
import { useRef } from "react";
import { FaX } from "react-icons/fa6";
import Squad from "./Squad";

interface BoardProps {
    isOpen: boolean;
    toggleBoard: () => void;
}

export const Board = function Board({ isOpen, toggleBoard }: BoardProps) {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <aside
            className={`${styles.board} ${isOpen ? "" : styles["board-collapsed"]} `}
            ref={ref}
        >
            <div className={styles.head}>
                <button className={styles["icon-button"]} onClick={toggleBoard}>
                    <FaX className={styles["x-icon"]} />
                </button>
            </div>
            <div className={styles.body}>
                <Squad />
            </div>
        </aside>
    );
};
