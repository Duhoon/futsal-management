import { Circle, IText, Textbox } from "fabric";
import { Coord } from "./types";

export default class Player {
    radius = 32;

    coord: Coord;
    statue: Circle;
    number: IText;
    name: Textbox;

    constructor(coord: Coord, text: string, color: string, visible: boolean) {
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

        this.number = new IText(text, {
            fontFamily: "roboto-mono",
            visible: !visible,
        });
        this.number.set("left", centerPointByPlayer.x - this.number.width / 2);
        this.number.set("top", centerPointByPlayer.y - this.number.height / 2);

        this.name = new Textbox("", {
            fontFamily: "roboto-mono",
            fontSize: 16,
            visible,
        });
        this.name.set("left", centerPointByPlayer.x - this.name.width / 2);
        this.name.set("top", centerPointByPlayer.y - this.name.height / 2);

        this.statue.hasControls = false;
    }

    getCoord(): Coord {
        return this.coord;
    }

    setCoord(coord: Coord) {
        this.coord = coord;
    }

    setName(name: string) {
        this.name.set("text", name);
    }

    toggleVisible() {
        this.number.set("visible", !this.number.visible);
        this.name.set("visible", !this.name.visible);
    }
}
