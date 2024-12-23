import { useState } from "react";
import { Field, Board } from "./components";
import { Header } from "./components/layout";

import Team from "./tools/Team";
import { fieldDrawer, DrawerCtx } from "./contexts/DrawerCtx";

import styles from "@/styles/app.module.scss";

const teams = [new Team("white", fieldDrawer), new Team("white", fieldDrawer)];

function App() {
    const [isOpenBoard, setIsOpenBoard] = useState(false);

    const toggleIsOpenBoard = () => {
        setIsOpenBoard(!isOpenBoard);
    };

    return (
        <>
            <DrawerCtx.Provider value={fieldDrawer}>
                <Header toggleBoard={toggleIsOpenBoard} />
                <div className={styles["ui-wrapper"]}>
                    <Field teams={teams} />
                    <Board
                        teams={teams}
                        isOpen={isOpenBoard}
                        toggleBoard={toggleIsOpenBoard}
                    />
                </div>
            </DrawerCtx.Provider>
        </>
    );
}

export default App;
