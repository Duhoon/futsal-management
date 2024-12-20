import styles from "@/styles/header.module.scss";
import { FaBars } from "react-icons/fa6";

interface HeaderProps {
    toggleBoard: () => void;
}

export default function Header({ toggleBoard }: HeaderProps) {
    return (
        <header className={styles.header}>
            <h1 className={styles.logo}>Futsal Board</h1>
            <div className={styles["menu-bar"]}>
                <button className={styles["menu-button"]} onClick={toggleBoard}>
                    <FaBars fill={"#fff"} className={styles["menu-icon"]} />
                </button>
            </div>
        </header>
    );
}
