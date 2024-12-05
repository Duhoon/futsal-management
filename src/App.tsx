import { useState, useEffect, useRef } from "react";
import { Field, Board } from "./components";
import { Header } from "./components/layout";
import Team from "./components/Field/Team";
import { useViewport } from "./hooks";
import FieldDrawer from "./components/Field/FieldDrawer";
import { DrawerCtx } from "./contexts/DrawerCtx";
import * as fabric from "fabric";

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
        const canvas = new fabric.Canvas(ref.current!, {
            width: viewport?.width,
            height: (viewport?.height || 0) - 70,
        });
        const ctx = canvas.getContext();
        const fieldDrawer = new FieldDrawer(ref.current!, canvas, ctx);
        fieldDrawer.render();
        setDrawer(fieldDrawer);

        return () => {
            canvas.dispose();
        };
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
