import Player from "./Player";
import { Coord } from "./types";

const fieldPadding = 20;

export default class FieldDrawer {
    private players: Player[] = [];

    constructor(
        private canvas: HTMLCanvasElement,
        private ctx: CanvasRenderingContext2D,
    ) {}

    render() {
        this.ctx.globalCompositeOperation = "source-over";

        // field backgournd
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // field outline
        this.ctx.fillStyle = "rgb(255 255 255 / 0%)";
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 4;
        this.ctx.strokeRect(
            fieldPadding,
            fieldPadding,
            this.canvas.width - 2 * fieldPadding,
            this.canvas.height - 2 * fieldPadding,
        );

        // filed middle line
        this.ctx.beginPath();
        this.ctx.strokeStyle = "white";
        this.ctx.moveTo(0 + fieldPadding, Math.floor(this.canvas.height / 2));
        this.ctx.lineTo(
            this.canvas.width - fieldPadding,
            Math.floor(this.canvas.height / 2),
        );
        this.ctx.stroke();

        // field middle circle-area
        this.ctx.beginPath();
        this.ctx.arc(
            this.canvas.width / 2,
            this.canvas.height / 2,
            this.canvas.width / 8,
            0,
            Math.PI * 2,
            false,
        );
        this.ctx.stroke();
    }

    drawPlayer(coord: Coord): FieldDrawer {
        const radius = this.canvas.height / 32;

        this.ctx.save();

        this.ctx.beginPath();
        this.ctx.translate(coord.x, coord.y);
        this.ctx.arc(0, 0, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = "red";
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = "black";

        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.restore();

        const player = new Player(coord, this.players.length + 1, " ");
        this.players.push(player);

        return this;
    }

    save() {
        this.ctx.save();
    }
}
