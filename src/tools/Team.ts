import Player from "./Player";

export default class Team {
    color: string;
    players: Player[];

    constructor(color: string) {
        this.color = color;
        this.players = [];
    }

    setColor(color: string) {
        this.color = color;
        this.players.forEach((player) => {
            player.statue.set("fill", color);
        });

        console.log(this.players);
    }

    addPlayer(player: Player) {
        this.players.push(player);
    }
}
