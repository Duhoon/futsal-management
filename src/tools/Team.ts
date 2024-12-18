import FieldDrawer from "./Drawer";
import Player from "./Player";

export default class Team {
    color: string;
    private drawer: FieldDrawer;
    private readonly players: Player[];

    constructor(color: string, drawer: FieldDrawer) {
        this.drawer = drawer;
        this.color = color;
        this.players = [];
    }

    setColor(color: string) {
        this.color = color;
        this.players.forEach((player) => {
            player.statue.set("fill", color);
        });
        this.drawer.renderAll();
    }

    addPlayer(player: Player) {
        this.players.push(player);
        this.drawer.drawPlayer(player);
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
