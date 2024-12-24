import { Circle, Group, Textbox } from "fabric";
import { Coord } from "./types";

export default class Player {
    defaultRadius = 32;
    defaultFontSize = 36;

    group: Group;
    coord: Coord;
    statue: Circle;
    number: Textbox;
    name: Textbox;

    constructor(coord: Coord, text: string, color: string, visible: boolean) {
        this.coord = coord;
        this.statue = new Circle({
            radius: this.defaultRadius,
            stroke: "black",
            strokeWidth: 4,
            fill: color,
            left: coord.x,
            top: coord.y,
            lockScalingX: true,
            lockScalingY: true,
        });
        const centerPointByPlayer = this.statue.getCenterPoint();

        this.number = new Textbox(text, {
            fontFamily: "roboto-mono",
            fontSize: this.defaultFontSize,
        });
        this.number.set("left", centerPointByPlayer.x - this.number.width / 2);
        this.number.set("top", centerPointByPlayer.y - this.number.height / 2);

        this.name = new Textbox("", {
            fontFamily: "roboto-mono",
            fontSize: 16,
            visible,
            width: this.statue.width,
            textAlign: "center",
        });
        this.name.set("left", this.statue.left);
        this.name.set("top", this.statue.top + this.statue.height + 5);

        this.group = this._grouping();
        this.group.hasControls = false;
    }

    setSize(sizeRate: number) {
        this.group.scale(sizeRate);
    }

    getCoord(): Coord {
        return this.coord;
    }

    setCoord(coord: Coord) {
        this.coord = coord;
    }

    setName(name: string) {
        this.name.set("text", name);
        this.name.set("left", this.statue.getRelativeX());
    }

    toggleVisible() {
        this.name.set("visible", !this.name.visible);
    }

    private _grouping(): Group {
        return new Group([this.statue, this.number, this.name], {
            lockScalingX: true,
            lockScalingY: true,
        });
    }
}
