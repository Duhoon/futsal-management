import { useState } from "react";

interface Coordinate {
    x: number;
    y: number;
}

export function useCoordinate(): [
    Coordinate,
    React.Dispatch<React.SetStateAction<Coordinate>>,
] {
    const [positions, setCoordinate] = useState<Coordinate>({ x: 0, y: 0 });

    return [positions, setCoordinate];
}
