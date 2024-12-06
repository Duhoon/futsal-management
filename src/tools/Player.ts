import { Circle } from "fabric";
import { Coord } from "./types";

export default class Player {
    radius = 32;

    name: string;
    coord: Coord;
    statue: Circle;

    constructor(coord: Coord, color: string) {
        this.name = "";
        this.coord = coord;
        this.statue = new Circle({
            radius: this.radius,
            stroke: "black",
            strokeWidth: 4,
            fill: color,
            left: coord.x,
            right: coord.y,
            lockScalingX: true,
            lockScalingY: true,
        });

        this.statue.hasControls = false;
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
