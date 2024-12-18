import { useState } from "react";
import { Field, Board } from "./components";
import { Header } from "./components/layout";

import Team from "./tools/Team";
import FieldDrawer from "./tools/Drawer";
import { DrawerCtx } from "./contexts/DrawerCtx";

import styles from "@/styles/app.module.scss";

const fieldDrawer = new FieldDrawer();
const teams = [new Team("white", fieldDrawer), new Team("white", fieldDrawer)];

function App() {
    const [drawer] = useState<FieldDrawer>(fieldDrawer);
    const [isOpenBoard, setIsOpenBoard] = useState(false);

    const toggleIsOpenBoard = () => {
        setIsOpenBoard(!isOpenBoard);
    };

    return (
        <>
            <DrawerCtx.Provider value={drawer}>
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
