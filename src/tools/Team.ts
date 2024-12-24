import { MAX_PLAYER_NUM } from "@/constants/squad";
import { FIELD_PADDING, FIELD_TOP_OFFSET } from "@/constants/draw";
import FieldDrawer from "./Drawer";
import Player from "./Player";
import { FieldType } from "./types";

export default class Team {
    color: string;
    field: FieldType;
    private drawer: FieldDrawer;
    private readonly players: Player[];

    constructor(color: string, drawer: FieldDrawer, field: FieldType) {
        this.drawer = drawer;
        this.color = color;
        this.players = [];
        this.field = field;
    }

    setColor(color: string) {
        this.color = color;
        this.players.forEach((player) => {
            player.statue.set("fill", color);
        });
        this.drawer.renderAll();
    }

    addPlayer() {
        const { width, height } = this.drawer.getCanvasSize();
        const xDist = Math.floor((width - 2 * FIELD_PADDING) / MAX_PLAYER_NUM);
        const yHalf = Math.floor((height - 2 * FIELD_TOP_OFFSET || 0) / 2);
        const _player = new Player(
            {
                x: FIELD_PADDING + xDist * this.numsOfPlayers(),
                y: yHalf + (this.field === "upper" ? 0 : FIELD_TOP_OFFSET),
            },
            String(this.numsOfPlayers() + 1),
            this.color,
            false,
        );
        this.players.push(_player);
        this.drawer.drawPlayer(_player);
    }

    removePlayer(): Player | undefined {
        if (this.players.length > 0) {
            const player = this.players.pop()!;
            this.drawer.removePlayer(player);
            return player;
        } else {
            return undefined;
        }
    }

    findPlayer(index: number): Player | undefined {
        if (index >= this.players.length || index < 0) {
            return undefined;
        }
        return this.players[index];
    }

    numsOfPlayers(): number {
        return this.players.length;
    }

    renderAll() {
        this.players.forEach((player) => this.drawer.drawPlayer(player));
    }

    toggleUIVisisble() {
        this.players.forEach((player) => player.toggleVisible());
    }
}
