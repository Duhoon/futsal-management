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
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // field outline
        this.ctx.fillStyle = "rgb(255 255 255 / 0%)";
        this.ctx.strokeRect(
            fieldPadding,
            fieldPadding,
            this.canvas.width - 2 * fieldPadding,
            this.canvas.height - 2 * fieldPadding,
        );

        // filed middle line
        this.ctx.strokeStyle = "white";
        this.ctx.beginPath();
        this.ctx.moveTo(0 + fieldPadding, Math.floor(this.canvas.height / 2));
        this.ctx.lineTo(
            this.canvas.width - fieldPadding,
            Math.floor(this.canvas.height / 2),
        );
        this.ctx.lineWidth = 4;
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
}
