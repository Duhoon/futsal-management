import { Canvas, Circle, Group, Line, Rect } from "fabric";
import Player from "./Player";
import { FIELD_PADDING } from "@/constants/draw";

export default class FieldDrawer {
    groups: Group[];
    private canvasEle?: HTMLCanvasElement;
    private canvas?: Canvas;

    constructor() {
        this.groups = [];
    }

    setCanvasEle(_canvasEle: HTMLCanvasElement): FieldDrawer {
        this.canvasEle = _canvasEle;
        return this;
    }

    setCanvas(_canvas: Canvas): FieldDrawer {
        this.canvas = _canvas;
        return this;
    }

    drawField() {
        if (!this.canvas || !this.canvasEle) return;
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

    // drawTeam(team: Team): FieldDrawer {
    // for (const player of team.players) {
    //     this._drawPlayer(player);
    // }

    // return this;
    // }

    drawPlayer(player: Player) {
        this._drawPlayer(player);
    }

    removePlayer(player: Player) {
        this._removePlayer(player);

        return this;
    }

    renderAll() {
        if (!this.canvas || !this.canvasEle) return;
        this.canvas.renderAll();

        return this;
    }

    private _drawPlayer(player: Player): void {
        if (!this.canvas || !this.canvasEle) return;
        const playerGroup = new Group(
            [player.statue, player.number, player.name],
            {
                lockScalingX: true,
                lockScalingY: true,
            },
        );
        playerGroup.hasControls = false;
        this.canvas.add(playerGroup);
        this.groups.push(playerGroup);
    }

    private _removePlayer(player: Player): void {
        this.groups.forEach((playerInField) => {
            const [statue] = playerInField.getObjects();
            if (statue == player.statue) {
                if (!this.canvas || !this.canvasEle) return;
                this.canvas.remove(playerInField);
            }
        });
    }
}
