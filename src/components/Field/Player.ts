import { Coord } from "./types";

export default class Player {
    number: number;
    name: string;

    constructor(
        private coord: Coord,
        number: number,
        name: string,
    ) {
        this.number = number;
        this.name = name;
    }

    getCoord(): Coord {
        return this.coord;
    }
}
