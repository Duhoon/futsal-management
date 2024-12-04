import { Coord } from "./types";

export default class Player {
    name: string;
    coord: Coord;

    constructor(coord: Coord) {
        this.name = "";
        this.coord = coord;
    }

    getCoord(): Coord {
        return this.coord;
    }

    setCoord(coord: Coord) {
        this.coord = coord;
    }

    setName(name: string) {
        this.name = name;
    }
}
