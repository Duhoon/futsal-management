import styles from "@/styles/board/board.module.scss";
import { useRef } from "react";
import { FaX } from "react-icons/fa6";
import classNames from "classnames/bind";

import Squad from "./Squad";

import Team from "../../tools/Team";

const cn = classNames.bind(styles);

interface BoardProps {
    teams: Team[];
    isOpen: boolean;
    toggleBoard: () => void;
}

export default function Board({ teams, isOpen, toggleBoard }: BoardProps) {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div className={cn("board", { "board-collapsed": !isOpen })} ref={ref}>
            <div className={styles.head}>
                <button className={styles["icon-button"]} onClick={toggleBoard}>
                    <FaX className={styles["x-icon"]} />
                </button>
            </div>
            <div className={styles.body}>
                {teams.map((team, idx) => (
                    <Squad key={idx} team={team} teamOrder={idx} />
                ))}
            </div>
        </div>
    );
}
