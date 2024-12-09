import { Canvas, Circle, Group, Line, Rect } from "fabric";
import Player from "./Player";
import Team from "./Team";
import { FIELD_PADDING } from "@/constants/draw";

export default class FieldDrawer {
    constructor(
        private canvasEle: HTMLCanvasElement,
        private canvas: Canvas,
        private ctx: CanvasRenderingContext2D,
    ) {}

    render() {
        this.ctx.globalCompositeOperation = "source-over";

        // field backgournd
        this.canvas.add(
            new Rect({
                left: 0,
                right: 0,
                width: this.canvasEle.offsetWidth,
                height: this.canvasEle.offsetHeight,
                fill: "green",
                selectable: false,
            }),
        );

        // field outline
        this.canvas.add(
            new Rect({
                left: FIELD_PADDING,
                top: FIELD_PADDING,
                width: this.canvasEle.offsetWidth - 2 * FIELD_PADDING,
                height: this.canvasEle.offsetHeight - 2 * FIELD_PADDING,
                fill: "rgb(255 255 255 / 0%)",
                stroke: "white",
                strokeWidth: 4,
                selectable: false,
            }),
        );

        // filed middle line
        this.canvas.add(
            new Line(
                [
                    0 + FIELD_PADDING,
                    Math.floor(this.canvasEle.offsetHeight / 2),
                    this.canvasEle.offsetWidth - FIELD_PADDING,
                    Math.floor(this.canvasEle.offsetHeight / 2),
                ],
                {
                    backgroundColor: "white",
                    strokeWidth: 4,
                    selectable: false,
                },
            ),
        );

        // field middle circle-area
        const fieldCircle = new Circle({
            fill: "rgb(255 255 255 / 0%)",
            strokeWidth: 4,
            stroke: "white",
            radius: this.canvasEle.offsetWidth / 8,
            selectable: false,
        });
        this.canvas.add(fieldCircle);
        this.canvas.centerObject(fieldCircle);
    }

    drawTeam(team: Team): FieldDrawer {
        for (const player of team.players) {
            this._drawPlayer(player);
        }

        return this;
    }

    drawPlayer(player: Player) {
        this._drawPlayer(player);
    }

    removePlayer(player: Player) {
        this._removePlayer(player);

        return this;
    }

    renderAll() {
        this.canvas.renderAll();

        return this;
    }

    private _drawPlayer(player: Player): void {
        this.canvas.add(new Group([player.statue, player.text]));
    }

    private _removePlayer(player: Player): void {
        this.canvas.remove(player.statue);
        this.canvas.remove(player.text);
    }

    save() {
        this.ctx.save();
    }
}
