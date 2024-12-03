import styles from "@/styles/board/board.module.scss";
import { useRef } from "react";
import { FaX } from "react-icons/fa6";
import Squad from "./Squad";

import classNames from "classnames/bind";

const cn = classNames.bind(styles);

interface BoardProps {
    isOpen: boolean;
    toggleBoard: () => void;
}

export default function Board({ isOpen, toggleBoard }: BoardProps) {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div className={cn("board", { "board-collapsed": !isOpen })} ref={ref}>
            <div className={styles.head}>
                <button className={styles["icon-button"]} onClick={toggleBoard}>
                    <FaX className={styles["x-icon"]} />
                </button>
            </div>
            <div className={styles.body}>
                <Squad />
            </div>
        </div>
    );
}
