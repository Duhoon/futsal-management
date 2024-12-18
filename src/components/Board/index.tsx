import styles from "@/styles/board/board.module.scss";
import { Reducer, useContext, useReducer, useRef, useState } from "react";
import { FaX, FaTrashCan } from "react-icons/fa6";
import classNames from "classnames/bind";

import Squad from "./Squad";

import Team from "../../tools/Team";
import { DrawerCtx } from "@/contexts/DrawerCtx";
import { ToggleButton } from "../common";
import { SquadActionType } from "./enum";

const cn = classNames.bind(styles);

interface BoardProps {
    teams: Team[];
    isOpen: boolean;
    toggleBoard: () => void;
}

export interface SquadState {
    names: string[];
    num: number;
    color: string;
}

export interface SquadAction {
    type: SquadActionType;
    payload?: {
        index?: number;
        name?: string;
        color?: string;
    };
}

const squadReducer: Reducer<SquadState, SquadAction> = (state, action) => {
    switch (action.type) {
        case SquadActionType.INCREASE_NUM:
            return {
                ...state,
                num: state.num + 1,
            };
        case SquadActionType.DECREASE_NUM:
            return {
                ...state,
                num: state.num - 1,
            };
        case SquadActionType.CHANGE_NAME:
            if (
                action.payload?.index !== undefined &&
                action.payload?.name !== undefined
            ) {
                state.names[action.payload.index] = action.payload.name;
                return {
                    ...state,
                    names: [...state.names],
                };
            } else return state;
        case SquadActionType.CHANGE_COLOR:
            if (action.payload?.color) {
                return {
                    ...state,
                    color: action.payload.color,
                };
            } else return state;
        case SquadActionType.RESET:
            return { ...initSquadState() };
        default:
            return state;
    }
};

export default function Board({ teams, isOpen, toggleBoard }: BoardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const drawer = useContext(DrawerCtx);
    const [isViewingNumberOrName, setIsViewingNumberOrName] = useState(false);
    const [squad1, squad1Dispatch] = useReducer(
        squadReducer,
        {},
        initSquadState,
    );

    const [squad2, squad2Dispatch] = useReducer(
        squadReducer,
        {},
        initSquadState,
    );

    const removeAllHandler = () => {
        teams.forEach((team) => {
            while (team.numsOfPlayers() > 0) {
                const player = team.removePlayer();
                drawer.removePlayer(player!);
            }
            team.color = "white";
        });

        [squad1Dispatch, squad2Dispatch].forEach((dispatch) => {
            dispatch({ type: SquadActionType.RESET });
        });
    };

    const toggleTextTypeHandler = () => {
        teams.forEach((team) => {
            team.toggleUIVisisble();
        });
        drawer.renderAll();
        setIsViewingNumberOrName(!isViewingNumberOrName);
    };

    return (
        <div className={cn("board", { "board-collapsed": !isOpen })} ref={ref}>
            <div className={styles.head}>
                <ToggleButton
                    preText="Number"
                    proText="All"
                    callback={toggleTextTypeHandler}
                />
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
                <Squad
                    team={teams[0]}
                    teamOrder={0}
                    contents={squad1}
                    dispatch={squad1Dispatch}
                    viewStatus={isViewingNumberOrName}
                />
                <Squad
                    team={teams[1]}
                    teamOrder={1}
                    contents={squad2}
                    dispatch={squad2Dispatch}
                    viewStatus={isViewingNumberOrName}
                />
            </div>
            <div className={styles.tail}>©412ock</div>
        </div>
    );
}

function initSquadState(): SquadState {
    return {
        names: Array.from({ length: 6 }).map(() => {
            return "";
        }),
        num: 0,
        color: "",
    };
}
