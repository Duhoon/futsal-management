import Player from "./Player";

export default class Team {
    color: string;
    private readonly players: Player[];

    constructor(color: string) {
        this.color = color;
        this.players = [];
    }

    setColor(color: string) {
        this.color = color;
        this.players.forEach((player) => {
            player.statue.set("fill", color);
        });
    }

    addPlayer(player: Player) {
        this.players.push(player);
    }

    removePlayer(): Player | undefined {
        if (this.players.length > 0) {
            return this.players.pop()!;
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

    toggleUIVisisble() {
        this.players.forEach((player) => player.toggleVisible());
    }
}
