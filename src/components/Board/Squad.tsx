import { ChangeEvent, Dispatch, useContext, useEffect, useState } from "react";
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
import { SquadAction, SquadState } from ".";
import { SquadActionType } from "./enum";

interface SquadProps {
    team: Team;
    teamOrder: number;
    viewStatus: boolean;
    contents: SquadState;
    dispatch: Dispatch<SquadAction>;
}

export default function Squad({
    team,
    teamOrder,
    viewStatus,
    contents,
    dispatch,
}: SquadProps) {
    const drawer = useContext(DrawerCtx)!;
    const [viewport] = useViewport();
    const width = viewport && viewport.width >= 600 ? 600 : viewport?.width;

    const [isColorBoxOpen, setIsColorBoxOpen] = useState(false);
    const [isListOpen, setIsListOpen] = useState(false);
    const { names, num, color } = contents;

    const increaseNumHandler = () => {
        if (num < 6) {
            dispatch({ type: SquadActionType.INCREASE_NUM });
            const xDist = Math.floor((width || 0) / MAX_PLAYER_NUM);
            const yHalf = Math.floor((viewport!.height - 70 || 0) / 2);
            const player = new Player(
                {
                    x: xDist * num,
                    y: yHalf / 2 + yHalf * teamOrder - FIELD_PADDING * 2,
                },
                String(num + 1),
                team.color,
                viewStatus,
            );
            team.players.push(player);
            if (names[team.players.length - 1]) {
                player.setName(names[team.players.length - 1]);
            }
            drawer.drawPlayer(player);
        }
    };

    const decreaseNumHandler = () => {
        if (num > 0) {
            dispatch({ type: SquadActionType.DECREASE_NUM });
            const playerRemoved = team.players.pop();
            if (playerRemoved) drawer.removePlayer(playerRemoved);
        }
    };

    const changeNumHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.matchAll(/[0-6][0-6]*/g)) {
            // setNum(Number(e.target.value));
            team.players = team.players.slice(0, Number(e.target.value));
        }
    };

    const openColorBoxHandler = () => {
        setIsColorBoxOpen(true);
    };

    const closeColorBoxHandler = () => {
        setIsColorBoxOpen(false);
    };

    const changeColorHandler: ColorChangeHandler = ({ hex }) => {
        dispatch({
            type: SquadActionType.CHANGE_COLOR,
            payload: { color: hex },
        });
        team.setColor(hex);
        setIsColorBoxOpen(false);
        drawer.renderAll();
    };

    const changeNameHandler = (index: number) => {
        return (e: ChangeEvent<HTMLInputElement>) => {
            if (matchNames(e.target.value)) {
                dispatch({
                    type: SquadActionType.CHANGE_NAME,
                    payload: { index, name: e.target.value },
                });
                team.players[index].setName(e.target.value);
                drawer.renderAll();
            }
        };
    };

    useEffect(() => {
        if (window && isColorBoxOpen) {
            setTimeout(
                () => window.addEventListener("click", closeColorBoxHandler),
                0,
            );

            return () => {
                window.removeEventListener("click", closeColorBoxHandler);
            };
        }
    }, [isColorBoxOpen]);

    useEffect(() => {
        if (viewport) {
            if (viewport.width >= 1024 && !isListOpen) {
                setIsListOpen(true);
            }
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
                        onClick={openColorBoxHandler}
                    />
                    <input hidden />
                    <ColorBox
                        isOpen={isColorBoxOpen}
                        onChange={changeColorHandler}
                    />
                </div>
                <div className={styles["num-board-container"]}>
                    <button
                        className={`${styles["button"]} ${styles["button-left"]}`}
                        onClick={decreaseNumHandler}
                    >
                        &lt;
                    </button>
                    <input
                        className={styles["display"]}
                        onChange={changeNumHandler}
                        value={num}
                    />
                    <button
                        className={`${styles["button"]} ${styles["button-right"]}`}
                        onClick={increaseNumHandler}
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
                    names.map((_, idx) => {
                        return (
                            <li key={idx} className={styles["list-item"]}>
                                <span className={styles["list-item-num"]}>
                                    {idx + 1}
                                </span>
                                <input
                                    className={styles["list-item-name"]}
                                    name={`name-${idx + 1}`}
                                    value={names[idx] || ""}
                                    onChange={changeNameHandler(idx)}
                                    placeholder={"Name is empty."}
                                    disabled={idx > num - 1}
                                />
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
}
