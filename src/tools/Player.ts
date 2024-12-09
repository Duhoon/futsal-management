import { Circle, IText } from "fabric";
import { Coord } from "./types";

export default class Player {
    radius = 32;

    name: string;
    coord: Coord;
    statue: Circle;
    text: IText;

    constructor(coord: Coord, text: string, color: string) {
        this.name = "";
        this.coord = coord;
        this.statue = new Circle({
            radius: this.radius,
            stroke: "black",
            strokeWidth: 4,
            fill: color,
            left: coord.x,
            top: coord.y,
            lockScalingX: true,
            lockScalingY: true,
        });
        const centerPointByPlayer = this.statue.getCenterPoint();

        this.text = new IText(text);
        this.text.set("left", centerPointByPlayer.x - this.text.width / 2);
        this.text.set("top", centerPointByPlayer.y - this.text.height / 2);

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
