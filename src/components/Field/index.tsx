import styles from "@/styles/field/field.module.scss";
import { ForwardedRef, forwardRef } from "react";
import { useViewport } from "@/hooks";

export const Field = forwardRef(function Field(
    props: unknown,
    ref: ForwardedRef<HTMLCanvasElement>,
) {
    const [viewport] = useViewport();

    return (
        <main>
            <canvas
                className={styles.field}
                ref={ref}
                width={viewport?.width}
                height={(viewport?.height || 0) - 70}
            ></canvas>
        </main>
    );
});
