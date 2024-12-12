import styles from "@/styles/board/board.module.scss";
import { useContext, useRef } from "react";
import { FaX, FaTrashCan } from "react-icons/fa6";
import classNames from "classnames/bind";

import Squad from "./Squad";

import Team from "../../tools/Team";
import { DrawerCtx } from "@/contexts/DrawerCtx";
import { ToggleButton } from "../common";

const cn = classNames.bind(styles);

interface BoardProps {
    teams: Team[];
    isOpen: boolean;
    toggleBoard: () => void;
}

export default function Board({ teams, isOpen, toggleBoard }: BoardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const drawer = useContext(DrawerCtx);

    const removeAllHandler = () => {
        teams.forEach((team) => {
            while (team.players.length > 0) {
                const player = team.players.pop();
                drawer.removePlayer(player!);
            }
        });
    };

    return (
        <div className={cn("board", { "board-collapsed": !isOpen })} ref={ref}>
            <div className={styles.head}>
                <ToggleButton preText="Number" proText="Name" />
                <button className={styles["icon-button"]}>
                    <FaTrashCan
                        className={styles["icon"]}
                        onClick={removeAllHandler}
                    />
                </button>
                <button className={styles["icon-button"]} onClick={toggleBoard}>
                    <FaX className={cn([styles["icon"], styles["icon-x"]])} />
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
