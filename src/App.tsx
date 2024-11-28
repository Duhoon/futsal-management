import { Field, Board } from "./components";
import { Header } from "./components/layout";

function App() {
    return (
        <>
            <Header />
            <Field />
            <Board isOpen={true} />
        </>
    );
}

export default App;
