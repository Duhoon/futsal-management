import styles from "@/styles/field/field.module.scss";
import { ForwardedRef, forwardRef } from "react";
import { useViewport } from "@/hooks";
import "@/styles/field/field.scss";

export const Field = forwardRef(function Field(
    props: unknown,
    ref: ForwardedRef<HTMLCanvasElement>,
) {
    const [viewport] = useViewport();
    const width = viewport && viewport.width >= 600 ? 600 : viewport?.width;
    props;

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
