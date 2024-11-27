import styles from "@/styles/field/field.module.scss";
import { MouseEvent, useEffect, useRef } from "react";
import { useViewport } from "@/hooks";
import FieldDrawer from "./FieldDrawer";
import Player from "./Player";

export default function Field() {
    const [viewport] = useViewport();
    const ref = useRef<HTMLCanvasElement>(null);
    // const [players, setPlayers] = useState<Player[]>([]);

    const mouseMoveHandler = (e: MouseEvent<HTMLCanvasElement>) => {
        console.log({
            x: e.clientX - e.currentTarget.offsetLeft,
            y: e.clientY - e.currentTarget.offsetTop,
        });
    };

    useEffect(() => {
        if (ref?.current && window) {
            const ctx = ref.current.getContext("2d", {
                alpha: 1,
            }) as CanvasRenderingContext2D;
            const fieldDrawer = new FieldDrawer(ref.current, ctx);
            fieldDrawer.render();

            fieldDrawer.drawPlayer({ x: 100, y: 100 });
            fieldDrawer.drawPlayer({ x: 100, y: 500 });
        }
    }, [ref, viewport]);

    // useEffect(() => {
    //     if (ref?.current && window) {
    //         1;
    //     }
    // }, [players]);

    return (
        <main style={{ width: "100%" }}>
            <canvas
                className={styles.field}
                ref={ref}
                width={viewport?.width}
                height={(viewport?.height || 0) - 70}
                onMouseMove={mouseMoveHandler}
            ></canvas>
        </main>
    );
}
