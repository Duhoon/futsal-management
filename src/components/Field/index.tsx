import styles from "@/styles/field/field.module.scss";
import { ReactNode, useEffect, useRef } from "react";
import { useViewport } from "@/hooks";

interface FieldProps {
    children: ReactNode;
}

export default function Field({ children }: FieldProps) {
    const [viewport] = useViewport();
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (ref?.current && window) {
            const fieldPadding = 20;

            const canvas = ref.current;
            const ctx = canvas.getContext("2d", { alpha: false })!;
            ctx.globalCompositeOperation = "source-over";

            // field backgournd
            ctx.fillStyle = "green";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // field line
            ctx.fillStyle = "rgb(255 255 255 / 0%)";
            ctx.strokeRect(
                fieldPadding,
                fieldPadding,
                canvas.width - 2 * fieldPadding,
                canvas.height - 2 * fieldPadding,
            );

            // filed middle line
            ctx.strokeStyle = "white";
            ctx.beginPath();
            ctx.moveTo(0 + fieldPadding, Math.floor(canvas.height / 2));
            ctx.lineTo(
                canvas.width - fieldPadding,
                Math.floor(canvas.height / 2),
            );
            ctx.lineWidth = 4;
            ctx.stroke();

            // field middle area
            ctx.beginPath();
            ctx.arc(
                canvas.width / 2,
                canvas.height / 2,
                canvas.width / 8,
                0,
                Math.PI * 2,
                false,
            );
            ctx.stroke();
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
