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
    }
}
