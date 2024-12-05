import { Canvas, Circle, Line, Rect } from "fabric";
import Player from "./Player";
import Team from "./Team";

const fieldPadding = 20;

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
                left: fieldPadding,
                top: fieldPadding,
                width: this.canvasEle.offsetWidth - 2 * fieldPadding,
                height: this.canvasEle.offsetHeight - 2 * fieldPadding,
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
                    0 + fieldPadding,
                    Math.floor(this.canvasEle.offsetHeight / 2),
                    this.canvasEle.offsetWidth - fieldPadding,
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
            this._drawPlayer(player, team.color);
        }

        return this;
    }

    removePlayer(player: Player) {
        this._removePlayer(player);
    }

    private _removePlayer(player: Player): void {
        this.canvas.remove(player.statue);
    }

    private _drawPlayer(player: Player, color: string): void {
        this.canvas.remove(player.statue);
        player.statue = player.statue.set("fill", color);
        this.canvas.add(player.statue);
    }

    save() {
        this.ctx.save();
    }
}
