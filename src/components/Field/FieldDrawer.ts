import Player from "./Player";
import Team from "./Team";

const fieldPadding = 20;

export default class FieldDrawer {
    constructor(
        private canvas: HTMLCanvasElement,
        private ctx: CanvasRenderingContext2D,
    ) {}

    render() {
        this.ctx.globalCompositeOperation = "source-over";

        // field backgournd
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(
            0,
            0,
            this.canvas.offsetWidth,
            this.canvas.offsetHeight,
        );

        // field outline
        this.ctx.fillStyle = "rgb(255 255 255 / 0%)";
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 4;
        this.ctx.strokeRect(
            fieldPadding,
            fieldPadding,
            this.canvas.offsetWidth - 2 * fieldPadding,
            this.canvas.offsetHeight - 2 * fieldPadding,
        );

        // filed middle line
        this.ctx.beginPath();
        this.ctx.strokeStyle = "white";
        this.ctx.moveTo(
            0 + fieldPadding,
            Math.floor(this.canvas.offsetHeight / 2),
        );
        this.ctx.lineTo(
            this.canvas.offsetWidth - fieldPadding,
            Math.floor(this.canvas.offsetHeight / 2),
        );
        this.ctx.stroke();

        // field middle circle-area
        this.ctx.beginPath();
        this.ctx.arc(
            this.canvas.offsetWidth / 2,
            this.canvas.offsetHeight / 2,
            this.canvas.offsetWidth / 8,
            0,
            Math.PI * 2,
            false,
        );
        this.ctx.stroke();
    }

    // drawPlayer(coord: Coord): FieldDrawer {
    //     this.ctx.save();

    //     this._drawPlayer(coord);

    //     this.ctx.restore();

    //     return this;
    // }

    drawTeam(team: Team): FieldDrawer {
        // this.ctx.save();

        for (const player of team.players) {
            this._drawPlayer(player, team.color);
        }

        return this;
    }

    private _drawPlayer(player: Player, color: string): void {
        const radius = this.canvas.height / 32;
        const { x, y } = player.coord;

        this.ctx.beginPath();
        // this.ctx.translate(coord.x, coord.y);
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = color;
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = "black";
        this.ctx.fill();
        this.ctx.stroke();
    }

    save() {
        this.ctx.save();
    }
}
