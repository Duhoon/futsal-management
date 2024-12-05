import styles from "@/styles/field/field.module.scss";
import { ForwardedRef, forwardRef } from "react";
import { useViewport } from "@/hooks";

export const Field = forwardRef(function Field(
    props,
    ref: ForwardedRef<HTMLCanvasElement>,
) {
    const [viewport] = useViewport();

    // useEffect(() => {
    //     if (ref?.current && window) {
    //         1;
    //     }
    // }, [players]);

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
