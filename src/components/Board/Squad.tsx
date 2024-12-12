import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useViewport } from "@/hooks";
import ColorBox from "./ColorBox";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import { ColorChangeHandler } from "react-color";

import styles from "@/styles/board/squad.module.scss";

import { DrawerCtx } from "@/contexts/DrawerCtx";
import { FIELD_PADDING } from "@/constants/draw";
import { matchNames } from "@/utils/regexp";

import Team from "../../tools/Team";
import Player from "../../tools/Player";
import { MAX_PLAYER_NUM } from "@/constants/squad";

interface SquadProps {
    team: Team;
    teamOrder: number;
}

export default function Squad({ team, teamOrder }: SquadProps) {
    const drawer = useContext(DrawerCtx)!;
    const [viewport] = useViewport();
    const width = viewport && viewport.width >= 600 ? 600 : viewport?.width;

    const [isColorBoxOpen, setIsColorBoxOpen] = useState(false);
    const [isListOpen, setIsListOpen] = useState(false);

    const [names, setNames] = useState<string[]>([]);
    const [color, setColor] = useState("");
    const [num, setNum] = useState(0);

    const increaseNum = () => {
        if (num < 6) {
            setNum((pre) => pre + 1);
            const xDist = Math.floor((width || 0) / MAX_PLAYER_NUM);
            const yHalf = Math.floor((viewport!.height - 70 || 0) / 2);
            const player = new Player(
                {
                    x: xDist * num,
                    y: yHalf / 2 + yHalf * teamOrder - FIELD_PADDING * 2,
                },
                String(num + 1),
                team.color,
            );
            team.players.push(player);
            drawer.drawPlayer(player);

            setNames((pre) => [...pre, ""]);
        }
    };

    const decreaseNum = () => {
        setNum((pre) => (pre - 1 >= 0 ? pre - 1 : pre));
        const playerRemoved = team.players.pop();
        if (playerRemoved) drawer.removePlayer(playerRemoved);
        drawer.renderAll();

        setNames((pre) => pre.slice(0, pre.length - 1));
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

    const closeColorBox = () => {
        setIsColorBoxOpen(false);
    };

    const changeColor: ColorChangeHandler = ({ hex }) => {
        setColor(hex);
        team.setColor(hex);
        setIsColorBoxOpen(false);
        drawer.renderAll();
    };

    const changeName = (idx: number) => {
        return (e: ChangeEvent<HTMLInputElement>) => {
            if (matchNames(e.target.value)) {
                setNames((pre) => {
                    pre[idx] = e.target.value;
                    return [...pre];
                });
            }
        };
    };

    useEffect(() => {
        if (window && isColorBoxOpen) {
            setTimeout(
                () => window.addEventListener("click", closeColorBox),
                0,
            );

            return () => {
                window.removeEventListener("click", closeColorBox);
            };
        }
    }, [isColorBoxOpen]);

    useEffect(() => {
        if (viewport && viewport.width > 1024 && !isListOpen) {
            setIsListOpen(true);
        }
    }, [viewport, isListOpen]);

    return (
        <div className={styles["squad-container"]}>
            <div className={styles["preview-wrapper"]}>
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
            <div
                className={styles["list-trigger"]}
                onClick={() => {
                    setIsListOpen(!isListOpen);
                }}
            >
                {isListOpen ? (
                    <FaCaretUp className={styles["list-trigger-icon"]} />
                ) : (
                    <FaCaretDown className={styles["list-trigger-icon"]} />
                )}
            </div>
            <ul className={styles["list"]}>
                {isListOpen &&
                    names.map((name, idx) => {
                        return (
                            <li key={idx} className={styles["list-item"]}>
                                <span className={styles["list-item-num"]}>
                                    {idx + 1}
                                </span>
                                <input
                                    className={styles["list-item-name"]}
                                    value={name}
                                    onChange={changeName(idx)}
                                    placeholder={"Name is empty."}
                                />
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
}
