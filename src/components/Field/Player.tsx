import { useCoordinate } from "@/hooks";
import styles from "@/styles/field/player.module.scss";
import { useEffect } from "react";

interface PlayerProps {
    isActivated?: boolean;
}

export default function Player({ isActivated }: PlayerProps) {
    const [coordinate, setCoordinate] = useCoordinate();

    const dragHandler = (e: React.DragEvent<HTMLDivElement>) => {
        console.log({ x: e.clientX, y: e.clientY });
    };

    const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
        console.log({ x: e.clientX, y: e.clientY });
        setCoordinate({ x: e.clientX, y: e.clientY });
    };

    return (
        <div
            className={`${styles["player"]} ${isActivated ? styles["player-activated"] : ""}`}
            draggable={true}
            // onDrag={dragHandler}
            onDragEnd={dragEndHandler}
            style={{
                top: `${coordinate.y}px`,
                left: `${coordinate.x}px`,
            }}
        ></div>
    );
}
