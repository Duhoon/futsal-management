import styles from "@/styles/field/field.module.scss";
import { useRef, useEffect, useContext, memo } from "react";
import { useViewport } from "@/hooks";
import "@/styles/field/field.scss";
import * as fabric from "fabric";
import { DrawerCtx } from "@/contexts/DrawerCtx";
import Team from "@/tools/Team";

interface FieldProps {
    teams: Team[];
}

export const Field = memo(function Field({ teams }: FieldProps) {
    const ref = useRef<HTMLCanvasElement>(null);
    const fieldDrawer = useContext(DrawerCtx);
    const [viewport] = useViewport();
    const width = viewport && viewport.width >= 600 ? 600 : viewport?.width;

    useEffect(() => {
        const canvas = new fabric.Canvas(ref.current!, {
            width: width,
            height: (viewport?.height || 0) - 70,
        });
        fieldDrawer.setCanvas(canvas).setCanvasEle(ref.current!);

        fieldDrawer.render();
        teams.forEach((team) => {
            fieldDrawer.drawTeam(team);
            // fieldDrawer.rearrangePlayer(width!);
        });

        return () => {
            canvas.dispose();
        };
    }, [ref, viewport, width, teams, fieldDrawer]);

    return (
        <main>
            <canvas
                className={styles.field}
                ref={ref}
                width={width}
                height={(viewport?.height || 0) - 70}
            ></canvas>
        </main>
    );
});
