import styles from "@/styles/field/field.module.scss";
import { ReactNode } from "react";
import Player from "./Player";

interface FieldProps {
    children: ReactNode;
}

export default function Field({ children }: FieldProps) {
    return (
        <main className={styles.field}>
            <img className={styles["field-img"]} src="/field.png"></img>
            <Player />
            {children}
        </main>
    );
}
