import { useState, useEffect, useRef } from "react";
import { Field, Board } from "./components";
import { Header } from "./components/layout";
import Team from "./tools/Team";
import { useViewport } from "./hooks";
import FieldDrawer from "./tools/Drawer";
import { DrawerCtx } from "./contexts/DrawerCtx";
import * as fabric from "fabric";

const teams = [new Team("white"), new Team("white")];

function App() {
    const [viewport] = useViewport();
    const ref = useRef<HTMLCanvasElement>(null);
    const [drawer, setDrawer] = useState<FieldDrawer | null>(null);

    const [isOpenBoard, setIsOpenBoard] = useState(false);

    const toggleIsOpenBoard = () => {
        setIsOpenBoard(!isOpenBoard);
    };

    useEffect(() => {
        const width = viewport && viewport.width >= 600 ? 600 : viewport?.width;
        const canvas = new fabric.Canvas(ref.current!, {
            width: width,
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
