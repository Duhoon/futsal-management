import { useState, useEffect, useRef } from "react";
import { Field, Board } from "./components";
import { Header } from "./components/layout";
import Team from "./components/Field/Team";
import { useViewport } from "./hooks";
import FieldDrawer from "./components/Field/FieldDrawer";
import { DrawerCtx } from "./contexts/DrawerCtx";

function App() {
    const [viewport] = useViewport();
    const ref = useRef<HTMLCanvasElement>(null);
    const [drawer, setDrawer] = useState<FieldDrawer | null>(null);

    const [isOpenBoard, setIsOpenBoard] = useState(false);
    const teams = [new Team(""), new Team("")];

    const toggleIsOpenBoard = () => {
        setIsOpenBoard(!isOpenBoard);
    };

    useEffect(() => {
        if (ref?.current && window) {
            const ctx = ref.current.getContext("2d", {
                alpha: 1,
            }) as CanvasRenderingContext2D;
            const fieldDrawer = new FieldDrawer(ref.current, ctx);
            fieldDrawer.render();
            setDrawer(fieldDrawer);
        }
    }, [ref, viewport]);

    return (
        <>
            <DrawerCtx.Provider value={drawer}>
                <Header toggleBoard={toggleIsOpenBoard} />
                <Field ref={ref} />
                <Board
                    teams={teams}
                    isOpen={isOpenBoard}
                    toggleBoard={toggleIsOpenBoard}
                />
            </DrawerCtx.Provider>
        </>
    );
}

export default App;
