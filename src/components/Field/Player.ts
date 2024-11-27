import { Coord, Radius } from "./types";

export default class Player {
    number: number;
    name: string;

    constructor(
        private coord: Coord,
        private radius: Radius,
        number: number,
        name: string,
    ) {
        this.number = number;
        this.name = name;
    }

    getCoord(): Coord {
        return this.coord;
    }

    getRadius(): Radius {
        return this.radius;
    }
}
