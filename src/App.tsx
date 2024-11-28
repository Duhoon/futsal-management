import { useState } from "react";
import { Field, Board } from "./components";
import { Header } from "./components/layout";

function App() {
    const [isOpenBoard, setIsOpenBoard] = useState(false);

    const toggleIsOpenBoard = () => {
        setIsOpenBoard(!isOpenBoard);
    };

    return (
        <>
            <Header toggleBoard={toggleIsOpenBoard} />
            <Field />
            <Board isOpen={isOpenBoard} toggleBoard={toggleIsOpenBoard} />
        </>
    );
}

export default App;
