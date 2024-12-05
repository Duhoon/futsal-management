import { ChangeEvent, useContext, useState } from "react";
import styles from "@/styles/board/squad.module.scss";
import ColorBox from "./ColorBox";
import { ColorChangeHandler } from "react-color";
import Team from "../Field/Team";
import Player from "../Field/Player";
import { useViewport } from "@/hooks";
import { DrawerCtx } from "@/contexts/DrawerCtx";

interface SquadProps {
    team: Team;
    teamOrder: number;
}

export default function Squad({ team, teamOrder }: SquadProps) {
    const drawer = useContext(DrawerCtx)!;
    const [viewport] = useViewport();

    const [isColorBoxOpen, setIsColorBoxOpen] = useState(false);
    const [color, setColor] = useState("");
    const [num, setNum] = useState(0);

    const increaseNum = () => {
        if (num < 12) {
            setNum((pre) => pre + 1);
            const xDist = Math.floor((viewport!.width || 0) / 6);
            const yDist = Math.floor((viewport!.height - 70 || 0) / 3);
            team.players.push(
                new Player({
                    x: xDist * (num + 1),
                    y: yDist * (teamOrder + 1),
                }),
            );
            drawer.drawTeam(team);
        }
    };

    const decreaseNum = () => {
        setNum((pre) => (pre - 1 >= 0 ? pre - 1 : pre));
        const playerRemoved = team.players.pop();
        if (playerRemoved) drawer.removePlayer(playerRemoved);
    };

    const changeNum = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.matchAll(/[0-9][0-9]*/g)) {
            setNum(Number(e.target.value));
            team.players = team.players.slice(0, Number(e.target.value));
        }
    };

    const openColorBox = () => {
        setIsColorBoxOpen(true);
    };

    const handleColorChange: ColorChangeHandler = ({ hex }) => {
        setColor(hex);
        team.setColor(hex);
        setIsColorBoxOpen(false);
        drawer.drawTeam(team);
    };

    return (
        <div className={styles["squad-container"]}>
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
