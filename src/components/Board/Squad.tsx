import { ChangeEvent, useContext, useState } from "react";
import styles from "@/styles/board/squad.module.scss";
import ColorBox from "./ColorBox";
import { ColorChangeHandler } from "react-color";
import Team from "../../tools/Team";
import Player from "../../tools/Player";
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
        if (num <= 6) {
            setNum((pre) => pre + 1);
            const xDist = Math.floor((viewport!.width || 0) / 6);
            const yDist = Math.floor((viewport!.height - 70 || 0) / 3);
            const player = new Player(
                {
                    x: xDist * (num + 1),
                    y: yDist * (teamOrder + 1),
                },
                team.color,
            );
            team.players.push(player);
            drawer.drawPlayer(player);
        }
    };

    const decreaseNum = () => {
        setNum((pre) => (pre - 1 >= 0 ? pre - 1 : pre));
        const playerRemoved = team.players.pop();
        if (playerRemoved) drawer.removePlayer(playerRemoved);
        drawer.renderAll();
    };

    const changeNum = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.matchAll(/[0-6][0-6]*/g)) {
            setNum(Number(e.target.value));
            team.players = team.players.slice(0, Number(e.target.value));
        }
    };

    const openColorBox = () => {
        setIsColorBoxOpen(true);
    };

    const changeColor: ColorChangeHandler = ({ hex }) => {
        setColor(hex);
        team.setColor(hex);
        setIsColorBoxOpen(false);
        drawer.renderAll();
    };

    return (
        <div className={styles["squad-container"]}>
            <h2 className={styles["squad-title"]}>Team {teamOrder + 1}</h2>
            <div className={styles["player-board-container"]}>
                <button
                    className={styles["preview"]}
                    style={{ backgroundColor: color }}
                    type="button"
                    onClick={openColorBox}
                />
                <input hidden />
                <ColorBox isOpen={isColorBoxOpen} onChange={changeColor} />
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
