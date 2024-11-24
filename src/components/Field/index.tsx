import styles from "@/styles/field/field.module.scss";
import { ReactNode, useEffect, useRef } from "react";
import { useViewport } from "@/hooks";
import FieldDrawer from "./FieldDrawer";

interface FieldProps {
    children: ReactNode;
}

export default function Field({ children }: FieldProps) {
    const [viewport] = useViewport();
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (ref?.current && window) {
            const ctx = ref.current.getContext("2d", {
                alpha: 1,
            }) as CanvasRenderingContext2D;
            const fieldDrawer = new FieldDrawer(ref.current, ctx);
            fieldDrawer.render();
        }
    }, [ref, viewport]);

    return (
        <main>
            <canvas
                className={styles.field}
                ref={ref}
                width={viewport?.width}
                height={(viewport?.height || 0) - 70}
            ></canvas>
            {children}
        </main>
    );
}
